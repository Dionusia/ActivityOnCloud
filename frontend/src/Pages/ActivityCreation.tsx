import React, { useEffect, useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import { Button, Modal } from "flowbite-react";
import instance from "../AxiosConfig";
import { Category } from "../InterfacesAndTypes/Types";
import AddCategoryModal from "../Components/AddCategoryModal";
import CategorySelect from "../Components/CategorySelect";
import ActivityDetails from "../Components/ActivityDetails";
import TimePicker from "../Components/TimeField";

const ActivityCreation: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeData, setTimeData] = useState<
    Array<{ days: string[]; startTime: string; endTime: string }>
  >([]);

  const handleTimeChange = (startTime: string, endTime: string) => {
    // setTimeData({ days: selectedDays, startTime, endTime });
    setTimeData((prevData) => [
      ...prevData,
      { days: selectedDays, startTime, endTime },
    ]);
    console.log(selectedDays, startTime, endTime);
  };

  const handleSave = () => {
    instance
      .post("/activity/save", {
        name: newCategory,
        admin: {
          id: 1,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCategories((prevCategories) => [...prevCategories, response.data]);
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("There was an error saving the category: ", error);
      });
  };

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

  const handleDayClick = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

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
        startTime: "",
        endTime: "",
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
            <div>
              <Button
                className="w-3/4  md:w-auto flex-1 m-2  bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
                type="submit"
              >
                Submit
              </Button>
            </div>

            <AddCategoryModal
              show={openModal}
              onClose={() => setOpenModal(false)}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              handleSave={handleSave}
            />
          </div>

          <ActivityDetails />
          <div className="flex">
            <TimePicker
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              handleDayClick={handleDayClick}
              onTimeChange={handleTimeChange}
            />
            <div className="flex flex-col">
              {
              timeData.map((data, index) => (
                <div
                  key={index}
                  className="  bg-white rounded-lg p-6 shadow-lg mb-4"
                >
                  <p className="text-lg font-semibold mb-2">
                    Selected Days:
                    <span className="font-normal">{data.days.join(", ")}</span>
                  </p>
                  <p className="text-lg font-semibold mb-2">
                    Start Time:
                    <span className="font-normal">{data.startTime}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    End Time:{" "}
                    <span className="font-normal">{data.endTime}</span>
                  </p>
                </div>
                
              ))}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default ActivityCreation;