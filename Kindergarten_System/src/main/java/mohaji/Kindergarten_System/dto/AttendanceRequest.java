package mohaji.Kindergarten_System.dto;

import lombok.Data;

@Data
public class AttendanceRequest {
    private Long studentId;
    private Long classId; // 👈 new field
    private String status;
    private String remarks;
}
