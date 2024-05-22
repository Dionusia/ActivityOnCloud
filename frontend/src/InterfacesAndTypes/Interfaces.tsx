import { AxiosInstance } from "axios";
import {Category, AvailabilityInfoList, TimeSlot } from "./Types";

interface Activity {
  id: number;
  name: string;
  admin: { id: number };
}

export interface ActivityOption {
  id: number;
  name: string;
  description: string;
  duration: string;
  capacity: number;
  activity: Activity;
  pricePerPerson: number;
  imageUrl: string;
}

// μπορει να μπορουν να γινουν 1 interface (1)
export interface ActivityOptionTitleProp {
  text: string;
}
// μπορει να μπορουν να γινουν 1 interface (2)
export interface ActivityOptionDescriptionProp {
  text: string;
  price: number;
  numberOfPeople: number;
}

export interface TimePickerProp{
    timeList: string[];
    selectedTime: string;
    setSelectedTime: (time: string) => void;
    timeCapacity: string[];
    selectedPersons: number;
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
  pricePerPerson: number;
}

export interface TimeSlotsResponse {
    availabilityInfoList: AvailabilityInfoList;
    optionId: number;
}

export interface OptionToBeRendered {
    activityOption: ActivityOption;
    availabilityInfoList: AvailabilityInfoList;
}


export interface DatePickProps {
    onDateChange: (date: Date | null) => void;
    selectedDate: Date | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export interface FilterComponentsProps {
    setTimeSlotsResponse: React.Dispatch<React.SetStateAction<TimeSlotsResponse[]>>;
    selectedPerson: number | null;
    setSelectedPerson: React.Dispatch<React.SetStateAction<number | null>>;
    setFormattedDate: React.Dispatch<React.SetStateAction<string>>;
    
}

export interface PersonPickerProps {
    onPersonChange: (num: number | null) => void;
    selectedPerson: number | null;
    setSelectedPerson: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface SearchButtonProps {
  onSearch: () => void;
}

export interface ActivityContextProps {
  selectedOption: ActivityOption | null;
  setSelectedOption: (option: ActivityOption | null) => void;
  selectedInfoFinal: ExtendedUserInputArgs | null;
  setSelectedInfoFinal: (info: ExtendedUserInputArgs | null) => void;
  instance: AxiosInstance | null;
}

export interface AddCategoryModalProps {
  show: boolean;
  onClose: () => void;
  handleSave: () => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
}

export interface CategorySelectProps {
  categories: Category[];
  onAddCategory: () => void;
  handleChange: (e: any) => void;
}

export interface TimeFieldProps {
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  handleDayClick: (day: string) => void;
  onTimeChange: (startTime: string, endTime: string) => void;
}

export interface BookingEngineListProps {
    optionsToBeRendered: OptionToBeRendered[];
    selectedCard: number | null;
    setSelectedCard: (index: number) => void;
    selectedPerson: number;
    formattedDate: string;
}

export interface User {
  token: string;
  expiresIn: string;
  adminId: string;
}