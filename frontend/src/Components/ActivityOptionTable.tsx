import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ActivityOptionProps, Props } from "../InterfacesAndTypes/Types";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ActivityOptionCards: React.FC<ActivityOptionProps> = ({
  activityOption,
}) => {
  const photo = [activityOption];
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-4/5 mx-auto">
      <Carousel responsive={responsive}>
        {activityOption.map((activityItem, index) => (
          <div className="flex h-full items-center justify-center bg-white dark:bg-indigo-700 text-black">
            <div className="shadow-md m-4 p-4 w-64 h-70 rounded-lg bg-gray-100">
              <img
                className="object-cover h-32 w-full"
                src={activityItem.activityImageUrl}
                alt={activityItem.activityName}
              />
              <h2 className="font-medium mb-2">{activityItem.activityName}</h2>
              <p className="mb-2">{activityItem.activityDescription}</p>
              <p className="mb-2">Duration: {activityItem.activityDuration}</p>
              <p>Capacity: {activityItem.activityCapacity}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ActivityOptionCards;
