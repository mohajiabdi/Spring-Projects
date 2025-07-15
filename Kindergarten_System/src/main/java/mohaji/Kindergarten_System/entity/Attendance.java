package mohaji.Kindergarten_System.entity;



import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "attendances")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id")
    private Long attendanceId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Temporal(TemporalType.DATE)
    @Column(name = "attendance_date", nullable = false)
    @CreationTimestamp
    private Date attendanceDate = new Date();

    @Column(nullable = false)
    private String status; // e.g., PRESENT, ABSENT, LATE, EXCUSED

    private String remarks;
}
