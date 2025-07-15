package mohaji.Kindergarten_System.controller;



import mohaji.Kindergarten_System.entity.Attendance;
import mohaji.Kindergarten_System.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @PostMapping
    public Attendance createAttendance(@RequestBody Attendance attendance) {
        return service.recordAttendance(attendance);
    }

    @GetMapping("/{id}")
    public Attendance getAttendance(@PathVariable Long id) {
        return service.getAttendanceById(id);
    }

    @GetMapping
    public List<Attendance> getAll() {
        return service.getAllAttendance();
    }

    @PutMapping("/{id}")
    public Attendance updateAttendance(@PathVariable Long id, @RequestBody Attendance attendance) {
        return service.updateAttendance(id, attendance);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable Long id) {
        service.deleteAttendance(id);
    }
}
