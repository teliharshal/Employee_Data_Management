package e.e.e.employeeBackend.service;

import e.e.e.employeeBackend.entity.User;
import e.e.e.employeeBackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists";
        }

        // ⚠️ Store plain text password (NOT recommended for production)
        // Later, we can replace with hashing like BCrypt or Argon2
        if (user.getRole() == null) user.setRole("user");

        userRepository.save(user);
        return "User registered successfully";
    }

    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password)); // simple match
    }
}
