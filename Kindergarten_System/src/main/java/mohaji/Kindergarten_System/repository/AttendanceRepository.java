package mohaji.Kindergarten_System.repository;



import mohaji.Kindergarten_System.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}
