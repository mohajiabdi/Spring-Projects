package mohaji.Kindergarten_System.service;



import mohaji.Kindergarten_System.entity.ExamResult;
import mohaji.Kindergarten_System.exception.StudentNotFoundException;
import mohaji.Kindergarten_System.repository.ExamResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamResultService {

    @Autowired
    private ExamResultRepository repository;

    public ExamResult saveResult(ExamResult result) {
        return repository.save(result);
    }

    public ExamResult getResultById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    public List<ExamResult> getAllResults() {
        return repository.findAll();
    }

    public ExamResult updateResult(Long id, ExamResult updated) {
        ExamResult r = getResultById(id);
        r.setStudent(updated.getStudent());
        r.setExamName(updated.getExamName());
        r.setSubject(updated.getSubject());
        r.setScore(updated.getScore());
        r.setMaxScore(updated.getMaxScore());
        r.setExamDate(updated.getExamDate());
        return repository.save(r);
    }

    public void deleteResult(Long id) {
        if (!repository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
