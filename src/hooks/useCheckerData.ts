import type { FillHistory } from 'backpack-sdk';
import { addDays, subDays } from 'date-fns';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { getFillHistory } from '@/api/checker';
import type { ICheckerStats } from '@/types/checker';

export const TIME_RANGES = [
	{ label: '00:00 - 23:59', value: '0-0-23-59' },
	{ label: '02:00 - 01:59', value: '2-0-1-59' },
];

export const DATE_RANGES = [
	{ label: 'Today', from: new Date(), to: addDays(new Date(), 1) },
	{ label: 'Yesterday', from: subDays(new Date(), 1), to: new Date() },
	{ label: 'Last Week', from: subDays(new Date(), 7), to: new Date() },
	{ label: 'Last Month', from: subDays(new Date(), 30), to: new Date() },
	{ label: 'All Time', from: undefined, to: undefined },
	{
		label: 'Beta Rush Day 39',
		from: new Date(1742004000000),
		to: new Date(1742090400000),
	},
	{
		label: 'Beta Rush Day 40',
		from: new Date(1742090400000),
		to: new Date(1742176800000),
	},
	{
		label: 'Beta Rush Day 41',
		from: new Date(1742176800000),
		to: new Date(1742263200000),
	},
];

export function formatDateRange(dateRange: DateRange | undefined): string {
	if (!dateRange?.from || !dateRange?.to) {
		return 'All Time';
	}
	const from = dateRange.from.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
	const to = dateRange.to.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
	return `${from} - ${to}`;
}

function processTradeStats(fillHistory: FillHistory[]): ICheckerStats {
	const tradeMap = new Map<string, { buys: any[]; sells: any[] }>();
	const pairStats = new Map<
		string,
		{ volume: number; feeLoss: number; slippageLoss: number }
	>();

	fillHistory.forEach(trade => {
		const { symbol, side, price, quantity, fee } = trade;
		const parsedPrice = parseFloat(price);
		const parsedQty = parseFloat(quantity);
		const parsedFee = parseFloat(fee);

		if (!tradeMap.has(symbol)) {
			tradeMap.set(symbol, { buys: [], sells: [] });
		}

		const tradeData = tradeMap.get(symbol)!;
		const tradeEntry = { price: parsedPrice, quantity: parsedQty };
		if (side === 'Bid') tradeData.buys.push(tradeEntry);
		else tradeData.sells.push(tradeEntry);

		const pair = pairStats.get(symbol) || {
			volume: 0,
			feeLoss: 0,
			slippageLoss: 0,
		};
		pair.volume += parsedPrice * parsedQty;
		pair.feeLoss += parsedFee;
		pairStats.set(symbol, pair);
	});

	tradeMap.forEach((data, symbol) => {
		let buyIndex = 0,
			sellIndex = 0;
		let pairSlippageLoss = 0;

		while (buyIndex < data.buys.length && sellIndex < data.sells.length) {
			const buy = data.buys[buyIndex];
			const sell = data.sells[sellIndex];
			const quantity = Math.min(buy.quantity, sell.quantity);
			pairSlippageLoss += (buy.price - sell.price) * quantity;
			buy.quantity -= quantity;
			sell.quantity -= quantity;
			if (buy.quantity === 0) buyIndex++;
			if (sell.quantity === 0) sellIndex++;
		}

		const pair = pairStats.get(symbol)!;
		pair.slippageLoss = pairSlippageLoss;
		pairStats.set(symbol, pair);
	});

	const pairs = Array.from(pairStats.entries()).map(
		([name, { volume, feeLoss, slippageLoss }]) => ({
			name,
			volume,
			slippageLoss,
			feeLoss,
		}),
	);

	return {
		pairs,
		volume: pairs.reduce((sum, pair) => sum + pair.volume, 0),
		feeLoss: pairs.reduce((sum, pair) => sum + pair.feeLoss, 0),
		slippageLoss: pairs.reduce((sum, pair) => sum + pair.slippageLoss, 0),
		trades: fillHistory,
	};
}

export function useCheckerData() {
	const [apiKey, setApiKey] = useState('');
	const [marketType, setMarketType] = useState<'SPOT' | 'PERP'>('SPOT');
	const [dateRange, setDateRange] = useState<DateRange | undefined>(
		DATE_RANGES[0],
	);
	const [timeRange, setTimeRange] = useState(TIME_RANGES[1].value);
	const [stats, setStats] = useState<ICheckerStats | null>(null);
	const [loading, setLoading] = useState(false);

	async function checkData() {
		if (!apiKey) return;
		setLoading(true);

		try {
			let fillHistory = await getFillHistory(apiKey, marketType);

			if (dateRange && dateRange.from && dateRange.to) {
				const [startHour, startMinute, endHour, endMinute] = timeRange
					.split('-')
					.map(Number);
				dateRange.from.setHours(startHour, startMinute, 0, 0);
				dateRange.to.setHours(endHour, endMinute, 59, 999);
				fillHistory = fillHistory.filter(item => {
					const date = new Date(item.timestamp);
					return date >= dateRange.from! && date <= dateRange.to!;
				});
			}

			const stats = processTradeStats(fillHistory);
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
		timeRange,
		setTimeRange,
		stats,
		loading,
		checkData,
	};
}
