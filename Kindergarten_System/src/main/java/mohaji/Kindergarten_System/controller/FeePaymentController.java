package mohaji.Kindergarten_System.controller;



import mohaji.Kindergarten_System.entity.FeePayment;
import mohaji.Kindergarten_System.service.FeePaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "http://localhost:5173")
public class FeePaymentController {

    @Autowired
    private FeePaymentService service;

    @PostMapping
    public FeePayment createPayment(@RequestBody FeePayment payment) {
        return service.addPayment(payment);
    }

    @GetMapping
    public List<FeePayment> getAllPayments() {
        return service.getAllPayments();
    }

    @GetMapping("/{id}")
    public FeePayment getPayment(@PathVariable Long id) {
        return service.getPaymentById(id);
    }

    @PutMapping("/{id}")
    public FeePayment updatePayment(@PathVariable Long id, @RequestBody FeePayment payment) {
        return service.updatePayment(id, payment);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        service.deletePayment(id);
    }
}
