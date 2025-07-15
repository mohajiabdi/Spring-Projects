package mohaji.Kindergarten_System.repository;



import mohaji.Kindergarten_System.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
