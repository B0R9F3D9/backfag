import { QUESTS } from '@/constants';

export const DATE_RANGES = [
	{ label: 'All Time', from: undefined, to: undefined },
	...QUESTS.filter(
		(quest, index, self) =>
			index ===
			self.findIndex(
				item => item.name + item.subname === quest.name + quest.subname,
			),
	).map(quest => ({
		label: `${quest.name} ${quest.subname ? quest.subname : ''}`,
		from: quest.startDate,
		to: quest.endDate,
	})),
];
