'use client';

import { format, subDays } from 'date-fns';
import { CalendarIcon, Clipboard, Loader2 } from 'lucide-react';
import React from 'react';

import { CheckerStats } from '@/components/Checker/Stats';
import { TRADES_COLUMNS } from '@/components/Checker/trades-columns';
import { VOLUME_COLUMNS } from '@/components/Checker/volume-columns';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCheckerData } from '@/hooks/useCheckerData';
import { cn } from '@/lib/utils';

export default function Checker() {
	const {
		apiKey,
		setApiKey,
		marketType,
		setMarketType,
		dateRange,
		setDateRange,
		stats,
		loading,
		checkData,
	} = useCheckerData();

	return (
		<main className="p-6 flex justify-center">
			<div
				className="w-full max-w-4xl rounded-xl shadow-xl p-6
					flex flex-col justify-center gap-6 dark:border dark:border-gray-700"
			>
				<h1 className="text-2xl mx-auto font-medium">Checker</h1>

				<div className="flex items-center gap-1 w-full sm:w-64 mx-auto">
					<Input
						className="rounded-lg"
						placeholder="Paste your API key here"
						value={apiKey.replace(/./g, '*')}
						onChange={e => setApiKey(e.target.value)}
						disabled={loading}
					/>
					<Button
						variant="outline"
						onClick={() =>
							navigator.clipboard.readText().then(text => setApiKey(text))
						}
						disabled={loading}
					>
						<Clipboard className="h-4 w-4" />
					</Button>
				</div>

				<Tabs
					value={marketType}
					onValueChange={value => setMarketType(value as 'SPOT' | 'PERP')}
				>
					<TabsList className="flex items-center gap-1 w-full sm:w-64 mx-auto">
						<TabsTrigger
							className="cursor-pointer"
							disabled={loading}
							value="SPOT"
						>
							Spot Only
						</TabsTrigger>
						<TabsTrigger
							className="cursor-pointer"
							disabled={loading}
							value="PERP"
						>
							Perps Only
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant="outline"
							disabled={loading}
							className={cn(
								'w-full sm:w-64 rounded-lg text-left font-normal justify-start mx-auto',
								!dateRange && 'text-muted-foreground',
							)}
						>
							<CalendarIcon />
							{dateRange?.from && dateRange?.to ? (
								<>
									{format(dateRange?.from, 'LLL dd, y')} -{' '}
									{format(dateRange?.to, 'LLL dd, y')}
								</>
							) : dateRange === undefined ? (
								<span>All Time</span>
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="flex w-auto flex-col gap-2 p-2">
						<Select
							onValueChange={value => {
								if (value === 'all') {
									setDateRange(undefined);
								} else {
									setDateRange({
										from: subDays(new Date(), parseInt(value)),
										to: new Date(),
									});
								}
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a date" />
							</SelectTrigger>
							<SelectContent position="popper">
								<SelectItem value="0">Today</SelectItem>
								<SelectItem value="1">Yesterday to now</SelectItem>
								<SelectItem value="7">A week ago to now</SelectItem>
								<SelectItem value="30">A month ago to now</SelectItem>
								<SelectItem value="all">All Time</SelectItem>
							</SelectContent>
						</Select>
						<Calendar
							className="rounded-md border"
							mode="range"
							defaultMonth={dateRange?.from}
							selected={dateRange}
							onSelect={setDateRange}
						/>
					</PopoverContent>
				</Popover>

				<Button
					className="w-full sm:w-64 text-lg font-medium mx-auto"
					variant="outline"
					onClick={checkData}
					disabled={loading || !apiKey}
				>
					{loading ? (
						<>
							<Loader2 className="animate-spin mr-2" />
							Checking...
						</>
					) : (
						'Check'
					)}
				</Button>

				{stats && <CheckerStats {...stats} loading={loading} />}
				{stats && (
					<DataTable
						data={stats.volume}
						columns={VOLUME_COLUMNS}
						loading={loading}
					/>
				)}
				{stats && (
					<DataTable
						data={stats.trades}
						columns={TRADES_COLUMNS}
						loading={loading}
					/>
				)}
			</div>
		</main>
	);
}
