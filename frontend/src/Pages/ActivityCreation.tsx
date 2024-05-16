import React, { useEffect, useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import { Button, Modal } from "flowbite-react";
import instance from "../AxiosConfig";
import { Category } from "../InterfacesAndTypes/Types";
import AddCategoryModal from "../Components/AddCategoryModal";
import CategorySelect from "../Components/CategorySelect";
import ActivityDetails from "../Components/ActivityDetails";
import TimePick from "../Components/TimePickerModal";

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

  {
  }
  return (
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
            console.log("Data submitted successfully: ", response);
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

            <CategorySelect
              handleChange={handleChange}
              categories={categories}
              onAddCategory={() => setOpenModal(true)}
            />
            <Button
              className="w-8/10  md:w-1/2 flex-1 m-2  bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
              type="submit"
            >
              Submit
            </Button>

            <AddCategoryModal
              show={openModal}
              onClose={() => setOpenModal(false)}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
            />
          </div>

          <ActivityDetails />
          <TimePick />
        </Form>
      )}
    </Formik>
  );
};
export default ActivityCreation;
