package gr.knowledge.internship.activityoncloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.ActivityOption;

import java.util.List;

public interface ActivityOptionRepository extends JpaRepository<ActivityOption, Long> {
    List<ActivityOption> findByActivityAdminId(Long adminId);
}
