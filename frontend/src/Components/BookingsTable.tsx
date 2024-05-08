import React from 'react';
import { Props } from '../InterfacesAndTypes/Types'; 

const BookingsTable: React.FC<Props> = ({booking}) => {
  return (
    <div className=" overflow-x-auto  relative p-6 bg-white ">
      <table className="mx-auto table-auto overflow-hidden text-sm text-left rtl:text-right text-gray-500  rounded-lg shadow-md ">
        <thead className=" text-xs text-gray-200 uppercase bg-gray-700 ">
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
              <td className="px-6 py-4">{bookingItem.pricePayed + "€"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;