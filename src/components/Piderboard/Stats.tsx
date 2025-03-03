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
				{ label: 'Reward Pool', value: reward },
				{ label: 'Total', value: total },
				{ label: 'Avg', value: avg },
				{ label: 'Median', value: median },
			].map(stat => (
				<div key={stat.label} className="text-center">
					<p className="text-sm">{stat.label}</p>
					<p className="text-lg font-semibold">
						{loading ? (
							<Loader2 className="animate-spin mx-auto" />
						) : stat.label === 'Total Users' ? (
							stat.value
						) : (
							formatCurrency(stat.value)
						)}
					</p>
				</div>
			))}
		</div>
	);
}
