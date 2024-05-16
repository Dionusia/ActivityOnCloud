import React, { useState } from "react";

const TimePicker = () => {
  const [day, setDay] = useState("");

  const handleDayChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDay(event.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        Schedule Your Opening Hours
      </h2>

      <div className="p-4">
        <label className="block">Pick The Day</label>
        <select
          className="w-full mt-2 p-2 border border-gray-300 rounded"
          name="day"
          value={day}
          onChange={handleDayChange}
        >
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
        <label className="block mt-4">Pick your time</label>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
