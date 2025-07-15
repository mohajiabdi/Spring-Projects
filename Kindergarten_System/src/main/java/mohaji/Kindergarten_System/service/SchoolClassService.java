package mohaji.Kindergarten_System.service;


import mohaji.Kindergarten_System.entity.SchoolClass;
import mohaji.Kindergarten_System.exception.StudentNotFoundException;
import mohaji.Kindergarten_System.repository.SchoolClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchoolClassService {

    @Autowired
    private SchoolClassRepository classRepository;

    public SchoolClass createClass(SchoolClass schoolClass) {
        return classRepository.save(schoolClass);
    }

    public SchoolClass getClassById(Long id) {
        return classRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id)); // Optional: create ClassNotFoundException
    }

    public List<SchoolClass> getAllClasses() {
        return classRepository.findAll();
    }

    public SchoolClass updateClass(Long id, SchoolClass updatedClass) {
        SchoolClass c = getClassById(id);
        c.setClassName(updatedClass.getClassName());
        c.setAcademicYear(updatedClass.getAcademicYear());
        c.setCapacity(updatedClass.getCapacity());
        c.setTeacher(updatedClass.getTeacher());
        return classRepository.save(c);
    }

    public void deleteClass(Long id) {
        if (!classRepository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        classRepository.deleteById(id);
    }
}
