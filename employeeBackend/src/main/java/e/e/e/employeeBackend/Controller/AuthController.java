package e.e.e.employeeBackend.Controller;

import e.e.e.employeeBackend.Dto.LoginRequest;
import e.e.e.employeeBackend.Dto.SignupRequest;
import e.e.e.employeeBackend.entity.User;
import e.e.e.employeeBackend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {
        if (authService.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email is already registered");
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword()); // store as plain text (not secure)

        authService.saveUser(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    /**
     * Login existing user
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = authService.findByEmail(request.getEmail());

        if (userOpt.isEmpty() || !request.getPassword().equals(userOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        User user = userOpt.get();

        // Dummy token for now (can be replaced with JWT later)
        String token = "dummy-token";

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}
