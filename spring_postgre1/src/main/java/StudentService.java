

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class StudentService {
   private final JdbcTemplate jdcTemplate;
   public StudentService(JdbcTemplate jdbcTemplate) {
       this.jdcTemplate = jdbcTemplate;
   }

   public List<StudentClass> getStudents(){
       String sql = "SELECT * FROM student";

       return jdcTemplate.query(sql, new BeanPropertyRowMapper<>(StudentClass.class));
   }
}
