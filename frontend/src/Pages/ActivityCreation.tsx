import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextInput } from "flowbite-react";
import PersonPicker from "../Components/PersonPicker";
import { PersonPickerProps } from "../InterfacesAndTypes/Interfaces";
import instance from "../AxiosConfig";
import { Category } from "../InterfacesAndTypes/Types";
import { number } from "yup";

const ActivityCreation: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    instance
      .get("/activity")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error retrieving the activities array" + error
        );
      });
  }, []);

  return (
    <div className="flex justify-center w-8/10">
      <Formik
        initialValues={{
          title: "",
          category: "",
          description: "",
          price: "",
          duration: "",
          capacity: "",
          photo: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          const selectedCategory = categories.find(
            (category) => category.id === Number(values.category)
          );

          if (!selectedCategory) {
            console.error("No category found with id:", values.category);
            return;
          }

          const data = {
            name: values.title,
            description: values.description,
            duration: "01:24",
            capacity: values.capacity,
            activity: {
              id: selectedCategory.id,
              name: selectedCategory.name,
              admin: {
                id: selectedCategory.adminId,
              },
            },
            pricePerPerson: values.price,
            imageUrl: null,
          };

          instance
            .post("/activity-option/save", data)
            .then((response) => {
              alert("Data submitted successfully");
              setSubmitting(false);
            })
            .catch((error) => {
              console.error(
                "There was an error submitting the form: ",
                error.response ? error.response.data : error
              );
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="">
            <div className="flex  w-full  m-2 p-1">
              <Field
                className="flex-1 m-2  rounded-lg focus:ring-customGreen focus:border-customGreen"
                type="text"
                name="title"
                placeholder="Title"
              />

              <Field
                as="select"
                name="category"
                className="flex-1 m-2 rounded-lg focus:ring-customGreen focus:border-customGreen"
              >
                <option value="">Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
            </div>

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
                  className=" w-1/2  flex-1 m-2 rounded-lg bg-white h-1/4 focus:ring-customGreen focus:border-customGreen"
                />
                <Field
                  type="number"
                  name="duration"
                  placeholder="Duration"
                  min="0"
                  className="w-1/2 flex-1 m-2 rounded-lg bg-white h-1/4 focus:ring-customGreen focus:border-customGreen"
                />
                <Field
                  type="number"
                  name="capacity"
                  placeholder="People"
                  className=" w-1/2 flex-1 m-2 rounded-lg bg-white  h-1/4 focus:ring-customGreen focus:border-customGreen"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Field
                type="file"
                name="photo"
                className="w-1/2 flex-1 m-2 rounded-lg bg-white"
              />

              <Button
                className="w-8/10  md:w-1/2 flex-1 m-2  bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ActivityCreation;
