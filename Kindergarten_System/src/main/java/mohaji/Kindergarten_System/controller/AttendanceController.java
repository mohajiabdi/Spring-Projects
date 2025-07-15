package mohaji.Kindergarten_System.controller;



import mohaji.Kindergarten_System.dto.AttendanceRequest;
import mohaji.Kindergarten_System.entity.Attendance;
import mohaji.Kindergarten_System.entity.SchoolClass;
import mohaji.Kindergarten_System.entity.Student;
import mohaji.Kindergarten_System.repository.AttendanceRepository;
import mohaji.Kindergarten_System.repository.SchoolClassRepository;
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
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @GetMapping
    public List<Attendance> getAll() {
        return attendanceRepository.findAll();
    }

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<Attendance> create(@RequestBody AttendanceRequest request) {
        Attendance saved = attendanceService.createAttendance(request);
        return ResponseEntity.ok(saved);
    }



}
