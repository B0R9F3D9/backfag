import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { formatCurrency } from '@/lib/utils';
import type { ICheckerStats } from '@/types/checker';

interface IStat {
	label: string;
	value: number;
	formatFunc?: (value: number) => string;
}

interface CheckerStatsProps extends ICheckerStats {
	loading: boolean;
}

export function CheckerStats({
	volume,
	feeLoss,
	trades,
	loading,
}: CheckerStatsProps) {
	const STATS: IStat[] = [
		{
			label: 'Volume',
			value: volume
				.map(item => item.amount)
				.reduce((acc, item) => acc + item, 0),
			formatFunc: formatCurrency,
		},
		{
			label: 'Loss on fee',
			value: feeLoss,
			formatFunc: formatCurrency,
		},
		{
			label: 'Trades',
			value: trades.length,
			formatFunc: (value: number) => value.toLocaleString(),
		},
	];

	return (
		<div
			className={twMerge(
				`sm:grid-cols-${STATS.length}`,
				'grid grid-cols-1 gap-4 p-4 rounded-lg shadow-md dark:border',
			)}
		>
			{STATS.map(stat => (
				<div key={stat.label} className="text-center">
					<p className="text-sm">{stat.label}</p>
					<p className="text-lg font-semibold">
						{loading ? (
							<Loader2 className="animate-spin mx-auto" />
						) : stat.formatFunc ? (
							stat.formatFunc(stat.value)
						) : (
							stat.value
						)}
					</p>
				</div>
			))}
		</div>
	);
}
