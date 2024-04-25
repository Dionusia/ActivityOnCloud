import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

interface DatePickProps {
  onDateChange: (date: Date | null) => void;
  selectedDate: Date | null;
}

const DatePick: React.FC<DatePickProps> = ({ onDateChange, selectedDate }) => {
 
  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <div className="relative flex pl-10">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholderText="Select date"
        required
      />
      <div className="absolute inset-y-0 left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pl-10">
        <FaCalendarAlt color="blue" />
      </div>
    </div>
  );
};

export default DatePick;
