package e.e.e.employeeBackend.repository;

import e.e.e.employeeBackend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface employeeRepository extends JpaRepository<Employee, Long> {

}
