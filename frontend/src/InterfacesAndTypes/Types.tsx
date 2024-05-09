export type Duration = {
    durationDays: number;
    durationHours: number;
    durationMinutes: number;
}

export type TimeSlot = {
    start: string;
    end: string;
    remainingCapacity: string;
}

export type Booking = {
    customerName: string;
    activityName: string;
    participantsNum: string;
    timeframe: string;
    pricePayed: string;
};
export type ActivityOption = {
    activityName: string;
    activityDescription: string;
    activityDuration: String;
    activityCapacity: number;

}
  
export type Props = {
    booking: Booking[];
    activityOption: ActivityOption[];
};