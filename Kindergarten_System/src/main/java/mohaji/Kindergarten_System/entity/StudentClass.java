package mohaji.Kindergarten_System.entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_classes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentClassId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private SchoolClass schoolClass;

    // Getters and setters
}
