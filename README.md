# 👨‍💼 Employee Management System
<img width="200" height="43" alt="Screenshot 2026-07-10 190555" src="https://github.com/user-attachments/assets/57df82ab-7fcb-4ece-b5ee-815f5c0b2c36" />

A Full Stack Employee Management System built using **React.js**, **Spring Boot**, **Hibernate (JPA)**, and **MySQL**. This application allows users to manage employee records with complete CRUD functionality through a modern and responsive interface.

---

## 🚀 Features

- ➕ Add New Employee
- 📋 View All Employees
- ✏️ Update Employee Details
- 🗑️ Delete Employee
- 🔍 Search Employees by Name or Department
- 📊 Employee Statistics
  - Total Employees
  - Number of Departments
  - Average Employee Age
- 🔔 Success/Error Toast Notifications
- 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- React Bootstrap
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate

### Database
- MySQL

### Tools
- IntelliJ IDEA / Eclipse
- Visual Studio Code
- Postman
- MySQL Workbench
- Git & GitHub

---

## 📂 Project Structure

```
Employee-Management-System
│
├── frontend/
│   ├── src/
│   │   ├── Home.js
│   │   ├── add-employee.js
│   │   ├── view-employees.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── CSS Files
│
├── backend/
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   └── Application
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

### Backend

Open the Spring Boot project in IntelliJ or Eclipse.

Configure **application.properties**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employeedb
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Run the Spring Boot application.

Backend runs on:

```
http://localhost:8083
```

---

## 🔗 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /getEmployees | Fetch all employees |
| POST | /addEmployee | Add new employee |
| POST | /updateEmployee | Update employee |
| DELETE | /deleteEmployee/{id} | Delete employee |

---

## 📸 Screenshots

### 🏠 Home Page

<img width="2876" height="1561" alt="Screenshot 2026-06-26 161534" src="https://github.com/user-attachments/assets/0f93763b-f61e-4802-b5f5-fa8510bab34f" />




### ➕ Add Employee

<img width="2878" height="1453" alt="Screenshot 2026-06-26 161439" src="https://github.com/user-attachments/assets/81a6559f-77b9-464e-a829-36089ea4de7d" />




### 📋 Employee List

<img width="2842" height="1461" alt="Screenshot 2026-06-26 161421" src="https://github.com/user-attachments/assets/22117919-2374-40e5-ae24-55c778089e8b" />




---

## 📊 Application Flow

```
User
   │
   ▼
React Frontend
   │
Axios API Calls
   │
Spring Boot REST Controller
   │
Service Layer
   │
Hibernate (JPA)
   │
MySQL Database
```

---

## ✨ Key Concepts Used

- React Functional Components
- React Hooks
- React Router
- Axios API Integration
- REST APIs
- Spring Boot MVC Architecture
- Dependency Injection
- Hibernate ORM
- CRUD Operations
- MySQL Database Connectivity

---

## 📌 Future Enhancements

- User Authentication
- JWT Security
- Role-Based Access
- Pagination
- Sorting
- Export to Excel/PDF
- Employee Profile Images
- Dashboard Analytics

---

## 👨‍💻 Author

**Sourav Mandal**

Java Full Stack Developer

- GitHub: [https://github.com/your-username](https://github.com/Sourav1skm)
- LinkedIn: [https://linkedin.com/in/your-profile](https://www.linkedin.com/in/sourav-mandal-aps2022/)
- Portfolio: [https://your-portfolio-link.com](https://myportfolio-2208.netlify.app/)

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
