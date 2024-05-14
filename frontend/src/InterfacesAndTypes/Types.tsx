export type TimeSlot = {
  start: string;
  end: string;
  remainingCapacity: string;
};

export type Booking = {
  id: string;
  customerName: string;
  contact: string;
  activityName: string;
  participantsNum: string;
  timeframe: string;
  pricePayed: string;
};

export type Option = {
  activityName: string;
  activityDescription: string;
  activityDuration: String;
  activityCapacity: number;
  activityImageUrl: string;
};

export type Props = {
  booking: Booking[];
};

export type ActivityOptionProps = {
  activityOption: Option[];
};
