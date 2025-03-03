'use client';

import { useEffect, useMemo, useState } from 'react';

import { getPiderboard } from '@/api/piderboard';
import { DataTable } from '@/components/DataTable';
import { Input } from '@/components/ui/input';
import { QUESTS } from '@/constants';
import { useDebounce } from '@/hooks/use-debounce';
import type { IPiderboard } from '@/types/piderboard';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

export default function Piderboard() {
	const [loading, setLoading] = useState(false);
	const [range, setRange] = useState('');
	const [data, setData] = useState<IPiderboard[]>([]);
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);

	useEffect(() => {
		if (!range) return;
		(async () => {
			setLoading(true);
			setData(await getPiderboard(range));
			setLoading(false);
		})();
	}, [range]);

	const filteredData = useMemo(() => {
		let result = data;
		if (debouncedSearch)
			result = result.filter(quest =>
				quest.alias.toLowerCase().includes(debouncedSearch.toLowerCase()),
			);
		return result;
	}, [data, debouncedSearch]);

	return (
		<main className="flex flex-col items-center justify-center gap-4">
			<Select onValueChange={value => setRange(value)} disabled={loading}>
				<SelectTrigger className="w-48">
					<SelectValue placeholder="Select a quest" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{QUESTS.map(quest => (
							<SelectItem key={quest.range} value={quest.range}>
								{quest.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

			<div className="flex justify-center">
				<Input
					className="rounded-md w-64"
					type="search"
					placeholder="Search"
					disabled={loading}
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>

			<DataTable data={filteredData} loading={loading} />
		</main>
	);
}
