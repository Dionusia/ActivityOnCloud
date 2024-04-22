package gr.knowledge.internship.activityoncloud.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gr.knowledge.internship.activityoncloud.dto.BookingDTO;
import gr.knowledge.internship.activityoncloud.entity.Booking;

@Component
public class BookingMapper {
	@Autowired
	private ModelMapper modelMapper;

	public Booking toEntity(BookingDTO bookingDTO) {
		return modelMapper.map(bookingDTO, Booking.class);
	}

	public BookingDTO toDTO(Booking booking) {
		return modelMapper.map(booking, BookingDTO.class);
	}

	public List<Booking> toEntityList(List<BookingDTO> bookingDTOList) {
		List<Booking> bookingList = new ArrayList<>();
		for (BookingDTO bookingDTO : bookingDTOList) {
			Booking bookingToAdd = modelMapper.map(bookingDTO, Booking.class);
			bookingList.add(bookingToAdd);
		}
		return bookingList;
	}

	public List<BookingDTO> toDTOList(List<Booking> bookingList) {
		List<BookingDTO> bookingDTOList = new ArrayList<>();
		for (Booking booking : bookingList) {
			BookingDTO bookingDTOToAdd = modelMapper.map(booking, BookingDTO.class);
			bookingDTOList.add(bookingDTOToAdd);
		}
		return bookingDTOList;
	}
}
