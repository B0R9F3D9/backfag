'use client';

import { LuRefreshCcw } from 'react-icons/lu';

import { DataTable } from '@/components/DataTable';
import { COLUMNS } from '@/components/Piderboard/columns';
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
		filteredData,
		stats,
		onlyWinnersFilter,
		setOnlyWinnersFilter,
		search,
		setSearch,
	} = usePiderboardData();

	return (
		<main className="p-6 flex justify-center">
			<div
				className="w-full max-w-4xl rounded-xl shadow-xl p-6
					flex flex-col gap-6 dark:border dark:border-gray-700"
			>
				<h1 className="text-2xl mx-auto">
					<span className="font-bold">Pider</span>
					<span className="font-medium">board</span>
				</h1>

				<div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4">
					<Tabs
						value={quest?.metric || 'volume'}
						onValueChange={metric =>
							setQuest(
								QUESTS.find(
									q => q.range === quest?.range && q.metric === metric,
								)!,
							)
						}
					>
						<TabsList className="w-full sm:w-auto">
							<TabsTrigger
								className="cursor-pointer"
								disabled={
									loading || !quest?.metrics?.includes('volume') || !quest
								}
								value="volume"
							>
								Volume
							</TabsTrigger>
							<TabsTrigger
								className="cursor-pointer"
								disabled={loading || !quest?.metrics?.includes('pnl') || !quest}
								value="pnl"
							>
								PnL
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<Select
						onValueChange={name =>
							setQuest(
								QUESTS.findLast(
									q =>
										q.name === name && q.metric === (quest?.metric || 'volume'),
								)!,
							)
						}
						value={quest?.name}
						disabled={loading}
					>
						<SelectTrigger className="w-full sm:w-40">
							<SelectValue placeholder="Select a quest" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{Array.from(new Set(QUESTS.map(q => q.name))).map(name => (
									<SelectItem key={name} value={name}>
										{name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					{quest?.subname && (
						<Select
							onValueChange={subname =>
								setQuest(
									QUESTS.find(
										q => q.name === quest.name && q.subname === subname,
									)!,
								)
							}
							value={quest?.subname}
							disabled={loading}
						>
							<SelectTrigger className="w-full sm:w-32">
								<SelectValue placeholder="Select a subquest" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{QUESTS.filter(
										q => q.name === quest.name && q.metric === quest.metric,
									).map(q => (
										<SelectItem key={q.subname} value={q.subname!}>
											{q.subname}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					)}

					<Button
						variant="outline"
						size="icon"
						disabled={loading || !quest}
						onClick={() => checkPiderboard(true)}
					>
						<LuRefreshCcw />
					</Button>
				</div>

				<PiderboardFilters
					isQuestHasWinners={!!quest?.winners}
					onlyWinnersFilter={onlyWinnersFilter}
					setOnlyWinnersFilter={setOnlyWinnersFilter}
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

				<DataTable data={filteredData} columns={COLUMNS} loading={loading} />
			</div>
		</main>
	);
}
