package com.example.PharmaFinderAPI.service.impl;
import com.example.PharmaFinderAPI.dto.MedicineDTO;
import com.example.PharmaFinderAPI.dto.DosageDTO;
import com.example.PharmaFinderAPI.dto.PharmacyDTO;
import com.example.PharmaFinderAPI.entity.Medicine;
import com.example.PharmaFinderAPI.entity.Dosage;
import com.example.PharmaFinderAPI.entity.Pharmacy;
import com.example.PharmaFinderAPI.entity.Stocks;
import com.example.PharmaFinderAPI.repository.MedicineRepo;
import com.example.PharmaFinderAPI.repository.DosageRepo;
import com.example.PharmaFinderAPI.repository.PharmacyRepo;
import com.example.PharmaFinderAPI.repository.StocksRepo;
import com.example.PharmaFinderAPI.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepo medicineRepository;

    @Autowired
    private DosageRepo dosageRepository;

    @Autowired
    private PharmacyRepo pharmacyRepository;

    @Autowired
    private StocksRepo stocksRepository;

    @Override
    public MedicineDTO createMedicine(MedicineDTO medicineDTO) {
        Medicine medicine = new Medicine();
        medicine.setName(medicineDTO.getName());
        medicine.setPurpose(medicineDTO.getPurpose());
        medicine.setCategory(medicineDTO.getCategory());
        medicine.setBrand(medicineDTO.getBrand());
        medicine.setCost(medicineDTO.getCost());
        medicine.setForm(medicineDTO.getForm()); // Set the form

        medicine = medicineRepository.save(medicine);

        // Handle dosages
        if (medicineDTO.getDosages() != null) {
            for (DosageDTO dosageDTO : medicineDTO.getDosages()) {
                Dosage dosage = new Dosage();
                dosage.setMedicine(medicine);
                dosage.setDosage(dosageDTO.getDosage());
                dosage.setCost(dosageDTO.getCost());
                dosageRepository.save(dosage);
            }
        }

        // Handle stocks
        Pharmacy pharmacy = pharmacyRepository.findById(medicineDTO.getPharmacyId())
            .orElseThrow(() -> new RuntimeException("Pharmacy not found"));
        Stocks stock = new Stocks();
        stock.setPharmacy(pharmacy);
        stock.setMedicine(medicine);
        stock.setQuantity(medicineDTO.getQuantity());
        stocksRepository.save(stock);

        medicineDTO.setId(medicine.getId());
        return medicineDTO;
    }

    @Override
    public List<MedicineDTO> getAllMedicines() {
        return medicineRepository.findAll().stream()
            .map(medicine -> {
                MedicineDTO dto = new MedicineDTO();
                dto.setId(medicine.getId());
                dto.setName(medicine.getName());
                dto.setPurpose(medicine.getPurpose());
                dto.setCategory(medicine.getCategory());
                dto.setBrand(medicine.getBrand());
                dto.setCost(medicine.getCost());
                dto.setForm(medicine.getForm()); // Set the form

                List<DosageDTO> dosages = dosageRepository.findByMedicineId(medicine.getId()).stream()
                    .map(dosage -> {
                        DosageDTO dosageDTO = new DosageDTO();
                        dosageDTO.setId(dosage.getId());
                        dosageDTO.setDosage(dosage.getDosage());
                        dosageDTO.setCost(dosage.getCost());
                        return dosageDTO;
                    }).collect(Collectors.toList());

                dto.setDosages(dosages);
                return dto;
            }).collect(Collectors.toList());
    }

    @Override
    public MedicineDTO getMedicineById(Long id) {
        return medicineRepository.findById(id).map(medicine -> {
            MedicineDTO dto = new MedicineDTO();
            dto.setId(medicine.getId());
            dto.setName(medicine.getName());
            dto.setPurpose(medicine.getPurpose());
            dto.setCategory(medicine.getCategory());
            dto.setBrand(medicine.getBrand());
            dto.setCost(medicine.getCost());
            dto.setForm(medicine.getForm()); // Set the form

            List<DosageDTO> dosages = dosageRepository.findByMedicineId(medicine.getId()).stream()
                .map(dosage -> {
                    DosageDTO dosageDTO = new DosageDTO();
                    dosageDTO.setId(dosage.getId());
                    dosageDTO.setDosage(dosage.getDosage());
                    dosageDTO.setCost(dosage.getCost());
                    return dosageDTO;
                }).collect(Collectors.toList());

            dto.setDosages(dosages);
            return dto;
        }).orElse(null);
    }

    @Override
    public List<PharmacyDTO> findPharmaciesByMedicineAndPincode(long id, String userPincode) {
        Medicine medicine = medicineRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Medicine not found"));

        List<Pharmacy> pharmacies = pharmacyRepository.findPharmaciesByPincodeAndMedicine(userPincode, medicine.getId());

        return pharmacies.stream()
            .map(pharmacy -> {
                PharmacyDTO pharmacyDTO = new PharmacyDTO();
                pharmacyDTO.setId(pharmacy.getId());
                pharmacyDTO.setPharmacyName(pharmacy.getPharmacyName());
                pharmacyDTO.setAddress(pharmacy.getAddress());
                pharmacyDTO.setPincode(pharmacy.getPincode());
                pharmacyDTO.setContact(pharmacy.getContact());
                // add other necessary fields
                return pharmacyDTO;
            }).collect(Collectors.toList());
    }
    @Override
    public List<MedicineDTO> getMedicinesByCategory(String category) {
        List<Medicine> medicines = medicineRepository.findMedicinesByCategory(category);
        return medicines.stream()
            .map(medicine -> {
                MedicineDTO dto = new MedicineDTO();
                dto.setId(medicine.getId());
                dto.setName(medicine.getName());
                dto.setPurpose(medicine.getPurpose());
                dto.setCategory(medicine.getCategory());
                dto.setBrand(medicine.getBrand());
                dto.setCost(medicine.getCost());
                dto.setForm(medicine.getForm());

                List<DosageDTO> dosages = dosageRepository.findByMedicineId(medicine.getId()).stream()
                    .map(dosage -> {
                        DosageDTO dosageDTO = new DosageDTO();
                        dosageDTO.setId(dosage.getId());
                        dosageDTO.setDosage(dosage.getDosage());
                        dosageDTO.setCost(dosage.getCost());
                        return dosageDTO;
                    }).collect(Collectors.toList());

                dto.setDosages(dosages);
                return dto;
            }).collect(Collectors.toList());
    }
    @Override
    public List<String> getDistinctCategories() {
        return medicineRepository.findDistinctCategories();
    }


}
