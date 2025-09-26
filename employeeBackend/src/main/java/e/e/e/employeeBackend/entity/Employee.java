package e.e.e.employeeBackend.entity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@Table(name = "employees")
//@Getter
//@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    private String name;

    @Column(unique = true)
    private String email;
    private String position;
    private Double salary;
    private String department;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPosition() {
        return position;
    }

    public String getDepartment() {
        return department;
    }

    public Double getSalary() {
        return salary;
    }

    public String getPhoto() {
        return photo;
    }

    private String photo;

    public Employee() {} // no-args constructor (required by JPA)

    // ✅ all-args constructor
    public Employee(Long id, String name, String email, String position, Double salary, String department, String photo) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.position = position;
        this.salary = salary;
        this.department = department;
        this.photo = photo;
    }

}
