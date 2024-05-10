package gr.knowledge.internship.activityoncloud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Rate;

public interface RateRepository extends JpaRepository<Rate, Long> {

	List<Rate> getByOptionId(Long optionId);

}
