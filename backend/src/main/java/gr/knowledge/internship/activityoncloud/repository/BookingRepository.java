package gr.knowledge.internship.activityoncloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Booking;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByActivityAdminId(Long adminId);
}
