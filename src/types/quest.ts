export interface IQuest {
	range: string;
	metric: 'volume' | 'pnl';
	metrics: Array<'volume' | 'pnl'>;
	name: string;
	subname?: string;
	winners?: number;
	reward: number;
	startDate: Date;
	endDate: Date;
}
