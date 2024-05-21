import React from "react";
import { Field, useFormikContext } from "formik";
import { CategorySelectProps } from "../InterfacesAndTypes/Interfaces";

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  onAddCategory,
  handleChange,
}) => (
  <Field
    as="select"
    name="category"
    className="flex-1 m-2 rounded-lg focus:ring-customGreen focus:border-customGreen"
    onChange={(e: any) => {
      handleChange(e);
      if (e.target.value === "Add category") {
        handleChange({
          target: {
            name: "category",
            value: categories[categories.length - 1],
          },
        });
        console.log(categories[categories.length - 1]);
        onAddCategory();
      }
    }}
    required
  >
    <option value="">Categories</option>
    {categories && categories.length > 0
      ? categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))
      : null}
    <option>Add category</option>
  </Field>
);

export default CategorySelect;
