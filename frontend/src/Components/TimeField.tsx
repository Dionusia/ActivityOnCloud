import React from "react";
import { Field, FormikProps } from "formik";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TimePicker: React.FC = () => (
  <>
    <h2 className="text-2xl font-semibold text-gray-900">
      Schedule Your Opening Hours
    </h2>

    <div className="flex flex-col   p-1 w-2/3 ">
      <label className="block m-2">Pick The Day</label>
      <div className="">
        {daysOfWeek.map((day) => (
          <button
            type="button"
            key={day}
            onClick={() => console.log(day)}
            className="p-2 m-2 flex-1 border border-gray-300 rounded-lg"
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
          required
        />
        <label className="m-4 ">to time </label>
        <Field
          name="endTime"
          type="time"
          className=" mt-2 p-2 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="button"
          className="m-4 p-2 bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
        >
          Add Time
        </button>
      </div>
    </div>
  </>
);

export default TimePicker;
