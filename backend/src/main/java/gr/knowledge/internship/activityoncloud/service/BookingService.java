package gr.knowledge.internship.activityoncloud.service;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

import gr.knowledge.internship.activityoncloud.dto.ActivityDTO;
import gr.knowledge.internship.activityoncloud.dto.BookingConstructorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gr.knowledge.internship.activityoncloud.dto.BookingDTO;
import gr.knowledge.internship.activityoncloud.entity.Booking;
import gr.knowledge.internship.activityoncloud.mapper.BookingMapper;
import gr.knowledge.internship.activityoncloud.repository.BookingRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class BookingService {
	@Autowired
	private BookingRepository bookingRepository;
	@Autowired
	private ActivityService activityService;
	@Autowired
	private BookingMapper bookingMapper;

	@Transactional(readOnly = true)
	public BookingDTO getBookingById(Long id) {
		Booking booking = bookingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		return bookingMapper.toDTO(booking);
	}

	@Transactional(readOnly = true)
	public List<BookingDTO> getAllBookings() {
		List<Booking> allBookings = bookingRepository.findAll();
		return bookingMapper.toDTOList(allBookings);
	}

	public BookingDTO saveBooking(BookingDTO bookingDTO) {
		Booking booking = bookingMapper.toEntity(bookingDTO);
		bookingRepository.save(booking);
		return bookingMapper.toDTO(booking);
	}

	public BookingDTO updateBooking(BookingDTO bookingDTO) {
		Booking booking = this.existsInDatabase(bookingDTO);
		booking = bookingMapper.toEntity(bookingDTO);
		bookingRepository.save(booking);
		return bookingDTO;
	}

	public void deleteBooking(BookingDTO bookingDTO) {
		Booking booking = bookingMapper.toEntity(bookingDTO);
		bookingRepository.delete(booking);
	}

	private Booking existsInDatabase(BookingDTO bookingDTO) {
		Booking bookingInDatabase = bookingRepository.findById(bookingDTO.getId())
				.orElseThrow(EntityNotFoundException::new);
		return bookingInDatabase;
	}

	public List<BookingDTO> getBookingsOfAdmin(Long id) {
		List<Booking> bookingsOfAdmin = bookingRepository.getBookingByActivityAdminId(id);
		return bookingMapper.toDTOList(bookingsOfAdmin);
	}

	public List<BookingDTO> getBookingsOfActivity(Long id) {
		List<Booking> bookingsOfActivity = bookingRepository.getBookingByActivityId(id);
		return bookingMapper.toDTOList(bookingsOfActivity);
	}

	public BookingDTO newBooking(BookingConstructorDTO bookingConstructor) {
		ActivityDTO activityInDatabase = activityService.getActivityById(bookingConstructor.getActivityId());
		BookingDTO bookingDTO = bookingConstructor.toBookingDTO();
		bookingDTO.setActivity(activityInDatabase);
		bookingDTO.setActivityAdmin(activityInDatabase.getActivityAdmin());
		Duration activityDuration = Duration.ofDays(activityInDatabase.getDurationDays())
				.plusHours(activityInDatabase.getDurationHours())
				.plusMinutes(activityInDatabase.getDurationMinutes());
		bookingDTO.setEndTime(bookingDTO.getStartTime().plus(activityDuration));
		bookingDTO.setPriceTotal(activityInDatabase.getPricePerPerson().multiply(BigDecimal.valueOf(bookingDTO.getPersons())));
		bookingRepository.save(bookingMapper.toEntity(bookingDTO));
		return bookingDTO;
	}
}
