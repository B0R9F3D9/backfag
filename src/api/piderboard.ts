import axios from 'axios';

import { QUESTS } from '@/constants';
import type { PiderboardResponse } from '@/types/api';
import type { IPiderboard } from '@/types/piderboard';

async function fetchPiderboard(
	metric: 'volume' | 'pnl',
	range: string,
	limit = 1000,
	offset = 0,
	accumulator: IPiderboard[] = [],
) {
	const quest = QUESTS.find(quest => quest.range === range);
	if (!quest) throw new Error('Quest not found');

	const response = await axios.get<PiderboardResponse>(
		'/api/piderboard',
		{
			params: {
				metric,
				range,
				limit,
				offset,
			},
		},
	);
	if (
		!response.data.data ||
		response.status !== 200 ||
		response.data.status !== 200
	)
		throw new Error(response.data.message || response.statusText);

	accumulator.push(
		...response.data.data.map((item, index) => {
			return {
				rank: accumulator.length + index + 1,
				alias: item.userAlias
					.split('-')
					.map(part => part.charAt(0).toUpperCase() + part.slice(1))
					.join('-'),
				value: parseFloat(item.volume),
				percent: 0,
				reward: 0,
			};
		}),
	);

	if (response.data.data.length < 1000) return accumulator;
	return fetchPiderboard(metric, range, limit, offset + limit, accumulator);
}

export async function getPiderboard(
	range: string,
	metric: 'volume' | 'pnl',
	force = false,
): Promise<IPiderboard[]> {
	try {
		const cached = localStorage.getItem(`${metric}-${range}`);
		if (cached && !force) {
			const { data: cachedData, timestamp } = JSON.parse(cached);
			if (new Date().getTime() / 1000 - Number(timestamp) < 300)
				return cachedData;
		}

		const data = await fetchPiderboard(metric, range);
		localStorage.setItem(
			`${metric}-${range}`,
			JSON.stringify({ data, timestamp: Date.now() / 1000 }),
		);
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}
