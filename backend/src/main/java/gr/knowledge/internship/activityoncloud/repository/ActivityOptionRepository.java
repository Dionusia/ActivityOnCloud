package gr.knowledge.internship.activityoncloud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.ActivityOption;

public interface ActivityOptionRepository extends JpaRepository<ActivityOption, Long> {
	List<ActivityOption> findByActivityAdminId(Long adminId);
}
