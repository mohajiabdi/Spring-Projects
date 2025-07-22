package mohaji.Kindergarten_System.dto;



import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class StudentClassRequest {
    private Long studentId;
    private Long classId;

    public StudentClassRequest() {
    }

    public StudentClassRequest(Long studentId, Long classId) {
        this.studentId = studentId;
        this.classId = classId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }
}
