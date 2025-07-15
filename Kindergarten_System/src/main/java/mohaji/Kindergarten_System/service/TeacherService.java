package mohaji.Kindergarten_System.service;



import mohaji.Kindergarten_System.entity.Teacher;
import mohaji.Kindergarten_System.repository.TeacherRepository;
import mohaji.Kindergarten_System.exception.StudentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id)); // You can rename the exception class if needed
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher updateTeacher(Long id, Teacher updated) {
        Teacher t = getTeacherById(id);
        t.setFirstName(updated.getFirstName());
        t.setLastName(updated.getLastName());
        t.setEmail(updated.getEmail());
        t.setPhoneNumber(updated.getPhoneNumber());
        t.setHireDate(updated.getHireDate());
        t.setQualifications(updated.getQualifications());
        return teacherRepository.save(t);
    }

    public void deleteTeacher(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        teacherRepository.deleteById(id);
    }
}
