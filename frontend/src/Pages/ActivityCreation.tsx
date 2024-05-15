import React, { useEffect, useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import { Button, Modal } from "flowbite-react";
import instance from "../AxiosConfig";
import { Category } from "../InterfacesAndTypes/Types";

const ActivityCreation: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

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
            duration: values.duration,
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
              setSubmitting(true);
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
        {({ isSubmitting, handleChange }) => (
          <Form className="">
            <div className="flex  w-full  m-2 p-1">
              <Field
                className="flex-1 m-2  rounded-lg focus:ring-customGreen focus:border-customGreen"
                type="text"
                name="title"
                placeholder="Title"
                required
              />
              <Field
                as="select"
                name="category"
                className="flex-1 m-2 rounded-lg focus:ring-customGreen focus:border-customGreen"
                onChange={(e: any) => {
                  handleChange(e);

                  if (e.target.value === "Add category") {
                    setOpenModal(true);
                  }
                }}
                required
              >
                <option value="">Categories</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option>Add category</option>
              </Field>
              <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                className="mx-auto my-auto w-1/2 max-x-lg"
              >
                <Modal.Header>Add Category</Modal.Header>
                <Modal.Body>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="m-2 flex-1  w-2/3  justify-center shadow-sm focus:ring-customGreen focus:border-customGreen  sm:text-sm border-gray-300 rounded-md"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="w-1/8   flex-1 m-2  bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
                    type="button"
                  >
                    Save
                  </Button>
                  <Button
                    className="w-1/8   flex-1 m-2  bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
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
