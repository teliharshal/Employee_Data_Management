package e.e.e.employeeBackend.repository;

import e.e.e.employeeBackend.entity.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test") // use H2 config
public class EmployeeRepositoryTest {

    @Autowired
    private employeeRepository employeeRepository;

    @Test
    void testSaveEmployee() {
        Employee emp = new Employee();
        emp.setName("Harshal");
        emp.setEmail("harshal@example.com");
        emp.setPosition("Developer");
        emp.setSalary(50000.0);
        emp.setDepartment("IT");

        Employee saved = employeeRepository.save(emp);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Harshal");
    }

    @Test
    void testFindAllEmployees() {
        Employee emp1 = new Employee(null, "Harshal", "harshal@example.com", "Developer", 50000.0, "IT", null);
        Employee emp2 = new Employee(null, "Vishal", "vishal@example.com", "Manager", 60000.0, "HR", null);

        employeeRepository.save(emp1);
        employeeRepository.save(emp2);

        List<Employee> employees = employeeRepository.findAll();
        assertThat(employees).hasSize(2);
    }
}
