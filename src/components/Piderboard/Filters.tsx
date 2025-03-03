import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';

interface PiderboardFiltersProps {
	minRewardFilter: boolean;
	setMinRewardFilter: (value: boolean) => void;
	search: string;
	setSearch: (value: string) => void;
	loading: boolean;
}

export function PiderboardFilters({
	minRewardFilter,
	setMinRewardFilter,
	search,
	setSearch,
	loading,
}: PiderboardFiltersProps) {
	return (
		<div className="flex flex-col sm:flex-row sm:justify-center gap-4">
			<div className="flex items-center gap-2 mx-auto sm:mx-0">
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
			<Input
				className="w-full sm:w-64 rounded-lg"
				type="search"
				placeholder="Search by alias..."
				disabled={loading}
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
		</div>
	);
}
