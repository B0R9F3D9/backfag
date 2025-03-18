import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { DATE_RANGES } from '@/constants/dateRanges';
import { formatDateRange } from '@/hooks/useCheckerData';

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
	disabled: boolean;
}

export function DateTimePicker({
	dateRange,
	setDateRange,
	disabled,
}: DateTimePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					disabled={disabled}
					className="w-full sm:w-64 mx-auto justify-start text-left"
				>
					<CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
					<span className="truncate">
						{DATE_RANGES.find(
							r => r.from === dateRange?.from && r.to === dateRange?.to,
						)?.label || formatDateRange(dateRange)}
					</span>
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
