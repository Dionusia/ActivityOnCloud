package gr.knowledge.internship.activityoncloud.repository;

import gr.knowledge.internship.activityoncloud.entity.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByDayOfWeek(String dayOfWeek);
}
