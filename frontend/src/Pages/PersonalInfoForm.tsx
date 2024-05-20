import React, { useContext} from 'react';
import { useFormik } from 'formik';
import { Button, Label, TextInput} from 'flowbite-react';
import * as Yup from 'yup';
import ActivityContext from '../ActivityContext';
import { ActivityOption, ExtendedUserInputArgs } from '../InterfacesAndTypes/Interfaces';
import { v4 as uuidv4 } from 'uuid';



const PersonalInfoForm = () => {
    const activityContext = useContext(ActivityContext);
    const instance = activityContext.instance;
    console.log(activityContext.selectedOption  , activityContext.selectedInfoFinal);

    const formik = useFormik({
        initialValues: { firstname: '', surname: '', email: '', phone: '' },
        validationSchema: Yup.object({
          firstname: Yup.string().max(32, 'Must be 32 characters or less').required('Required'),
          surname: Yup.string().max(48, 'Must be 48 characters or less').required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: (values) => {
          console.log(values);
          handleBookClick(activityContext.selectedOption  , activityContext.selectedInfoFinal);
        },
      });

    const handleBookClick = (activity: ActivityOption | null, selectedInfoFinal: ExtendedUserInputArgs | null) => {
        const uuid = uuidv4();
        if (selectedInfoFinal && activity) {
            console.log("Info: "+ selectedInfoFinal.selectedTime, selectedInfoFinal.price, selectedInfoFinal.selectedPerson, selectedInfoFinal.selectedDate);
            if(instance !== null) {
                instance.post('/booking/save', {
                    uuid: uuid,
                    name: formik.values.firstname,
                    surname: formik.values.surname,
                    email: formik.values.email,
                    phone: formik.values.phone,
                    activityAdmin: {id: activity.activity.admin.id},
                    activityOption:{
                        id: activity.id,
                    },
                    date: selectedInfoFinal.selectedDate,
                    startTime: selectedInfoFinal.selectedDate+"T"+selectedInfoFinal.selectedTime,
                    persons: selectedInfoFinal.selectedPerson,
                    totalPrice: selectedInfoFinal.price,
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Submit Booking Error:', error);
                });
            } else {
                console.error('Axios instance is null in PersonalInfoForm.');
            }
        }
    }
    
        
    return (
        <div>
        <h1 className="text-center mb-5 shadow-md">Personal Information</h1>
                <form onSubmit={formik.handleSubmit} className="px-4 flex-col items-center">
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
                </form>
        </div>
    );
}

export default PersonalInfoForm;