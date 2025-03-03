import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as React from 'react';

import type { IPiderboard } from '@/types/piderboard';
import { Button } from '@/ui/button';

function ColumnItem({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-center w-full h-full">
			{children}
		</div>
	);
}

export const columns: ColumnDef<IPiderboard>[] = [
	{
		accessorKey: 'rank',
		header: ({ column }) => (
			<ColumnItem>
				<Button
					className="cursor-pointer gap-1"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Rank
					<ArrowUpDown size={14} />
				</Button>
			</ColumnItem>
		),
		cell: ({ row }) => (
			<ColumnItem>
				{row.getValue<number>('rank').toLocaleString('en-US')}
			</ColumnItem>
		),
	},
	{
		accessorKey: 'alias',
		header: () => (
			<div className="flex items-center justify-center w-full h-full">User</div>
		),
		cell: ({ row }) => <ColumnItem>{row.getValue('alias')}</ColumnItem>,
	},
	{
		accessorKey: 'volume',
		header: ({ column }) => (
			<ColumnItem>
				<Button
					className="cursor-pointer gap-1"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Volume
					<ArrowUpDown size={14} />
				</Button>
			</ColumnItem>
		),
		cell: ({ row }) => (
			<ColumnItem>
				{Number(row.getValue<string>('volume')).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})}
			</ColumnItem>
		),
	},
	{
		accessorKey: 'percent',
		header: ({ column }) => (
			<ColumnItem>
				<Button
					className="cursor-pointer gap-1"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Percentage
					<ArrowUpDown size={14} />
				</Button>
			</ColumnItem>
		),
		cell: ({ row }) => (
			<ColumnItem>{row.getValue<number>('percent').toFixed(2)}%</ColumnItem>
		),
	},
	{
		accessorKey: 'reward',
		header: ({ column }) => (
			<ColumnItem>
				<Button
					className="cursor-pointer gap-1"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Reward
					<ArrowUpDown size={14} />
				</Button>
			</ColumnItem>
		),
		cell: ({ row }) => (
			<ColumnItem>
				{row.getValue<number>('reward').toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})}
			</ColumnItem>
		),
	},
];
