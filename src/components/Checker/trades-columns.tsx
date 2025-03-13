import type { ColumnDef } from '@tanstack/react-table';
import type { FillHistory } from 'backpack-sdk';
import { format, formatDistanceToNow } from 'date-fns';
import { ArrowUpDown, TrendingDown, TrendingUp } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import type { ICheckerStats } from '@/types/checker';

function ColumnItem({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`flex items-center justify-center w-full h-full ${className}`}
		>
			{children}
		</div>
	);
}

export const TRADES_COLUMNS: ColumnDef<ICheckerStats['trades'][number]>[] = [
	{
		accessorKey: 'symbol',
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
				<span>{row.getValue<string>('symbol').split('_')[0]}</span>
				{'/'}
				<span className="text-muted-foreground">
					{row.getValue<string>('symbol').split('_')[1].replace('PERP', '')}
				</span>
			</ColumnItem>
		),
	},
	{
		accessorKey: 'side',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="w-full justify-center"
			>
				Side
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<ColumnItem>
				{row.getValue<FillHistory['side']>('side') === 'Bid' ? (
					<span className="flex items-center">
						<TrendingUp className="mr-1 h-4 w-4 text-green-500" /> Bid
					</span>
				) : (
					<span className="flex items-center">
						<TrendingDown className="mr-1 h-4 w-4 text-red-500" /> Ask
					</span>
				)}
			</ColumnItem>
		),
	},
	{
		accessorKey: 'price',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="w-full justify-center"
			>
				Price
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<ColumnItem>{formatCurrency(row.getValue<number>('price'))}</ColumnItem>
		),
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="w-full justify-center"
			>
				Quantity
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<ColumnItem>
				{formatCurrency(row.getValue<number>('quantity'))}
			</ColumnItem>
		),
	},
	{
		id: 'volume',
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
		accessorFn: row => parseFloat(row.price) * parseFloat(row.quantity),
		cell: ({ row }) => (
			<ColumnItem>
				{formatCurrency(
					parseFloat(row.original.price) * parseFloat(row.original.quantity),
				)}
			</ColumnItem>
		),
	},
	{
		accessorKey: 'fee',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="w-full justify-center"
			>
				Fee
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<ColumnItem>{formatCurrency(row.getValue<number>('fee'))}</ColumnItem>
		),
	},
	{
		accessorKey: 'timestamp',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="w-full justify-center"
			>
				Date
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const timestamp = row.getValue<string>('timestamp');
			return (
				<ColumnItem>
					<div className="group relative">
						{format(new Date(timestamp), 'PPpp')}
						<span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
							{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
						</span>
					</div>
				</ColumnItem>
			);
		},
	},
];
