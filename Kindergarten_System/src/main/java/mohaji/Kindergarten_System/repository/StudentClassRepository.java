package mohaji.Kindergarten_System.repository;



import mohaji.Kindergarten_System.entity.SchoolClass;
import mohaji.Kindergarten_System.entity.StudentClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentClassRepository extends JpaRepository<StudentClass, Long> {
    int countBySchoolClass(SchoolClass schoolClass);

}
