package mohaji.Kindergarten_System.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "exam_results")
public class ExamResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "exam_name", nullable = false)
    private String examName;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private double score;

    @Column(name = "max_score", nullable = false)
    private double maxScore;

    @Temporal(TemporalType.DATE)
    @Column(name = "exam_date", nullable = false)
    private Date examDate = new Date();

    // 👉 Default constructor
    public ExamResult() {
    }

    // 👉 All-args constructor
    public ExamResult(Long resultId, Student student, String examName, String subject, double score, double maxScore, Date examDate) {
        this.resultId = resultId;
        this.student = student;
        this.examName = examName;
        this.subject = subject;
        this.score = score;
        this.maxScore = maxScore;
        this.examDate = examDate;
    }

    // 👉 Getters and setters

    public Long getResultId() {
        return resultId;
    }

    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(double maxScore) {
        this.maxScore = maxScore;
    }

    public Date getExamDate() {
        return examDate;
    }

    public void setExamDate(Date examDate) {
        this.examDate = examDate;
    }
}
