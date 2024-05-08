import { Duration, TimeSlot } from "./Types";

export interface UserInputArgs {
    selectedPerson: number;
    selectedDate: string;
}

export interface Activity {
    id: number;
    activityAdmin: number;
    name: string;
    description: string;
    durationDays: number;
    durationHours: number;
    durationMinutes: number;
    pricePerPerson: number;
}

export interface ButtonProp {
    text: string;
    onClick: (activity: Activity, userInputArgs: ExtendedUserInputArgs) => void;
    activity: Activity;
    userInputArgs: ExtendedUserInputArgs;
    
}
// μπορει να μπορουν να γινουν 1 interface (1)
export interface ActivityTitleProp {
    text: string;

}
// μπορει να μπορουν να γινουν 1 interface (2)
export interface ActivityDescriptionProp {
    text: string;
    duration: Duration;
    price: number;
}

export interface TimePickerProp{
    timeList: string[];
    selectedTime: string;
    setSelectedTime: (time: string) => void;
}

export interface ExtendedUserInputArgs extends UserInputArgs {
    selectedTime: string;
    price: number;
}

export interface ActivityInfoParentProps {
   activity: Activity;
   timeSlot: TimeSlot[];
    userInputArgs: UserInputArgs;
}

export interface TimeSlots {
    [key: string]: TimeSlot[];
}