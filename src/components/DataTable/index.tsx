'use client';

import type {
	ColumnDef,
	SortingState,
	VisibilityState,
} from '@tanstack/react-table';
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/table';

import { DataTablePagination } from './Pagination';

interface DataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
	loading: boolean;
}

export function DataTable<TData>({
	data,
	columns,
	loading,
}: DataTableProps<TData>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns: columns as ColumnDef<TData>[],
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
			columnVisibility,
		},
	});

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<div className="dark:border shadow-md rounded-md overflow-x-auto min-w-[25vw] md:w-full max-w-full resize-x">
				<Table className="w-full">
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-16">
									<div className="flex items-center justify-center w-full h-full">
										<Loader2 size={16} className="mr-2 animate-spin" />
										Loading...
									</div>
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-16 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{table.getPageCount() > 1 && <DataTablePagination table={table} />}
		</div>
	);
}
