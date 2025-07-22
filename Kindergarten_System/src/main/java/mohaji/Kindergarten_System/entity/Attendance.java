package mohaji.Kindergarten_System.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "attendances")
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
    private SchoolClass schoolClass;

    @Temporal(TemporalType.DATE)
    @Column(name = "attendance_date", nullable = false)
    @CreationTimestamp
    private Date attendanceDate;

    @Column(nullable = false)
    private String status;

    private String remarks;

    // 👉 Constructors

    public Attendance() {
    }

    public Attendance(Long attendanceId, Student student, SchoolClass schoolClass, Date attendanceDate, String status, String remarks) {
        this.attendanceId = attendanceId;
        this.student = student;
        this.schoolClass = schoolClass;
        this.attendanceDate = attendanceDate;
        this.status = status;
        this.remarks = remarks;
    }

    // 👉 Getters and Setters

    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public SchoolClass getSchoolClass() {
        return schoolClass;
    }

    public void setSchoolClass(SchoolClass schoolClass) {
        this.schoolClass = schoolClass;
    }

    public Date getAttendanceDate() {
        return attendanceDate;
    }

    public void setAttendanceDate(Date attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    // 👉 Optional: toString, equals, hashCode (can be added if needed)
}
