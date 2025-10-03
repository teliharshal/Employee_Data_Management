package e.e.e.employeeBackend.Controller;

import e.e.e.employeeBackend.entity.Employee;
import e.e.e.employeeBackend.service.employeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class employeeController {

    private final employeeService employeeservice;

    @Autowired
    public employeeController(employeeService employeeservice) {
        this.employeeservice = employeeservice;
    }

    // GET all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeservice.getAllEmployees();
    }

    // GET single employee by id
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        return employeeservice.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST add new employee (JSON body)
    @PostMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeservice.saveEmployee(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    // PUT update employee (JSON body)
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        return employeeservice.getEmployeeById(id).map(existing -> {
            existing.setName(updatedEmployee.getName());
            existing.setEmail(updatedEmployee.getEmail());
            existing.setPosition(updatedEmployee.getPosition());
            existing.setSalary(updatedEmployee.getSalary());
            existing.setDepartment(updatedEmployee.getDepartment());

            Employee savedEmployee = employeeservice.saveEmployee(existing);
            return ResponseEntity.ok(savedEmployee);
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
