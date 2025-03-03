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
	const totalVolume = data.reduce((acc, item) => acc + item.volume, 0);

	return data.map(item => ({
		...item,
		percent: (item.volume / totalVolume) * 100,
		reward: rewardPool * (item.volume / totalVolume),
	}));
}
export function formatCurrency(value: number) {
	return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
