package mohaji.CustomerMS;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CustomerController {
    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }


    @GetMapping("/home")
    public String getHome() {
        return "home"; // This should return the name of the HTML template to be rendered
    }

    @GetMapping("/register")
    public String getRegister() {
        return "register"; // This should return the name of the HTML template for registration
    }

    @PostMapping("/save")
    public String save(@ModelAttribute Customer customer) {
        service.save(customer);
        return "redirect:/all"; // Redirect to home after saving the customer
    }
    @GetMapping("/all")
    public String viewAll(Model model){
        List <Customer> list = service.getAllCustomers();
        model.addAttribute("customer", list);
        return "view";
    }
    @GetMapping("/Update/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") Long id, Model model) {
        // Get Customer from the CustomerService
        Customer customer = service.getById(id);


        // Set customer as a model attribute to pre-populate the form
        model.addAttribute("customer", customer);
        return "register"; // Refers to update-employee.html
    }
    @PostMapping("/update/{id}")
    public String updateCustomer(@ModelAttribute Customer customer,@PathVariable Long id) {
        // Save the updated customer

        service.update(customer, id);
        return "redirect:/all"; // Redirect to the view all page after updating
    }

    @RequestMapping("/delete/{id}")
    public String delete(@PathVariable long id){
        service.deleteById(id);
        return  "redirect:/all"; // Redirect to the view all page after deletion
    }
}
