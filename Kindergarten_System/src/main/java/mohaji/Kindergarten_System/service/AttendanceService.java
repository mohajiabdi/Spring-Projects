package mohaji.Kindergarten_System.service;



import mohaji.Kindergarten_System.entity.Attendance;
import mohaji.Kindergarten_System.exception.StudentNotFoundException;
import mohaji.Kindergarten_System.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repository;

    public Attendance recordAttendance(Attendance attendance) {
        return repository.save(attendance);
    }

    public Attendance getAttendanceById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    public List<Attendance> getAllAttendance() {
        return repository.findAll();
    }

    public Attendance updateAttendance(Long id, Attendance updated) {
        Attendance a = getAttendanceById(id);
        a.setStudent(updated.getStudent());
        a.setAttendanceDate(updated.getAttendanceDate());
        a.setStatus(updated.getStatus());
        a.setRemarks(updated.getRemarks());
        return repository.save(a);
    }

    public void deleteAttendance(Long id) {
        if (!repository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
