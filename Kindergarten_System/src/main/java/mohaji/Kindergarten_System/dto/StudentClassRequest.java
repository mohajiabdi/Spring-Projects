package mohaji.Kindergarten_System.dto;



import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentClassRequest {
    private Long studentId;
    private Long classId;
}
