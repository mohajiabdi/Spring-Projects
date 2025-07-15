package mohaji.Kindergarten_System.service;



import mohaji.Kindergarten_System.entity.Parent;
import mohaji.Kindergarten_System.exception.StudentNotFoundException;
import mohaji.Kindergarten_System.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParentService {

    @Autowired
    private ParentRepository parentRepository;

    public Parent createParent(Parent parent) {
        return parentRepository.save(parent);
    }

    public Parent getParentById(Long id) {
        return parentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id)); // You may rename this exception to ParentNotFoundException later
    }

    public List<Parent> getAllParents() {
        return parentRepository.findAll();
    }

    public Parent updateParent(Long id, Parent updated) {
        Parent p = getParentById(id);
        p.setFirstName(updated.getFirstName());
        p.setLastName(updated.getLastName());
        p.setEmail(updated.getEmail());
        p.setPhoneNumber(updated.getPhoneNumber());
        p.setAddress(updated.getAddress());
        return parentRepository.save(p);
    }

    public void deleteParent(Long id) {
        if (!parentRepository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        parentRepository.deleteById(id);
    }
}
