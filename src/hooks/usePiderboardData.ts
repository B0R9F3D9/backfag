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
	const [rewardPercentage, setRewardPercentage] = useState(
		quest?.procent || 50,
	);
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);

	useEffect(() => {
		if (!quest) return;
		setRewardPercentage(quest.procent || 50);
		(async () => {
			setLoading(true);
			const rawData = await getPiderboard(quest.range);
			setData(
				transformPiderboardData(
					rawData,
					quest.reward * (rewardPercentage / 100),
				),
			);
			setLoading(false);
		})();
	}, [quest, rewardPercentage]);

	const filteredData = useMemo(() => {
		if (!quest) return data;
		const result = transformPiderboardData(
			data.filter(item => !minRewardFilter || item.reward > 1),
			quest.reward * (rewardPercentage / 100),
		);
		return result.filter(
			item =>
				!debouncedSearch ||
				item.alias.toLowerCase().includes(debouncedSearch.toLowerCase()),
		);
	}, [data, debouncedSearch, minRewardFilter, quest, rewardPercentage]);

	const stats = useMemo(() => {
		const volumes = filteredData.map(item => item.volume);
		const totalVolume = volumes.reduce((acc, vol) => acc + vol, 0);
		const avgVolume = filteredData.length
			? totalVolume / filteredData.length
			: 0;
		const sortedVolumes = [...volumes].sort((a, b) => a - b);
		const medianVolume = sortedVolumes.length
			? sortedVolumes.length % 2
				? sortedVolumes[Math.floor(sortedVolumes.length / 2)]
				: (sortedVolumes[sortedVolumes.length / 2 - 1] +
						sortedVolumes[sortedVolumes.length / 2]) /
					2
			: 0;

		return { totalVolume, avgVolume, medianVolume };
	}, [filteredData]);

	return {
		loading,
		quest,
		setQuest,
		filteredData,
		stats,
		minRewardFilter,
		setMinRewardFilter,
		rewardPercentage,
		setRewardPercentage,
		search,
		setSearch,
	};
}
