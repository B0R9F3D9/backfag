import axios from 'axios';
import { type FillHistory } from 'backpack-sdk';
import { createHash } from 'crypto';

import { DatabaseService } from '@/lib/db';
import type { ApiResponse } from '@/types/api';

async function fetchFillHistory(
	apiKey: string,
	marketType: 'SPOT' | 'PERP',
	stopId?: string,
	limit = 1000,
	offset = 0,
	accumulator: FillHistory[] = [],
): Promise<FillHistory[]> {
	const response = await axios.get<ApiResponse<FillHistory[]>>(
		'/api/checker/fill-history',
		{
			params: {
				apiKey,
				marketType,
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

	const fillHistory = response.data.data;

	for (const item of fillHistory) {
		if (item.orderId === stopId) return accumulator;
		accumulator.push(item);
	}
	if (fillHistory.length < limit) return accumulator;

	return fetchFillHistory(
		apiKey,
		marketType,
		stopId,
		limit,
		offset + limit,
		accumulator,
	);
}

export async function getFillHistory(
	apiKey: string,
	marketType: 'SPOT' | 'PERP',
) {
	try {
		const result: FillHistory[] = [];
		const apiKeyHash = createHash('sha256').update(apiKey).digest('hex');
		const cacheKey = `${marketType}-${apiKeyHash}`;
		const db = new DatabaseService('checker', 'fillHistory');

		const cached = await db.get<{ trades: FillHistory[] }>(cacheKey);
		if (cached && cached.trades?.length > 0) result.push(...cached.trades);

		const fillHistory = await fetchFillHistory(
			apiKey,
			marketType,
			result[0]?.orderId,
		);
		if (fillHistory.length === 0) return result;
		result.unshift(...fillHistory);

		await db.update(cacheKey, {
			trades: fillHistory,
			id: cacheKey,
		});

		return result;
	} catch (error) {
		console.error('Error in getFillHistory:', error);
		return [];
	}
}
