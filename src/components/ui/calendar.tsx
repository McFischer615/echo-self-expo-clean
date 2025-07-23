import React from "react";
import { Calendar as RNCalendar, CalendarProps as RNCalendarProps } from "react-native-calendars";
import styled from "styled-components/native";

interface CalendarProps {
  onDayPress?: (day: string) => void;
  selectedDate?: string;
}

// Styled RNCalendar with dynamic props
const StyledCalendar = styled(RNCalendar).attrs(({ selectedDate }: { selectedDate?: string }) => ({
  markedDates: {
    [selectedDate || ""]: {
      selected: true,
      selectedColor: "#6C4EE3", // Purple brand color
    },
  },
  theme: {
    selectedDayBackgroundColor: "#6C4EE3",
    todayTextColor: "#6C4EE3",
    arrowColor: "#6C4EE3",
  },
}))``;

export const Calendar: React.FC<CalendarProps> = ({ onDayPress, selectedDate }) => {
  return (
    <StyledCalendar
      selectedDate={selectedDate}
      onDayPress={(day) => onDayPress && onDayPress(day.dateString)}
    />
  );
};
