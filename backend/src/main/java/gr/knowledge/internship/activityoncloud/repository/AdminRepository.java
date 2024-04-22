package gr.knowledge.internship.activityoncloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.knowledge.internship.activityoncloud.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

}
