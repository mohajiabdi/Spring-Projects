package mohaji.Kindergarten_System.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_parents")
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

    // Default constructor
    public StudentParent() {
    }

    // All-args constructor
    public StudentParent(Long studentParentId, Student student, Parent parent) {
        this.studentParentId = studentParentId;
        this.student = student;
        this.parent = parent;
    }

    // Getters and setters

    public Long getStudentParentId() {
        return studentParentId;
    }

    public void setStudentParentId(Long studentParentId) {
        this.studentParentId = studentParentId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }
}
