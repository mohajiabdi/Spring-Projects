package mohaji.Kindergarten_System.service;



import mohaji.Kindergarten_System.entity.StudentParent;
import mohaji.Kindergarten_System.exception.StudentNotFoundException;
import mohaji.Kindergarten_System.repository.StudentParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentParentService {

    @Autowired
    private StudentParentRepository repository;

    public StudentParent assignParent(StudentParent sp) {
        return repository.save(sp);
    }

    public StudentParent getAssignmentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    public List<StudentParent> getAllAssignments() {
        return repository.findAll();
    }

    public StudentParent updateAssignment(Long id, StudentParent updated) {
        StudentParent sp = getAssignmentById(id);
        sp.setStudent(updated.getStudent());
        sp.setParent(updated.getParent());
        return repository.save(sp);
    }

    public void deleteAssignment(Long id) {
        if (!repository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
