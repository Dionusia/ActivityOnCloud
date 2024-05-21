import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ActivityOptionProps} from "../InterfacesAndTypes/Types";
import { Card } from "flowbite-react";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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
  // const photo = [activityOption];
  console.log(activityOption);
  
  return (
      <div className="overflow-hidden">
      
      <Carousel responsive={responsive} className=" items-center max-w-screen">
        {activityOption.map((activityItem, index) => {
          // console.log(process.env.REACT_APP_PUBLIC_URL);
          console.log(`Photos/${activityItem.activityImageUrl}`);
          // console.log(`${process.env.REACT_APP_PUBLIC_URL}/${activityItem.activityImageUrl}`);
          
          return(
            <div className="ml-[52px] max-w-[384px] min-w-[384px]" key={index}>
              <Card className="relative w-[360px] h-[480px] mb-6"> 
                  <img
                    className="object-cover rounded-t-lg w-[360px] mt-0"
                    style={{ height: '200px' }}
                    src={`Photos/${activityItem.activityImageUrl}`}
                    alt={`${activityItem.activityImageUrl}`}
                  />
                  <div className="bottom-2 font-roboto-slub mt-4 mx-2">
                    <h2 className=" font-medium text-lg italic mb-2">{activityItem.activityName}</h2>
                    <p className="italic mx-2 mb-2">{activityItem.activityDescription}</p>
                    <div className="absolute bottom-2 items-centered w-full">
                      <p className=" bottom-2 pb-2 ">Duration: {activityItem.activityDuration}</p>
                      <p className=" bottom-2 pb-2">Capacity: {activityItem.activityCapacity}</p>
                    </div>
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
