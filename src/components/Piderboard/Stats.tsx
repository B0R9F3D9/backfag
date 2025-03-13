import { Loader2 } from 'lucide-react';

import { formatCurrency } from '@/lib/utils';

interface PiderboardStatsProps {
	reward: number;
	total: number;
	avg: number;
	median: number;
	loading: boolean;
}

export function PiderboardStats({
	reward,
	total,
	avg,
	median,
	loading,
}: PiderboardStatsProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-lg shadow-md dark:border">
			{[
				{ label: 'Reward Pool', value: reward, format: true },
				{ label: 'Total', value: total, format: true },
				{ label: 'Avg', value: avg, format: true },
				{ label: 'Median', value: median, format: true },
			].map(stat => (
				<div key={stat.label} className="text-center">
					<p className="text-sm">{stat.label}</p>
					<p className="text-lg font-semibold">
						{loading ? (
							<Loader2 className="animate-spin mx-auto" />
						) : stat.format ? (
							formatCurrency(stat.value)
						) : (
							stat.value
						)}
					</p>
				</div>
			))}
		</div>
	);
}
