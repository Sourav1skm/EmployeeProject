package com.crudAPI.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crudAPI.example.entity.Employees;
import com.crudAPI.example.service.EmployeeService;

@CrossOrigin(origins = "https://employeeproject-m08o.onrender.com")
@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/addEmployee")
    public Employees addEmployee(@RequestBody Employees employees) {
        return employeeService.addEmployee(employees);
    }

    @GetMapping("/getEmployees")
    public List<Employees> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping("/updateEmployee")
    public Employees updateEmployee(@RequestBody Employees employees) {
        return employeeService.updateEmployee(employees);
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public Boolean deleteEmployee(@PathVariable int id) {
        return employeeService.deleteEmployee(id);
    }
}
