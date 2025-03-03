'use client';

import { LuRefreshCcw } from 'react-icons/lu';

import { DataTable } from '@/components/DataTable';
import { PiderboardFilters } from '@/components/Piderboard/Filters';
import { PiderboardStats } from '@/components/Piderboard/Stats';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
		checkPiderboard,
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
	} = usePiderboardData(null);

	return (
		<main className="p-6 flex justify-center">
			<div className="w-full max-w-4xl rounded-xl shadow-xl p-6 flex flex-col gap-6 dark:border dark:border-gray-700">
				<h1 className="text-2xl mx-auto">
					<span className="font-bold">Pider</span>
					<span className="font-medium">board</span>
				</h1>

				<div className="flex flex-col sm:flex-row justify-center sm:items-center gap-4">
					<Tabs
						value={metric}
						onValueChange={value => setMetric(value as 'volume' | 'pnl')}
					>
						<TabsList className="w-full sm:w-auto">
							{['volume', 'pnl'].map(m => (
								<TabsTrigger
									key={m}
									disabled={
										(quest !== null &&
											!QUESTS.find(
												q => q.range === quest?.range && q.metric === m,
											)) ||
										loading
									}
									className="cursor-pointer"
									value={m}
								>
									{m.slice(0, 1).toUpperCase() + m.slice(1)}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<Select
						onValueChange={value =>
							setQuest(
								QUESTS.find(q => q.range === value && q.metric === metric) ||
									null,
							)
						}
						value={quest?.range}
						disabled={loading}
					>
						<SelectTrigger className="w-full sm:w-52">
							<SelectValue placeholder="Select a quest" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{QUESTS.filter(q => q.metric === metric).map(quest => (
									<SelectItem key={quest.range} value={quest.range}>
										{quest.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Button
						variant="outline"
						size="icon"
						disabled={loading}
						onClick={() => checkPiderboard(true)}
					>
						<LuRefreshCcw />
					</Button>
				</div>

				<PiderboardFilters
					minRewardFilter={minRewardFilter}
					setMinRewardFilter={setMinRewardFilter}
					search={search}
					setSearch={setSearch}
					loading={loading}
				/>

				<PiderboardStats
					reward={quest?.reward || 0}
					total={stats.total}
					avg={stats.avg}
					median={stats.median}
					loading={loading}
				/>

				<DataTable data={filteredData} loading={loading} />
			</div>
		</main>
	);
}
