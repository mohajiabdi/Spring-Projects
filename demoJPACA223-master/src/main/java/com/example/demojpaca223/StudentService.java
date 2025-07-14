package com.example.demojpaca223;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repo;
    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }
    //operations
    //add
    void addStudent(Student student) {
        repo.save(student);
    }

    //update
    void updateStudent(Student newStudent , Long id) {
        newStudent.setId(id);
        repo.save(newStudent);
    }

    //slectAll
    public List<Student> findAllStudents() {
        return repo.findAll();
    }

    //select by id
    public Student findStudentById(Long id) {
        return repo.findById(id).orElse(null);
    }

    //delete
    public void deleteStudentById(Long id) {
        repo.deleteById(id);
    }
}
