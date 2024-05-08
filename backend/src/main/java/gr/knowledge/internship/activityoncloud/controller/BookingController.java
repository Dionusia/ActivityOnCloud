package gr.knowledge.internship.activityoncloud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gr.knowledge.internship.activityoncloud.dto.BookingDTO;
import gr.knowledge.internship.activityoncloud.service.BookingService;

@RestController
@RequestMapping(value = "/booking")
public class BookingController {
	@Autowired
	private BookingService bookingService;

	@GetMapping
	public List<BookingDTO> getAllBookings() {
		return bookingService.getAllBookings();
	}

	@GetMapping("/{id}")
	public BookingDTO getBookingById(@PathVariable Long id) {
		return bookingService.getBookingById(id);
	}

	@GetMapping("/of-admin/{id}")
	public List<BookingDTO> getBookingsOfAdmin(@PathVariable Long id) {
		return bookingService.getBookingsOfAdmin(id);
	}

	@GetMapping("/of-activity/{id}")
	public List<BookingDTO> getBookingsOfActivity(@PathVariable Long id) {
		return bookingService.getBookingsOfActivity(id);
	}

	@PostMapping("/save")
	public BookingDTO saveBooking(@RequestBody BookingDTO booking) {
		return bookingService.saveBooking(booking);
	}

	@PutMapping("/update")
	public BookingDTO updateBooking(@RequestBody BookingDTO booking) {
		return bookingService.updateBooking(booking);
	}

	@DeleteMapping("/delete")
	public void deleteBooking(@RequestBody BookingDTO booking) {
		bookingService.deleteBooking(booking);
	}
}
