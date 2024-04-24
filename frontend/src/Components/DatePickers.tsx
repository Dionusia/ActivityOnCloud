/*import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePick: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="relative max-w-sm">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholderText="Select date"
      />

      <svg
        className="absolute inset-y-0 left-2 top-1/2 transform -translate-y-1/2 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="blue"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 4h14V18H3V4zM5 8h10M5 12h10M7 16h6"
        />
      </svg>
    </div>
  );
};

export default DatePick;
*/
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const DatePick: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="relative max-w-sm">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholderText="Select date"
        required
      />
      <div className="absolute inset-y-0 left-2 top-1/2 transform -translate-y-1/2 w-4 h-4">
        <FaCalendarAlt color="blue" />
      </div>
    </div>
  );
};

export default DatePick;
