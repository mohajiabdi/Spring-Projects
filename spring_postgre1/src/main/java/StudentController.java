import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StudentController {

    private final StudentService studentService;


//
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

//    @GetMapping("/")
//    public List<StudentClass> getAllStudents() {
//        return studentService.getStudents();
//    }
    @GetMapping("/")
    public String show(){
        return "Hello World";
    }
}


