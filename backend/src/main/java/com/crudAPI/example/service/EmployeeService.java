package com.crudAPI.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.crudAPI.example.entity.Employees;
import com.crudAPI.example.repository.EmployeeRepo;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	public Employees addEmployee(Employees employee)
	{
		return employeeRepo.save(employee);
	}
	
	public List<Employees> getAllEmployees()
	{
		return employeeRepo.findAll();
	}
	
	public Employees updateEmployee(Employees updatedEmployee)
	{
		Optional<Employees> employee1 =  employeeRepo.findById(updatedEmployee.getId());
		Employees employee = employee1.get();
		employee.setAge(updatedEmployee.getAge());
		employee.setDept(updatedEmployee.getDept());
		employee.setName(updatedEmployee.getName());
		
		return employeeRepo.save(employee);
	}
	
	public Boolean deleteEmployee(int id)
	{
		employeeRepo.deleteById(id);
		return true;
	}

}
