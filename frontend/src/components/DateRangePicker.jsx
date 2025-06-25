
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const DateRangePicker = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (range) => {
    onDateRangeChange(range);
    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return "Select date range";
    if (!dateRange?.to) return format(dateRange.from, "MMM dd, yyyy");
    return `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:w-64 justify-start text-left font-normal",
            !dateRange?.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          className="pointer-events-auto"
        />
        <div className="p-3 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onDateRangeChange(undefined);
              setIsOpen(false);
            }}
            className="w-full"
          >
            Clear dates
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
