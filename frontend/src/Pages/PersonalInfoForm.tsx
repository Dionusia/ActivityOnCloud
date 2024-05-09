import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Label, TextInput, CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import instance from '../AxiosConfig';

const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        primary: "bg-red-500 hover:bg-red-600",
      },
    },
  };


const PersonalInfoForm = () => {
    return (
        <div>
        <h1 className="text-center mb-5 shadow-md">Personal Information</h1>
        <Formik
            initialValues={{ firstname: '', surname: '', email: '', phone: '' }}
            
            onSubmit={(values, { setSubmitting }) => {
                instance.post('/booking', values).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error + ': Post Request Error from Personal Info Page');
                })

                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <Form onSubmit={formik.handleSubmit} className="px-4 flex-col items-center">
                    <div className="mb-2 block">
                        <Label htmlFor="firstname" value="Your First Name" />
                        <TextInput type="text" placeholder="first name" {...formik.getFieldProps('firstname')} required  />
                    </div>  
                    <div className="mb-2 block">
                        <Label htmlFor="surname" value="Your Surname" />
                        <TextInput id="surname" type="text" placeholder="surname" {...formik.getFieldProps('surname')} required />
                    </div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your Email" />
                        <TextInput type="email" placeholder="email" {...formik.getFieldProps('email')}required />
                    </div>
                    <div>
                        <Label htmlFor="phone" value="Your Phone" />
                        <TextInput  type="tel" placeholder="phone" {...formik.getFieldProps('phone')} required />
                    </div>
                    <div className='flex justify-center mt-2'>
                        <Button type="submit" className="bg-customGreen text-white">Submit</Button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    );
}

export default PersonalInfoForm;