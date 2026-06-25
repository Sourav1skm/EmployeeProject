package com.crudAPI.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.crudAPI.example.entity.Employees;

@Repository
public interface EmployeeRepo extends JpaRepository<Employees, Integer> {

}