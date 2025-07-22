package mohaji.Kindergarten_System.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "classes")
public class SchoolClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private Long classId;

    @Column(name = "class_name", nullable = false, unique = true)
    private String className;

    @Column(name = "academic_year", nullable = false)
    private String academicYear;

    @Column(nullable = false)
    private int capacity;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    // Default constructor
    public SchoolClass() {
    }

    // All-args constructor
    public SchoolClass(Long classId, String className, String academicYear, int capacity, Teacher teacher) {
        this.classId = classId;
        this.className = className;
        this.academicYear = academicYear;
        this.capacity = capacity;
        this.teacher = teacher;
    }

    // Getters and setters

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
}
