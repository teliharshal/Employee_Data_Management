package e.e.e.employeeBackend;

import e.e.e.employeeBackend.entity.Employee;
import e.e.e.employeeBackend.repository.employeeRepository;
import e.e.e.employeeBackend.service.employeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {

    @Mock
    private employeeRepository employeeRepository;

    @InjectMocks
    private employeeService employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllEmployees() {
        Employee emp1 = new Employee(1L, "Harshal", "harshal@example.com", "Developer", 50000.0, "IT");
        Employee emp2 = new Employee(2L, "Vishal", "vishal@example.com", "Manager", 70000.0, "HR");

        when(employeeRepository.findAll()).thenReturn(Arrays.asList(emp1, emp2));

        List<Employee> employees = employeeService.getAllEmployees();

        assertEquals(2, employees.size());
        assertEquals("Harshal", employees.get(0).getName());
        verify(employeeRepository, times(1)).findAll();
    }

    @Test
    void testSaveEmployee() {
        Employee emp = new Employee(1L, "Krishna", "krishna@example.com", "Tester", 40000.0, "QA");

        when(employeeRepository.save(emp)).thenReturn(emp);

        Employee savedEmp = employeeService.saveEmployee(emp);

        assertNotNull(savedEmp);
        assertEquals("Krishna", savedEmp.getName());
        verify(employeeRepository, times(1)).save(emp);
    }

    @Test
    void testGetEmployeeById() {
        Employee emp = new Employee(1L, "Ganesh", "ganesh@example.com", "DevOps", 60000.0, "Cloud");

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(emp));

        Optional<Employee> foundEmp = employeeService.getEmployeeById(1L);

        assertTrue(foundEmp.isPresent());
        assertEquals("Ganesh", foundEmp.get().getName());
        verify(employeeRepository, times(1)).findById(1L);
    }

    @Test
    void testDeleteEmployee() {
        Long id = 1L;

        doNothing().when(employeeRepository).deleteById(id);

        employeeService.deleteEmployee(id);

        verify(employeeRepository, times(1)).deleteById(id);
    }
}

