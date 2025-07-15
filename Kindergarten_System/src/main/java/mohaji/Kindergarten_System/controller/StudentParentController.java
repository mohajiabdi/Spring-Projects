package mohaji.Kindergarten_System.controller;



import mohaji.Kindergarten_System.entity.StudentParent;
import mohaji.Kindergarten_System.service.StudentParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-parents")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentParentController {

    @Autowired
    private StudentParentService service;

    @PostMapping
    public StudentParent assignParent(@RequestBody StudentParent sp) {
        return service.assignParent(sp);
    }

    @GetMapping("/{id}")
    public StudentParent getAssignment(@PathVariable Long id) {
        return service.getAssignmentById(id);
    }

    @GetMapping
    public List<StudentParent> getAllAssignments() {
        return service.getAllAssignments();
    }

    @PutMapping("/{id}")
    public StudentParent updateAssignment(@PathVariable Long id, @RequestBody StudentParent sp) {
        return service.updateAssignment(id, sp);
    }

    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        service.deleteAssignment(id);
    }
}
