package mohaji.Kindergarten_System.service;

import java.util.List;
import mohaji.Kindergarten_System.dto.AttendanceRequest;
import mohaji.Kindergarten_System.entity.Attendance;
import mohaji.Kindergarten_System.entity.SchoolClass;
import mohaji.Kindergarten_System.entity.Student;
import mohaji.Kindergarten_System.repository.AttendanceRepository;
import mohaji.Kindergarten_System.repository.SchoolClassRepository;
import mohaji.Kindergarten_System.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SchoolClassRepository classRepository;

    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    public Attendance createAttendance(AttendanceRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        SchoolClass schoolClass = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setSchoolClass(schoolClass);
        attendance.setStatus(request.getStatus());
        attendance.setRemarks(request.getRemarks());
        attendance.setAttendanceDate(new Date());

        return attendanceRepository.save(attendance);
    }

    // You can add update and delete logic as needed.
}

