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
    setTimeData((prevData) => [
      ...prevData,
      { days: selectedDays, startTime, endTime },
    ]);
  };
  const resetStates = () => {
    setOpenModal(false);
    setNewCategory("");
    setSelectedDays([]);
    setTimeData([]);
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
  const handleDelete = (index: number) => {
    let newDataArray = [...timeData];
    newDataArray.splice(index, 1);
    setTimeData(newDataArray);
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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const selectedCategory = categories.find(
          (category) => category.id === Number(values.category)
        );
        if (timeData.length === 0) {
          alert("Please select at least one time slot");
          return;
        }

        if (!selectedCategory) {
          console.error("No category found with id:", values.category);
          return;
        }

        const data = {
          name: values.title,
          duration: values.duration,
          description: values.description,
          pricePerPerson: values.price,
          capacity: values.capacity,
          imageURL: null,
          activityName: selectedCategory.name,
          activityId: selectedCategory.id,
          adminId: 1,
          availabilityList: timeData.flatMap((item) =>
            item.days.map((day) => ({
              day,
              startTime: item.startTime,
              endTime: item.endTime,
            }))
          ),
        };

        console.log("availabilityList state variable:", timeData);
        console.log("data object:", data);
        instance
          .post("/activity-option/new", data)
          .then((response) => {
            console.log("Data submitted successfully: ", response);
            alert("Data submitted successfully");
            resetForm();
            resetStates();
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
          <AddCategoryModal
            show={openModal}
            onClose={() => setOpenModal(false)}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleSave={handleSave}
          />
          <div className="flex  w-2/3  m-2 p-1">
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
              onAddCategory={() => {
                setOpenModal(true);
              }}
            />
            <div>
              <Button
                className="w-3/4  md:w-auto flex-1 m-2  bg-customGreen text-white rounded-lg hover:bg-customGreen-dark"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>

          <ActivityDetails />
          <div className="flex">
            <TimePicker
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              handleDayClick={handleDayClick}
              onTimeChange={handleTimeChange}
            />
            <div className="flex flex-col max-h-[640px] overflow-y-auto max-w-96">
              {timeData.map((data, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg p-6 shadow-lg mb-4"
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
                  <button
                    className="mt-auto self-end p-2  bg-red-500  text-white rounded-lg hover:bg-customGreen-dark"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
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
