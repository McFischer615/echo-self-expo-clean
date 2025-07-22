// components/ui/calendar.tsx
import React from "react";
import { Calendar as RNCalendar } from "react-native-calendars";

interface CalendarProps {
  onDayPress?: (day: string) => void;
  selectedDate?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ onDayPress, selectedDate }) => {
  return (
    <RNCalendar
      onDayPress={(day) => onDayPress && onDayPress(day.dateString)}
      markedDates={{
        [selectedDate || ""]: {
          selected: true,
          selectedColor: "#6C4EE3",
        },
      }}
      theme={{
        selectedDayBackgroundColor: "#6C4EE3",
        todayTextColor: "#6C4EE3",
        arrowColor: "#6C4EE3",
      }}
    />
  );
};
