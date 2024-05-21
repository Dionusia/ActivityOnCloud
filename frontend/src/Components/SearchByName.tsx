import React, { useState } from 'react';
import { Props } from '../InterfacesAndTypes/Types'; 
import { TextInput } from 'flowbite-react';
import BookingsTable from './BookingsTable';

const SearchByName: React.FC<Props> = ({booking}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = booking.filter(bookingItem =>
    bookingItem.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center overflow-auto bg-white ">
        <TextInput
          type="text"
          placeholder="Search by Customer"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          className="w-1/5 my-1.5 text-15 text-black rounded-lg font-medium focus:ring-0 focus:outline-none focus:ring-blue-300"
        />
      <BookingsTable booking={filteredBookings} />
    </div>
    
  );
};

export default SearchByName;