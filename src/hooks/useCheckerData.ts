import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { getFillHistory } from '@/api/checker';
import type { ICheckerStats } from '@/types/checker';

export function useCheckerData() {
	const [apiKey, setApiKey] = useState('');
	const [marketType, setMarketType] = useState<'SPOT' | 'PERP'>('SPOT');
	const [dateRange, setDateRange] = useState<DateRange | undefined>();
	const [stats, setStats] = useState<ICheckerStats | null>(null);
	const [loading, setLoading] = useState(false);

	async function checkData() {
		if (!apiKey) return;

		setLoading(true);

		try {
			let fillHistory = await getFillHistory(apiKey, marketType);

			if (dateRange) {
				const from = dateRange.from;
				let to = dateRange.to;

				if (from && to) {
					if (from.getTime() === to.getTime()) {
						to = new Date(to.getTime() + 24 * 60 * 60 * 1000);
					}

					fillHistory = fillHistory.filter(item => {
						const date = new Date(item.timestamp);
						return date >= from && (to ? date <= to : true);
					});
				}
			}

			const stats: ICheckerStats = fillHistory.reduce(
				(acc, { symbol, quantity, price, fee }) => {
					const amount = parseFloat(quantity) * parseFloat(price);
					const volume = acc.volume.find(v => v.pair === symbol);

					if (volume) volume.amount += amount;
					else acc.volume.push({ pair: symbol, amount });

					acc.feeLoss += parseFloat(fee);
					acc.trades = fillHistory;

					return acc;
				},
				{ volume: [], feeLoss: 0, trades: fillHistory } as ICheckerStats,
			);

			setStats(stats);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	return {
		apiKey,
		setApiKey,
		marketType,
		setMarketType,
		dateRange,
		setDateRange,
		stats,
		loading,
		checkData,
	};
}
