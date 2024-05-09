package gr.knowledge.internship.activityoncloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {

}
