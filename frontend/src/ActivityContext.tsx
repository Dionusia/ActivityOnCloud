import React from "react";
import { ActivityOption, ActivityContextProps, ExtendedUserInputArgs } from "./InterfacesAndTypes/Interfaces";

const ActivityContext = React.createContext<ActivityContextProps>({
  selectedOption: null,
  setSelectedOption: (option: ActivityOption | null) => {},
  selectedInfoFinal: null,
  setSelectedInfoFinal: (info: ExtendedUserInputArgs | null) => {},
});
export default ActivityContext;