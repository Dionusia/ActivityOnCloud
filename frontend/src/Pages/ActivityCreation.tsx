import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextInput } from "flowbite-react";
import PersonPicker from "../Components/PersonPicker";
import { PersonPickerProps } from "../InterfacesAndTypes/Interfaces";

const ActivityCreation: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);

  const onPersonChange = (num: number | null) => {
    setSelectedPerson(num);
  };
  return (
    <Formik
      initialValues={{ name: "", surname: "", email: "", phone: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex-col items-center">
          <div className="flex flex-wrap p-1">
            <div className="w-1/2 flex">
              <Field
                className=" md:w-1/3 flex-grow m-2  rounded-lg focus:ring-customGreen focus:border-customGreen"
                type="text"
                name="name"
                placeholder="Title"
              />

              <Field
                as="select"
                name="category"
                className=" md:w-1/3 flex-1 m-2 rounded-lg focus:ring-customGreen focus:border-customGreen"
              >
                <option value="">Category</option>
                <option value="category1">WaterSports</option>
                <option value="category2">MountainBike</option>
                <option value="category3">Yoga</option>
              </Field>
            </div>
            <div className="w-1/2 ">
              <Field
                type="number"
                name="capacity"
                placeholder="People"
                className=" w-1/4 flex-1 m-2 rounded-lg bg-white  focus:ring-customGreen focus:border-customGreen"
              />
            </div>
          </div>

          <div className="flex flex-wrap   md:flex-wrap p-1">
            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              className="w-1/4 flex-1 m-2 rounded-lg bg-white focus:ring-customGreen focus:border-customGreen"
              style={{ maxHeight: "95px" }}
            />
            <div className="flex flex-col w-1/2">
              <Field
                type="number"
                name="price"
                placeholder="Price"
                className=" w-1/4 flex-1 m-2 rounded-lg bg-white h-1/4 focus:ring-customGreen focus:border-customGreen"
              />
              <Field
                type="number"
                name="duration"
                placeholder="Duration"
                min="0"
                className="w-1/4 flex-1 m-2 rounded-lg bg-white h-1/4 focus:ring-customGreen focus:border-customGreen"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between p-1">
            <Field
              type="file"
              name="photo"
              className="w-full md:w-1/4 flex-1 m-2 rounded-lg bg-white"
            />
          </div>
          <div className="flex  w-1/2 justify-center">
            <Button
              className="w-full md:w-1/2 flex-1 m-2 bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default ActivityCreation;
