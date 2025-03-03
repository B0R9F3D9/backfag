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
	const [metric, setMetric] = useState(quest?.metric || 'volume');
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);

	useEffect(() => {
		if (!quest) return;
		(async () => {
			setLoading(true);
			const rawData = await getPiderboard(quest.range, metric);
			setData(transformPiderboardData(rawData, quest.reward));
			setLoading(false);
		})();
	}, [quest, metric]);

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
	}, [data, debouncedSearch, minRewardFilter, quest]);

	const stats = useMemo(() => {
		const values = filteredData.map(item => Math.abs(item.value));
		const total = values.reduce((acc, value) => acc + value, 0);
		const avg = filteredData.length ? total / filteredData.length : 0;
		const sortedValues = [...values].sort((a, b) => a - b);
		const median = sortedValues.length
			? sortedValues.length % 2
				? sortedValues[Math.floor(sortedValues.length / 2)]
				: (sortedValues[sortedValues.length / 2 - 1] +
						sortedValues[sortedValues.length / 2]) /
					2
			: 0;

		return { total, avg, median };
	}, [filteredData]);

	return {
		loading,
		quest,
		setQuest,
		metric,
		setMetric,
		filteredData,
		stats,
		minRewardFilter,
		setMinRewardFilter,
		search,
		setSearch,
	};
}
