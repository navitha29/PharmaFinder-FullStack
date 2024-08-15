package com.example.PharmaFinderAPI.repository;
import org.springframework.data.repository.query.Param;

import com.example.PharmaFinderAPI.dto.MedicineDTO;
import com.example.PharmaFinderAPI.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface MedicineRepo extends JpaRepository<Medicine, Long> {
	@Query("SELECT m FROM Medicine m WHERE m.purpose = :category")
    List<Medicine> findMedicinesByCategory(@Param("category") String category);
	@Query("SELECT DISTINCT m.purpose FROM Medicine m")
    List<String> findDistinctCategories();
}
