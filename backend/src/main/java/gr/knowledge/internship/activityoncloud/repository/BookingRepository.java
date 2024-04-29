package gr.knowledge.internship.activityoncloud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> getBookingByActivityAdminId(Long id);
	List<Booking> getBookingByActivityId(Long id);
}
