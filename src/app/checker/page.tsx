'use client';

import { Clipboard, Loader2, Trash } from 'lucide-react';
import React from 'react';

import { DateTimePicker } from '@/components/Checker/DateTimePicker';
import { PAIRS_COLUMNS } from '@/components/Checker/pairs-columns';
import { CheckerStats } from '@/components/Checker/Stats';
import { TRADES_COLUMNS } from '@/components/Checker/trades-columns';
import { DataTable } from '@/components/DataTable';
import { useCheckerData } from '@/hooks/useCheckerData';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';

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
			<div className="w-full max-w-4xl rounded-xl shadow-xl p-6 flex flex-col gap-6 dark:border dark:border-gray-700">
				<h1 className="text-2xl mx-auto font-medium">Checker</h1>

				<div className="flex items-center gap-1 w-full sm:w-64 mx-auto">
					<Input
						placeholder="Paste your API key"
						value={apiKey.replace(/./g, '*')}
						onChange={e => setApiKey(e.target.value)}
						disabled={loading}
					/>
					<Button
						variant="outline"
						onClick={() => navigator.clipboard.readText().then(setApiKey)}
						disabled={loading}
					>
						<Clipboard className="h-4 w-4" />
					</Button>
				</div>

				<Tabs
					value={marketType}
					onValueChange={v => setMarketType(v as 'SPOT' | 'PERP')}
				>
					<TabsList className="w-full sm:w-64 mx-auto">
						<TabsTrigger value="SPOT" disabled={loading}>
							Spot
						</TabsTrigger>
						<TabsTrigger value="PERP" disabled={loading}>
							Perps
						</TabsTrigger>
					</TabsList>
				</Tabs>

				<DateTimePicker
					dateRange={dateRange}
					setDateRange={setDateRange}
					disabled={loading}
				/>

				<div className="flex gap-2 sm:w-64 w-full mx-auto">
					<Button
						className="flex-grow text-lg font-medium"
						onClick={checkData}
						disabled={loading || !apiKey}
					>
						{loading ? (
							<div className="flex items-center gap-2">
								<Loader2 className="animate-spin mx-auto" />
								<span>Checking...</span>
							</div>
						) : (
							'Check'
						)}
					</Button>
					<Button
						className="flex items-center gap-1"
						variant="destructive"
						size="icon"
						onClick={() => indexedDB.deleteDatabase('checker')}
						disabled={loading}
					>
						<Trash className="h-4 w-4" />
					</Button>
				</div>

				{stats && (
					<>
						<CheckerStats {...stats} loading={loading} />
						<DataTable
							data={stats.pairs}
							columns={PAIRS_COLUMNS}
							loading={loading}
						/>
						<DataTable
							data={stats.trades}
							columns={TRADES_COLUMNS}
							loading={loading}
						/>
					</>
				)}
			</div>
		</main>
	);
}
