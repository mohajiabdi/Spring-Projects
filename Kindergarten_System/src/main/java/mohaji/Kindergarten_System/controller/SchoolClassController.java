package mohaji.Kindergarten_System.controller;



import mohaji.Kindergarten_System.entity.SchoolClass;
import mohaji.Kindergarten_System.service.SchoolClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = "http://localhost:5173")
public class SchoolClassController {

    @Autowired
    private SchoolClassService classService;

    @PostMapping
    public SchoolClass createClass(@RequestBody SchoolClass schoolClass) {
        return classService.createClass(schoolClass);
    }

    @GetMapping("/{id}")
    public SchoolClass getClass(@PathVariable Long id) {
        return classService.getClassById(id);
    }

    @GetMapping
    public List<SchoolClass> getAllClasses() {
        return classService.getAllClasses();
    }

    @PutMapping("/{id}")
    public SchoolClass updateClass(@PathVariable Long id, @RequestBody SchoolClass schoolClass) {
        return classService.updateClass(id, schoolClass);
    }

    @DeleteMapping("/{id}")
    public void deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
    }
}
