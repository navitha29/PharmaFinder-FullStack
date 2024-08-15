package com.example.PharmaFinderAPI.repository;
import com.example.PharmaFinderAPI.entity.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StocksRepo extends JpaRepository<Stocks, Long> {
    List<Stocks> findByPharmacyId(Long pharmacyId);
    List<Stocks> findByMedicineIdAndQuantityGreaterThan(Long medicineId, int quantity);
}
