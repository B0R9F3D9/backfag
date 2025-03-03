import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';

interface PiderboardFiltersProps {
	minRewardFilter: boolean;
	setMinRewardFilter: (value: boolean) => void;
	rewardPercentage: number;
	setRewardPercentage: (value: number) => void;
	search: string;
	setSearch: (value: string) => void;
	loading: boolean;
}

export function PiderboardFilters({
	minRewardFilter,
	setMinRewardFilter,
	rewardPercentage,
	setRewardPercentage,
	search,
	setSearch,
	loading,
}: PiderboardFiltersProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div className="flex items-center gap-2">
				<Checkbox
					id="min-reward"
					checked={minRewardFilter}
					onCheckedChange={checked => setMinRewardFilter(!!checked)}
					disabled={loading}
				/>
				<label htmlFor="min-reward" className="text-sm select-none">
					Hide rewards {'<'} $1
				</label>
			</div>
			<div className="flex items-center gap-2">
				<label htmlFor="reward-percentage" className="text-sm">
					Reward Percentage:
				</label>
				<Input
					id="reward-percentage"
					type="number"
					className="w-16"
					min={0}
					max={100}
					step={1}
					value={rewardPercentage}
					onChange={e => setRewardPercentage(Number(e.target.value))}
					disabled={loading}
				/>
				<span className="text-sm">%</span>
			</div>
			<Input
				className="w-full sm:w-auto rounded-lg"
				type="search"
				placeholder="Search by alias..."
				disabled={loading}
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
		</div>
	);
}
