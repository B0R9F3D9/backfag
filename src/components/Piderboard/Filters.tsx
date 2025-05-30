import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';

interface PiderboardFiltersProps {
	isQuestHasWinners: boolean;
	onlyWinnersFilter: boolean;
	setOnlyWinnersFilter: (value: boolean) => void;
	search: string;
	setSearch: (value: string) => void;
	loading: boolean;
}

export function PiderboardFilters({
	isQuestHasWinners,
	onlyWinnersFilter,
	setOnlyWinnersFilter,
	search,
	setSearch,
	loading,
}: PiderboardFiltersProps) {
	return (
		<div className="flex flex-col sm:flex-row sm:justify-center gap-4">
			{isQuestHasWinners && (
				<div className="flex items-center gap-2 mx-auto sm:mx-0">
					<Checkbox
						id="only-winners"
						checked={onlyWinnersFilter}
						onCheckedChange={checked => setOnlyWinnersFilter(!!checked)}
						disabled={loading}
					/>
					<label htmlFor="only-winners" className="text-sm select-none">
						Only Winners
					</label>
				</div>
			)}
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
