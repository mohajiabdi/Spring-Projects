package mohaji.Kindergarten_System.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "attendances")
@Data
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

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private SchoolClass schoolClass; // 👈 Added class reference

    @Temporal(TemporalType.DATE)
    @Column(name = "attendance_date", nullable = false)
    @CreationTimestamp
    private Date attendanceDate;

    @Column(nullable = false)
    private String status; // PRESENT, ABSENT, etc.

    private String remarks;
}
