import React, { useState } from 'react';
import { Props } from '../InterfacesAndTypes/Types'; 
import { Pagination } from "flowbite-react";

const BookingsTable: React.FC<Props> = ({booking}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(booking.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = booking.slice(startIndex, endIndex);
  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setCurrentPage(newPage);
  };


  return (
    <div style={{ minHeight: '500px' }}>
      <table className="table-auto overflow-hidden text-sm text-left rtl:text-right text-gray-500 rounded-lg shadow-md ">
        <thead className="text-xs text-gray-200 uppercase bg-gray-700 ">
          <tr>
            <th scope="col" className="px-6 py-3">UUID</th>
            <th scope="col" className="px-6 py-3">Customer</th>
            <th scope="col" className="px-6 py-3">Contact</th>
            <th scope="col" className="px-6 py-3">Activity</th>
            <th scope="col" className="px-6 py-3">Participants</th>
            <th scope="col" className="px-6 py-3">Date & Time</th>
            <th scope="col" className="px-6 py-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((bookingItem, index) => (
            <tr key={index} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{bookingItem.id}</th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{bookingItem.customerName}</th>
              <td className="px-6 py-4">{bookingItem.contact}</td>
              <td className="px-6 py-4">{bookingItem.activityName}</td>
              <td className="px-6 py-4">{bookingItem.participantsNum}</td>
              <td className="px-6 py-4">{bookingItem.timeframe}</td>
              <td className="px-6 py-4">{bookingItem.pricePayed + "€"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex overflow-x-auto justify-center">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
          layout="navigation" 
          previousLabel=""
          nextLabel=""
          showIcons
        />
        </div>
    </div>
  );
};

export default BookingsTable;