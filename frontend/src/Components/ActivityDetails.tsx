import React from "react";
import { Field } from "formik";

const ActivityDetails: React.FC = () => (
  <div className="flex m-2 p-1  ">
    <Field
      as="textarea"
      name="description"
      placeholder="Description"
      className="w-1/2 flex-1 m-2 rounded-lg bg-white focus:ring-customGreen focus:border-customGreen"
      style={{ maxHeight: "140px" }}
    />
    <div className="flex flex-col  items-center">
      <Field
        type="number"
        name="price"
        placeholder="Price"
        min="0"
        step="0.1"
        className=" w-2/3  flex-1 m-2 rounded-lg bg-white h-1/4 focus:ring-customGreen focus:border-customGreen"
      />
      <Field
        type="text"
        name="duration"
        placeholder="(HH:MM)"
        pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
        className="w-2/3 flex-1 m-2 rounded-lg bg-white h-1/4 focus:ring-customGreen focus:border-customGreen"
        required
      />
      <Field
        type="number"
        name="capacity"
        placeholder="People"
        className=" w-2/3 flex-1 m-2 rounded-lg bg-white  h-1/4 focus:ring-customGreen focus:border-customGreen"
      />
    </div>
    <Field
      type="file"
      name="photo"
      className="w-1/2 justify-end flex-1 m-2 rounded-lg bg-white"
    />
  </div>
);

export default ActivityDetails;
