import { TimeSlot } from "./Types";

interface Activity {
    id: number;
    name: string;
    admin: {id:number};
}

export interface ActivityOption {
    id: number;
    name: string;
    description: string;
    duration: string;
    capacity: number;
    activity: Activity;
    pricePerPerson: number;
}

export interface ButtonProp {
    text: string;
    onClick: (activity: ActivityOption, userInputArgs: ExtendedUserInputArgs) => void;
    activity: ActivityOption;
    userInputArgs: ExtendedUserInputArgs;
    
}
// μπορει να μπορουν να γινουν 1 interface (1)
export interface ActivityOptionTitleProp {
    text: string;

}
// μπορει να μπορουν να γινουν 1 interface (2)
export interface ActivityOptionDescriptionProp {
    text: string;
    duration: string;
    price: number;
    numberOfPeople: number;
}

export interface TimePickerProp{
    timeList: string[];
    selectedTime: string;
    setSelectedTime: (time: string) => void;
}

export interface UserInputArgs {
    selectedPerson: number;
    selectedDate: string;
}

export interface ExtendedUserInputArgs extends UserInputArgs {

    selectedTime: string;
    price: number;
}

export interface ActivityOptionInfoParentProps {
   activity: ActivityOption;
   timeSlot: TimeSlot[];
    userInputArgs: UserInputArgs;
}

export interface TimeSlots {
    [key: string]: TimeSlot[];
}

export interface DatePickProps {
    onDateChange: (date: Date | null) => void;
    selectedDate: Date | null;
}

export interface FilterComponentsProps {
    setTimeSlots: React.Dispatch<React.SetStateAction<TimeSlots>>;
    selectedPerson: number | null;
    setSelectedPerson: React.Dispatch<React.SetStateAction<number | null>>;
    setFormattedDate: React.Dispatch<React.SetStateAction<string>>;
}

export interface PersonPickerProps {
    onPersonChange: (num: number | null) => void;
    selectedPerson: number | null;
}

export interface SearchButtonProps {
    onSearch: () => void;
}
  