package mohaji.Kindergarten_System.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_classes")
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

    // Default constructor
    public StudentClass() {
    }

    // All-args constructor
    public StudentClass(Long studentClassId, Student student, SchoolClass schoolClass) {
        this.studentClassId = studentClassId;
        this.student = student;
        this.schoolClass = schoolClass;
    }

    // Getters and setters

    public Long getStudentClassId() {
        return studentClassId;
    }

    public void setStudentClassId(Long studentClassId) {
        this.studentClassId = studentClassId;
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
}
