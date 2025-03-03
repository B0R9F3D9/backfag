import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { IPiderboard } from '@/types/piderboard';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function transformPiderboardData(
	data: IPiderboard[],
	rewardPool: number,
): IPiderboard[] {
	const totalValue = data.reduce((acc, item) => acc + Math.abs(item.value), 0);

	return data
		.map(item => ({
			...item,
			percent: (Math.abs(item.value) / totalValue) * 100,
			reward: (Math.abs(item.value) / totalValue) * rewardPool,
		}))
		.sort((a, b) => a.rank - b.rank);
}

export function formatCurrency(value: number) {
	return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
