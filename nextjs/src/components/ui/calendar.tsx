"use client";

import * as React from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface RangeCalendarProps {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  className?: string;
  numberOfMonths?: number;
}

const RangeCalendar: React.FC<RangeCalendarProps> = ({
  selected,
  onSelect,
  className,
  numberOfMonths = 1,
}) => {
  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      onSelect(range);
    } else if (range?.from) {
      onSelect({ from: range.from, to: undefined });
    } else {
      onSelect(undefined);
    }
  };

  return (
    <DayPicker
      mode="range"
      selected={selected}
      onSelect={handleSelect}
      numberOfMonths={numberOfMonths}
      className={className}
    />
  );
};

export default RangeCalendar;
