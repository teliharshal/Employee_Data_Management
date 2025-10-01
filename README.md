# Employee Data Management System

A full-stack CRUD (Create, Read, Update, Delete) application for managing employee records.  
Built with **Spring Boot (Java)** for the backend and **React.js** for the frontend.

---

## 🚀 Project Goal

A straightforward CRUD application to manage a list of employees. Each employee has:  
- Name  
- Email  
- Position  

Users can **create, read, update, and delete** employee records via a clean and responsive UI.  

---

## 🛠️ Features

### Backend
- RESTful API endpoints (`/api/employees`) for CRUD operations  
- Spring Boot + Spring Data JPA + MySQL  
- H2 database for testing  
- Unit tests with JUnit & Mockito  


### Frontend
- React.js with functional components & hooks  
- Axios for API calls  
- Tailwind CSS for responsive UI  
- Form validations for adding/updating employees  
- Search/filter employees by name  
- Edit and delete employees via modal or inline form  

---

## 🏗️ Tech Stack

### Backend
- Java 21  
- Spring Boot 3.5.6  
- Spring Data JPA  
- MySQL (application database)  
- H2 (test database)  
- JUnit & Mockito (testing)  

### Frontend
- React.js  
- Axios  
- React Router DOM  
- TailwindCSS  

---

## 🗂️ Project Structure
employee-data-management/
├── employeeBackend/ # Spring Boot backend
│ ├── src/main/java/... # Java source code
│ ├── src/test/java/... # Unit tests
│ └── pom.xml # Maven dependencies
├── employee-FrontEnd/ # React frontend
│ ├── src/ # React components, pages, utils
│ └── package.json
└── README.md

