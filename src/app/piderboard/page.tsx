'use client';

import { DataTable } from '@/components/DataTable';
import { PiderboardFilters } from '@/components/Piderboard/Filters';
import { PiderboardStats } from '@/components/Piderboard/Stats';
import { QUESTS } from '@/constants';
import { usePiderboardData } from '@/hooks/usePiderboardData';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

export default function Piderboard() {
	const {
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
	} = usePiderboardData(null);

	return (
		<main className="p-6 flex justify-center">
			<div className="w-full max-w-4xl rounded-xl shadow-lg p-6 flex flex-col gap-6 dark:border dark:border-gray-700">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<h1 className="text-2xl font-bold">Piderboard</h1>
					<Select
						onValueChange={value =>
							setQuest(QUESTS.find(q => q.range === value) || null)
						}
						disabled={loading}
					>
						<SelectTrigger className="w-full sm:w-48">
							<SelectValue placeholder="Select a quest" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{QUESTS.map(quest => (
									<SelectItem key={quest.range} value={quest.range}>
										{quest.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<PiderboardFilters
					minRewardFilter={minRewardFilter}
					setMinRewardFilter={setMinRewardFilter}
					rewardPercentage={rewardPercentage}
					setRewardPercentage={setRewardPercentage}
					search={search}
					setSearch={setSearch}
					loading={loading}
				/>

				<PiderboardStats
					questReward={(quest?.reward || 0) * (rewardPercentage / 100)}
					totalUsers={filteredData.length}
					totalVolume={stats.totalVolume}
					avgVolume={stats.avgVolume}
					medianVolume={stats.medianVolume}
					loading={loading}
				/>

				<DataTable data={filteredData} loading={loading} />
			</div>
		</main>
	);
}
