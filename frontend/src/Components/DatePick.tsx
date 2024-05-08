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
    <div className="relative flex">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-customGreen focus:border-customGreen block w-full pl-8 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholderText="Select date"
        dateFormat='dd-MM-yyyy'
        popperPlacement="bottom-end"
        required
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <FaCalendarAlt color="#049bb1" />
      </div>
    </div>
  );
};

export default DatePick;
