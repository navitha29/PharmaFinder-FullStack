package com.example.PharmaFinderAPI.repository;
import com.example.PharmaFinderAPI.entity.Dosage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DosageRepo extends JpaRepository<Dosage, Long> {
    List<Dosage> findByMedicineId(Long medicineId);
}