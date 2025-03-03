import { Loader2 } from 'lucide-react';

import { formatCurrency } from '@/lib/utils';

interface PiderboardStatsProps {
	questReward: number | undefined;
	totalUsers: number;
	totalVolume: number;
	avgVolume: number;
	medianVolume: number;
	loading: boolean;
}

export function PiderboardStats({
	questReward,
	totalUsers,
	totalVolume,
	avgVolume,
	medianVolume,
	loading,
}: PiderboardStatsProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 rounded-lg shadow-md dark:border dark:border-gray-800">
			{[
				{ label: 'Reward Pool', value: questReward ?? 0 },
				{ label: 'Total Users', value: totalUsers },
				{ label: 'Total Volume', value: totalVolume },
				{ label: 'Avg Volume', value: avgVolume },
				{ label: 'Median Volume', value: medianVolume },
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
