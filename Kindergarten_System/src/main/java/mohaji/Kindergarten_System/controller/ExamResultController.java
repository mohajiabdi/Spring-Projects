package mohaji.Kindergarten_System.controller;



import mohaji.Kindergarten_System.entity.ExamResult;
import mohaji.Kindergarten_System.service.ExamResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-results")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamResultController {

    @Autowired
    private ExamResultService service;

    @PostMapping
    public ExamResult createResult(@RequestBody ExamResult result) {
        return service.saveResult(result);
    }

    @GetMapping
    public List<ExamResult> getAllResults() {
        return service.getAllResults();
    }

    @GetMapping("/{id}")
    public ExamResult getResult(@PathVariable Long id) {
        return service.getResultById(id);
    }

    @PutMapping("/{id}")
    public ExamResult updateResult(@PathVariable Long id, @RequestBody ExamResult result) {
        return service.updateResult(id, result);
    }

    @DeleteMapping("/{id}")
    public void deleteResult(@PathVariable Long id) {
        service.deleteResult(id);
    }
}
