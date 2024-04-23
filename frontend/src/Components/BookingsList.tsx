import React from 'react';

type Booking = {
  activityDescription: string;
  activityName: string;
  imageUrl: string;
  timeframe: string;
  payment?: string;
  paymentDateTime?: string;
};

type Props = {
  booking: Booking[];
};


const BookingsList: React.FC<Props> = ({ booking }) => (
  <ul role="list" className="divide-y divide-gray-100">
    {booking.map((booking) => (
      <li key={booking.activityDescription} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={booking.imageUrl} alt="" />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{booking.activityName}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{booking.activityDescription}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{booking.timeframe}</p>
          {booking.payment ? (
            <p className="mt-1 text-xs leading-5 text-gray-500">
              $30 <time dateTime={booking.paymentDateTime}>{booking.payment}</time>
            </p>
          ) : (
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs leading-5 text-gray-500">Online</p>
            </div>
          )}
        </div>
      </li>
    ))}
  </ul>
);

export default BookingsList;