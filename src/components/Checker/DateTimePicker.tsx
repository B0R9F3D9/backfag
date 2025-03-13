import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { DATE_RANGES, TIME_RANGES } from '@/hooks/useCheckerData';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

interface DateTimePickerProps {
	dateRange: DateRange | undefined;
	setDateRange: (range: DateRange | undefined) => void;
	timeRange: string;
	setTimeRange: (value: string) => void;
	disabled: boolean;
	displayText: string;
}

export function DateTimePicker({
	dateRange,
	setDateRange,
	timeRange,
	setTimeRange,
	disabled,
	displayText,
}: DateTimePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					disabled={disabled}
					className="w-full sm:w-64 mx-auto justify-start text-left truncate"
				>
					<CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
					<div className="flex flex-col gap-0 truncate">
						<span className="truncate">{displayText}</span>
						{dateRange?.from && dateRange.to && (
							<span className="text-muted-foreground text-xs truncate">
								{TIME_RANGES.find(r => r.value === timeRange)?.label}
							</span>
						)}
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-2">
				<Select
					value={
						DATE_RANGES.find(
							r => r.from === dateRange?.from && r.to === dateRange?.to,
						)?.label
					}
					onValueChange={value =>
						setDateRange(DATE_RANGES.find(r => r.label === value))
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select date range" />
					</SelectTrigger>
					<SelectContent>
						{DATE_RANGES.map(range => (
							<SelectItem key={range.label} value={range.label}>
								{range.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="mt-2">
						<SelectValue placeholder="Select time range" />
					</SelectTrigger>
					<SelectContent>
						{TIME_RANGES.map(range => (
							<SelectItem key={range.value} value={range.value}>
								{range.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Calendar
					mode="range"
					defaultMonth={dateRange?.from}
					selected={dateRange}
					onSelect={setDateRange}
					className="mt-2"
				/>
			</PopoverContent>
		</Popover>
	);
}
