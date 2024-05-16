import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ActivityOptionProps, Props } from "../InterfacesAndTypes/Types";
import { Card } from "flowbite-react";
import { log } from "console";


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

const ActivityOptionCards: React.FC<ActivityOptionProps> = ({activityOption}) => {
  const photo = [activityOption];
  console.log(activityOption);
  
  return (
      <div className="overflow-hidden">
      
      <Carousel responsive={responsive} className=" items-center">
        {activityOption.map((activityItem, index) => {
          // console.log(process.env.REACT_APP_PUBLIC_URL);
          console.log(`Photos/${activityItem.activityImageUrl}`);
          // console.log(`${process.env.REACT_APP_PUBLIC_URL}/${activityItem.activityImageUrl}`);
          
          return(
            <div className="ml-[52px] max-w-[384px] min-w-[384px]" key={index}> {/* fixed for 16:9 screens but not for every screen */ }
              <Card className=" w-[280px] h-[300px] mb-6"> {/* πλατος=384, πλατος καρτας=280, margin-x=52 για να ειναι κεντρισμενη καρτα μετα στο div*/}
                  <img
                    className="object-cover rounded-t-lg w-[280px] mt-0"
                    style={{ height: '150px' }}
                    src={`Photos/${activityItem.activityImageUrl}`}
                    alt={`${activityItem.activityImageUrl}`}
                  />
                  <div>
                    <h2 className="font-medium mb-2">{activityItem.activityName}</h2>
                    <p className="mb-2">{activityItem.activityDescription}</p>
                    <p className="pb-2">Duration: {activityItem.activityDuration}</p>
                    <p className="pb-8">Capacity: {activityItem.activityCapacity}</p>
                  </div>
              </Card>
            </div>)
        }
      )}
      </Carousel>
      </div>
  );
};


export default ActivityOptionCards;
