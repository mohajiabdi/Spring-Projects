package mohaji.CustomerMS;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepo repo;

    public CustomerService(CustomerRepo repo) {
        this.repo = repo;
    }
    //operations
    //get all
    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }
    //get by id
    public Customer getById(Long id) {
        return repo.findById(id).orElse(null);
    }
    // insert
    public void save(Customer newCustomer) {
        repo.save(newCustomer);
    }
    // update
    public void update(Customer newCustomer, Long id) {
        newCustomer.setId(id);
        repo.save(newCustomer);
    }
    // delete
    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
