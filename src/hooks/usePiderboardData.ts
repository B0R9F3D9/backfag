'use client';

import { useEffect, useMemo, useState } from 'react';

import { getPiderboard } from '@/api/piderboard';
import { useDebounce } from '@/hooks/useDebounce';
import type { IPiderboard } from '@/types/piderboard';
import type { IQuest } from '@/types/quest';

function transformPiderboardData(
	data: IPiderboard[],
	rewardPool: number,
): IPiderboard[] {
	const totalValue = data.reduce((acc, item) => acc + Math.abs(item.value), 0);

	return data
		.map(item => ({
			...item,
			percent: (Math.abs(item.value) / totalValue) * 100,
			reward: (Math.abs(item.value) / totalValue) * rewardPool,
		}))
		.sort((a, b) => a.rank - b.rank);
}

export function usePiderboardData() {
	const [loading, setLoading] = useState(false);
	const [quest, setQuest] = useState<IQuest | null>(null);
	const [data, setData] = useState<IPiderboard[]>([]);
	const [onlyWinnersFilter, setOnlyWinnersFilter] = useState(true);
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 333);

	async function checkPiderboard(force = false) {
		if (!quest) return;
		setLoading(true);
		const rawData = await getPiderboard(quest.range, quest.metric, force);
		setData(transformPiderboardData(rawData, quest.reward));
		setLoading(false);
	}

	useEffect(() => {
		checkPiderboard();
	}, [quest]);

	const filteredData = useMemo(() => {
		if (!quest) return data;
		const result = transformPiderboardData(
			data.filter(
				item =>
					!onlyWinnersFilter || (quest.winners && item.rank <= quest.winners),
			),
			quest.reward,
		);
		return result.filter(
			item =>
				!debouncedSearch ||
				item.alias.toLowerCase().includes(debouncedSearch.toLowerCase()),
		);
	}, [data, debouncedSearch, onlyWinnersFilter]);

	const stats = useMemo(() => {
		const values = filteredData
			.map(item => Math.abs(item.value))
			.sort((a, b) => a - b);
		const total = values.reduce((acc, value) => acc + value, 0);
		const avg = filteredData.length ? total / filteredData.length : 0;
		const median = values.length
			? values.length % 2
				? values[Math.floor(values.length / 2)]
				: (values[values.length / 2 - 1] + values[values.length / 2]) / 2
			: 0;

		return { total, avg, median };
	}, [data, onlyWinnersFilter, debouncedSearch]);

	return {
		checkPiderboard,
		loading,
		quest,
		setQuest,
		filteredData,
		stats,
		onlyWinnersFilter,
		setOnlyWinnersFilter,
		search,
		setSearch,
	};
}
