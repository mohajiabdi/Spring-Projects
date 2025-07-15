package mohaji.Kindergarten_System.service;



import mohaji.Kindergarten_System.entity.StudentClass;
import mohaji.Kindergarten_System.exception.StudentNotFoundException;
import mohaji.Kindergarten_System.repository.StudentClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentClassService {

    @Autowired
    private StudentClassRepository repository;

    public StudentClass assignStudentToClass(StudentClass studentClass) {
        return repository.save(studentClass);
    }

    public StudentClass getAssignmentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    public List<StudentClass> getAllAssignments() {
        return repository.findAll();
    }

    public StudentClass updateAssignment(Long id, StudentClass updated) {
        StudentClass sc = getAssignmentById(id);
        sc.setStudent(updated.getStudent());
        sc.setSchoolClass(updated.getSchoolClass());
        return repository.save(sc);
    }

    public void removeAssignment(Long id) {
        if (!repository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
