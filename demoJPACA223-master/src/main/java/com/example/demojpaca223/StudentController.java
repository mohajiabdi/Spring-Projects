package com.example.demojpaca223;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    //requests
    //get all
    @GetMapping("/all")
    public List<Student> findAll() {
        return service.findAllStudents();
    }
    //get by id
    @GetMapping("{id}")
    public Student findById(@PathVariable Long id) {
        return service.findStudentById(id);
    }
    //add
    @PostMapping
    public void save(@RequestBody Student student) {
        service.addStudent(student);
    }

    //update
    @PutMapping("{id}")
    public void update(@PathVariable Long id,
                       @RequestBody Student newStudent) {
        service.updateStudent(newStudent , id);
    }

    //delete
    @DeleteMapping("{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteStudentById(id);
    }
}
