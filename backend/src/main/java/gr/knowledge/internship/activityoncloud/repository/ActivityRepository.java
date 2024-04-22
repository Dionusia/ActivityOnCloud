package gr.knowledge.internship.activityoncloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

}
