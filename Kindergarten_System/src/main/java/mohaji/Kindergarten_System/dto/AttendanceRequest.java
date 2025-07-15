package mohaji.Kindergarten_System.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttendanceRequest {
    private Long studentId;
    private String date;
    private String status;
}
