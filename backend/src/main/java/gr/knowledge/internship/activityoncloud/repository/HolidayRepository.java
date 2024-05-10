package gr.knowledge.internship.activityoncloud.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {

	List<Holiday> getByDate(LocalDate date);

}
