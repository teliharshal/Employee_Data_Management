package e.e.e.employeeBackend;

import com.fasterxml.jackson.databind.ObjectMapper;
import e.e.e.employeeBackend.Dto.LoginRequest;
import e.e.e.employeeBackend.Dto.SignupRequest;
import e.e.e.employeeBackend.entity.User;
import e.e.e.employeeBackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void cleanDatabase() {
        userRepository.deleteAll(); // fresh db for each test
    }

    @Test
    void testRegisterUser_Success() throws Exception {
        SignupRequest signupRequest = new SignupRequest("Harshal", "harshal@test.com", "password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isCreated())
                .andExpect(content().string("User registered successfully"));
    }

    @Test
    void testRegisterUser_EmailAlreadyExists() throws Exception {
        // Insert a user manually
        User existingUser = new User();
        existingUser.setName("Existing");
        existingUser.setEmail("duplicate@test.com");
        existingUser.setPassword("pass123");
        userRepository.save(existingUser);

        SignupRequest signupRequest = new SignupRequest("Harshal", "duplicate@test.com", "password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isConflict())
                .andExpect(content().string("Email is already registered"));
    }

    @Test
    void testLogin_Success() throws Exception {
        // Create user
        User user = new User();
        user.setName("Harshal");
        user.setEmail("harshal@test.com");
        user.setPassword("password123");
        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest("harshal@test.com", "password123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.email").value("harshal@test.com"))
                .andExpect(jsonPath("$.token").value("dummy-token"));
    }

    @Test
    void testLogin_InvalidPassword() throws Exception {
        // Create user
        User user = new User();
        user.setName("Harshal");
        user.setEmail("harshal@test.com");
        user.setPassword("password123");
        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest("harshal@test.com", "wrongpassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid email or password"));
    }

    @Test
    void testLogin_EmailNotFound() throws Exception {
        LoginRequest loginRequest = new LoginRequest("notfound@test.com", "password123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid email or password"));
    }
}
