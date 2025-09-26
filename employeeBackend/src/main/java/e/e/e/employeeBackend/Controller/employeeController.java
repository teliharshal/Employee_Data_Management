package e.e.e.employeeBackend.Controller;

import e.e.e.employeeBackend.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import e.e.e.employeeBackend.service.employeeService;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class employeeController {

    @Autowired
    private final employeeService employeeservice;
//    private final Path uploadDir = Paths.get("uploads");


    public employeeController(employeeService employeeservice){
        this.employeeservice=employeeservice;
    }

    // GET all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeservice.getAllEmployees();
    }

    // GET single employee
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        return employeeservice.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private final Path uploadDir = Paths.get("uploads");

    @PostMapping
    public ResponseEntity<Employee> addEmployee(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String position,
            @RequestParam Double salary,
            @RequestParam String department,
            @RequestParam(required = false) MultipartFile photo
    ) throws IOException {

        String photoName = null;

        if (photo != null && !photo.isEmpty()) {
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            photoName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
            Path filePath = uploadDir.resolve(photoName);
            photo.transferTo(filePath.toFile());
        }

        Employee employee = new Employee(null, name, email, position, salary, department, photoName);
        return ResponseEntity.ok(employeeservice.saveEmployee(employee));
    }

    // PUT update employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String position,
            @RequestParam Double salary,
            @RequestParam String department,
            @RequestParam(required = false) MultipartFile photo
    ) throws IOException {

        return employeeservice.getEmployeeById(id).map(existing -> {
            existing.setName(name);
            existing.setEmail(email);
            existing.setPosition(position);
            existing.setSalary(salary);
            existing.setDepartment(department);

            if (photo != null && !photo.isEmpty()) {
                try {
                    if (!Files.exists(uploadDir)) {
                        Files.createDirectories(uploadDir);
                    }

                    String photoName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
                    Path filePath = uploadDir.resolve(photoName);
                    photo.transferTo(filePath.toFile());

                    existing.setPhoto(photoName);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            return ResponseEntity.ok(employeeservice.saveEmployee(existing));
        }).orElse(ResponseEntity.notFound().build());
    }


    // DELETE employee
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        if (employeeservice.getEmployeeById(id).isPresent()) {
            employeeservice.deleteEmployee(id);
            return ResponseEntity.ok("Employee deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}


