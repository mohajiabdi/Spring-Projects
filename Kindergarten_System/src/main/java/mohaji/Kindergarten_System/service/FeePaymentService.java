package mohaji.Kindergarten_System.service;


import mohaji.Kindergarten_System.entity.FeePayment;
import mohaji.Kindergarten_System.exception.StudentNotFoundException;
import mohaji.Kindergarten_System.repository.FeePaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeePaymentService {

    @Autowired
    private FeePaymentRepository repository;

    public FeePayment addPayment(FeePayment payment) {
        return repository.save(payment);
    }

    public List<FeePayment> getAllPayments() {
        return repository.findAll();
    }

    public FeePayment getPaymentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    public FeePayment updatePayment(Long id, FeePayment updated) {
        FeePayment p = getPaymentById(id);
        p.setStudent(updated.getStudent());
        p.setAmountPaid(updated.getAmountPaid());
        p.setPaymentDate(updated.getPaymentDate());
        p.setDescription(updated.getDescription());
        return repository.save(p);
    }

    public void deletePayment(Long id) {
        if (!repository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
