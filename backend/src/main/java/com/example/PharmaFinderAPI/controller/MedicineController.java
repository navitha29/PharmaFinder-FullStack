package com.example.PharmaFinderAPI.controller;

import com.example.PharmaFinderAPI.dto.MedicineDTO;
import com.example.PharmaFinderAPI.dto.PharmacyDTO;
import com.example.PharmaFinderAPI.entity.Medicine;
import com.example.PharmaFinderAPI.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")

public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @PostMapping
    public ResponseEntity<MedicineDTO> createMedicine(@RequestBody MedicineDTO medicineDTO) {
        MedicineDTO createdMedicine = medicineService.createMedicine(medicineDTO);
        return ResponseEntity.ok(createdMedicine);
    }

    @GetMapping
    public ResponseEntity<List<MedicineDTO>> getAllMedicines() {
        List<MedicineDTO> medicines = medicineService.getAllMedicines();
        return ResponseEntity.ok(medicines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineDTO> getMedicineById(@PathVariable Long id) {
        MedicineDTO medicine = medicineService.getMedicineById(id);
        if (medicine != null) {
            return ResponseEntity.ok(medicine);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<PharmacyDTO>> findPharmaciesByMedicineAndPincode(
            @RequestParam long id,
            @RequestParam String userPincode) {
        List<PharmacyDTO> pharmacies = medicineService.findPharmaciesByMedicineAndPincode(id, userPincode);
        return ResponseEntity.ok(pharmacies);
    }
    @GetMapping("/by-category")
    public ResponseEntity<List<MedicineDTO>> getMedicinesByCategory(@RequestParam String category) {
        List<MedicineDTO> medicines = medicineService.getMedicinesByCategory(category);
        return ResponseEntity.ok(medicines);
    }
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getDistinctCategories() {
        List<String> categories = medicineService.getDistinctCategories();
        return ResponseEntity.ok(categories);
    }
}
