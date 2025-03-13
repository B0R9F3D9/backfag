import type { FillHistory } from 'backpack-sdk';

export interface ICheckerStats {
	volume: {
		pair: string;
		amount: number;
	}[];
	feeLoss: number;
	trades: FillHistory[];
}
