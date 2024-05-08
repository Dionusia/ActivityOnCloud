import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, TextInput, CustomFlowbiteTheme, Flowbite } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        primary: "bg-red-500 hover:bg-red-600",
      },
    },
  };


const PersonalInfoForm = () => (
    <div className="">
    <h1 className="text-center mb-5 shadow-md">Personal Information</h1>
    <Formik
      initialValues={{ name: '', surname: '', email: '', phone: '' }}
      /*validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.surname) {
          errors.surname = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.phone) {
          errors.phone = 'Required';
        }
        return errors;
      }}*/
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="px-4 flex-col items-center">
        <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
            <TextInput name="name" type="text" placeholder="name" required />
            <ErrorMessage name="name" component="div" />
        </div>  
        <div className="mb-2 block">
            <Label htmlFor="surname" value="Your Surname" />
            <TextInput name="surname" type="text" placeholder="surname" required />
            <ErrorMessage name="surname" component="div" />
        </div>
        <div className="mb-2 block">
            <Label htmlFor="email" value="Your Email" />
            <TextInput name="email" type="email" placeholder="email" required />
            <ErrorMessage name="email" component="div" />
        </div>
        <div>
            <Label htmlFor="phone" value="Your Phone" />
            <TextInput name="phone" type="tel" placeholder="phone" required />
            <ErrorMessage name="phone" component="div" />
        </div>
        <div className='flex justify-center mt-2'>
            <Button type="submit" disabled={isSubmitting} className="bg-customGreen text-white">Submit</Button>
        </div>
       
      </Form>
    )}
  </Formik>
  </div>
);

export default PersonalInfoForm;