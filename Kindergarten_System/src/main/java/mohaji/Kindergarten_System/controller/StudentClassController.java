package mohaji.Kindergarten_System.controller;



import mohaji.Kindergarten_System.entity.StudentClass;
import mohaji.Kindergarten_System.service.StudentClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-classes")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentClassController {

    @Autowired
    private StudentClassService service;

    @PostMapping
    public StudentClass assignStudent(@RequestBody StudentClass sc) {
        return service.assignStudentToClass(sc);
    }

    @GetMapping("/{id}")
    public StudentClass getAssignment(@PathVariable Long id) {
        return service.getAssignmentById(id);
    }

    @GetMapping
    public List<StudentClass> getAllAssignments() {
        return service.getAllAssignments();
    }

    @PutMapping("/{id}")
    public StudentClass updateAssignment(
            @PathVariable Long id,
            @RequestBody StudentClass sc
    ) {
        return service.updateAssignment(id, sc);
    }

    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        service.removeAssignment(id);
    }
}
