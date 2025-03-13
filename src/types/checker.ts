import type { FillHistory } from 'backpack-sdk';

export interface ICheckerStats {
	pairs: {
		name: string;
		volume: number;
		slippageLoss: number;
		feeLoss: number;
	}[];
	volume: number;
	feeLoss: number;
	slippageLoss: number;
	trades: FillHistory[];
}
