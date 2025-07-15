package mohaji.Kindergarten_System.controller;



import mohaji.Kindergarten_System.dto.AttendanceRequest;
import mohaji.Kindergarten_System.entity.Attendance;
import mohaji.Kindergarten_System.entity.Student;
import mohaji.Kindergarten_System.repository.AttendanceRepository;
import mohaji.Kindergarten_System.repository.StudentRepository;
import mohaji.Kindergarten_System.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")

public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepo;

    @Autowired
    private StudentRepository studentRepo;

    @GetMapping
    public List<Attendance> getAll() {
        return attendanceRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<Attendance> create(@RequestBody AttendanceRequest request) {
        Student student = studentRepo.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
       // attendance.setAttendanceDate(request.getDate());
        attendance.setStatus(request.getStatus());

        return ResponseEntity.ok(attendanceRepo.save(attendance));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> update(@PathVariable Long id, @RequestBody AttendanceRequest request) {
        return attendanceRepo.findById(id).map(existing -> {
            Student student = studentRepo.findById(request.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            existing.setStudent(student);
           // existing.setDate(request.getDate());
            existing.setStatus(request.getStatus());

            return ResponseEntity.ok(attendanceRepo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!attendanceRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        attendanceRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
