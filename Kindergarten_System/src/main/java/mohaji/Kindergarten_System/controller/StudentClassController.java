package mohaji.Kindergarten_System.controller;







import mohaji.Kindergarten_System.dto.StudentClassRequest;
import mohaji.Kindergarten_System.entity.SchoolClass;
import mohaji.Kindergarten_System.entity.Student;
import mohaji.Kindergarten_System.entity.StudentClass;
import mohaji.Kindergarten_System.repository.SchoolClassRepository;
import mohaji.Kindergarten_System.repository.StudentClassRepository;
import mohaji.Kindergarten_System.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-classes")
@CrossOrigin(origins = "http://localhost:5173")

public class StudentClassController {

    @Autowired
    private StudentClassRepository studentClassRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SchoolClassRepository classRepository;

    // ✅ Get all
    @GetMapping
    public List<StudentClass> getAllStudentClasses() {
        return studentClassRepository.findAll();
    }

    // ✅ Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<StudentClass> getById(@PathVariable Long id) {
        return studentClassRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create
    @PostMapping
    public ResponseEntity<?> create(@RequestBody StudentClassRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        SchoolClass classEntity = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        // ✅ Check current number of students in the class
        int currentCount = studentClassRepository.countBySchoolClass(classEntity);
        if (currentCount >= classEntity.getCapacity()) {
            return ResponseEntity.badRequest().body("Class is already at full capacity.");
        }

        // Proceed with assignment
        StudentClass studentClass = new StudentClass();
        studentClass.setStudent(student);
        studentClass.setSchoolClass(classEntity);

        StudentClass saved = studentClassRepository.save(studentClass);
        return ResponseEntity.ok(saved);
    }


    // ✅ Update
    @PutMapping("/{id}")
    public ResponseEntity<StudentClass> update(@PathVariable Long id,
                                               @RequestBody StudentClassRequest request) {
        return studentClassRepository.findById(id).map(existing -> {
            Student student = studentRepository.findById(request.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));
            SchoolClass classEntity = classRepository.findById(request.getClassId())
                    .orElseThrow(() -> new RuntimeException("Class not found"));

            existing.setStudent(student);
            existing.setSchoolClass(classEntity);

            return ResponseEntity.ok(studentClassRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!studentClassRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        studentClassRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
