'use client';

import { useEffect, useMemo, useState } from 'react';

import { getPiderboard } from '@/api/piderboard';
import { useDebounce } from '@/hooks/useDebounce';
import { transformPiderboardData } from '@/lib/utils';
import type { IPiderboard } from '@/types/piderboard';
import type { IQuest } from '@/types/quest';

export function usePiderboardData(initialQuest: IQuest | null) {
	const [loading, setLoading] = useState(false);
	const [quest, setQuest] = useState<IQuest | null>(initialQuest);
	const [data, setData] = useState<IPiderboard[]>([]);
	const [minRewardFilter, setMinRewardFilter] = useState(true);
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
			data.filter(item => !minRewardFilter || item.reward > 1),
			quest.reward,
		);
		return result.filter(
			item =>
				!debouncedSearch ||
				item.alias.toLowerCase().includes(debouncedSearch.toLowerCase()),
		);
	}, [data, debouncedSearch, minRewardFilter]);

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
	}, [data, minRewardFilter, debouncedSearch]);

	return {
		checkPiderboard,
		loading,
		quest,
		setQuest,
		filteredData,
		stats,
		minRewardFilter,
		setMinRewardFilter,
		search,
		setSearch,
	};
}
