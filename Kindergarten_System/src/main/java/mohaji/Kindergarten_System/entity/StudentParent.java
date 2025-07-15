package mohaji.Kindergarten_System.entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_parents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentParent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_parent_id")
    private Long studentParentId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = false)
    private Parent parent;
}
