package mohaji.Kindergarten_System.dto;

import lombok.Data;

//@Data
public class AttendanceRequest {
    private Long studentId;
    private Long classId; // 👈 new field
    private String status;
    private String remarks;

    public AttendanceRequest() {
    }
    public AttendanceRequest(Long studentId, Long classId, String status, String remarks) {
        this.studentId = studentId;
        this.classId = classId; // 👈 new field
        this.status = status;
        this.remarks = remarks;
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
}
