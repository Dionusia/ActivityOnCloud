package gr.knowledge.internship.activityoncloud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Availability;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

	List<Availability> getByDay(String day);

}
