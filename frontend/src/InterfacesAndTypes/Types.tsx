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
  
export type Props = {
    booking: Booking[];
};