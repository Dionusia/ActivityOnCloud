import React from 'react';

type Booking = {
    customerName: string;
    activityName: string;
    participantsNum: string;
    timeframe: string;
    pricePayed: string;
  };
  
  type Props = {
    booking: Booking[];
  };

const BookingsTable: React.FC<Props> = ({booking}) => {
  return (
    <div className="relative p-6 bg-white">
      <table className=" mx-auto table-auto overflow-hidden text-sm text-left rtl:text-right text-gray-500  md:rounded-lg shadow-md ">
        <thead className="shadow-md text-xs text-gray-700 uppercase bg-gray-200 ">
          <tr>
            <th scope="col" className="px-6 py-3">Customer</th>
            <th scope="col" className="px-6 py-3">Activity</th>
            <th scope="col" className="px-6 py-3">Participants</th>
            <th scope="col" className="px-6 py-3">Date & Time</th>
            <th scope="col" className="px-6 py-3">Price</th>
          </tr>
        </thead>
        <tbody>
        {booking.map((bookingItem, index) => (
            <tr key={index} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{bookingItem.customerName}</th>
              <td className="px-6 py-4">{bookingItem.activityName}</td>
              <td className="px-6 py-4">{bookingItem.participantsNum}</td>
              <td className="px-6 py-4">{bookingItem.timeframe}</td>
              <td className="px-6 py-4">{bookingItem.pricePayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;