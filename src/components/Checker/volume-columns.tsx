import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as React from 'react';

import { formatCurrency } from '@/lib/utils';
import type { ICheckerStats } from '@/types/checker';
import { Button } from '@/ui/button';

function ColumnItem({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-center w-full h-full">
			{children}
		</div>
	);
}

export const VOLUME_COLUMNS: ColumnDef<ICheckerStats['volume'][number]>[] = [
	{
		accessorKey: 'pair',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="w-full justify-center"
			>
				Pair
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<ColumnItem>
				<span>{row.getValue<string>('pair').split('_')[0]}</span>
				{'/'}
				<span className="text-muted-foreground">
					{row.getValue<string>('pair').split('_')[1].replace('PERP', '')}
				</span>
			</ColumnItem>
		),
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="w-full justify-center"
			>
				Volume
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<ColumnItem>{formatCurrency(row.getValue<number>('amount'))}</ColumnItem>
		),
	},
];
