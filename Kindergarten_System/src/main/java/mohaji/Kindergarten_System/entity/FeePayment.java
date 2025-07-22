package mohaji.Kindergarten_System.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "fee_payments")
public class FeePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private double amountPaid;

    @Temporal(TemporalType.DATE)
    @Column(name = "payment_date", nullable = false)
    private Date paymentDate = new Date();

    @Column
    private String description;

    // 👉 Default constructor
    public FeePayment() {
    }

    // 👉 All-args constructor
    public FeePayment(Long paymentId, Student student, double amountPaid, Date paymentDate, String description) {
        this.paymentId = paymentId;
        this.student = student;
        this.amountPaid = amountPaid;
        this.paymentDate = paymentDate;
        this.description = description;
    }

    // 👉 Getters and setters

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
