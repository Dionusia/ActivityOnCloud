import React from "react";
import { Field, FormikProps, useFormikContext } from "formik";
import { TimeFieldProps } from "../InterfacesAndTypes/Interfaces";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
interface FormValues {
  startTime: string;
  endTime: string;
}

const TimePicker: React.FC<TimeFieldProps> = ({
  selectedDays,
  setSelectedDays,
  handleDayClick,
  onTimeChange,
}) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const handleAddClick = () => {
    if (!values.startTime || !values.endTime || selectedDays.length === 0) {
      return alert("Please select start and end time");
    }

    // other logic...
    setSelectedDays([]);
    onTimeChange(values.startTime, values.endTime); // Call the callback function
    setFieldValue("startTime", "");
    setFieldValue("endTime", "");
  };
  return (
    <>
      <div className="flex flex-col   p-1 w-3/4 ">
        <h2 className="text-2xl m-2 font-semibold text-gray-900">
          Schedule Your Opening Hours
        </h2>

        <label className="block m-2">Pick The Day</label>
        <div className="">
          {daysOfWeek.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => handleDayClick(day)}
              className={`p-2 m-2 flex-1 border border-gray-300 rounded-lg ${
                selectedDays.includes(day) ? "bg-gray-200" : ""
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="">
          <label className=" m-4 ">From time</label>
          <Field
            name="startTime"
            type="time"
            className=" mt-2 p-2 border border-gray-300 rounded-lg"
          />
          <label className="m-4 ">to time </label>
          <Field
            name="endTime"
            type="time"
            className=" mt-2 p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="button"
            className="m-4 p-2 bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
            name="addDayTime"
            onClick={() => {
              handleAddClick();
            }}
          >
            Add DayTime
          </button>
        </div>
      </div>
    </>
  );
};

export default TimePicker;
