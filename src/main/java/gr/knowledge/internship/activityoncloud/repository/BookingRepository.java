package gr.knowledge.internship.activityoncloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}
