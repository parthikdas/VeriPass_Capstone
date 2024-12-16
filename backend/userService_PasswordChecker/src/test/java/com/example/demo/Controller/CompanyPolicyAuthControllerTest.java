package com.example.demo.Controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.example.demo.Service.CompanyService;
import com.example.demo.Utility.JwtBlacklistService;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.Entity.PasswordPolicy;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class CompanyPolicyAuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompanyService comService;

    @MockBean
    private JwtBlacklistService jwtBlacklistService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

//    @Test
//    public void testRegister() throws Exception {
//        RegisterRequest request = new RegisterRequest();
//        request.setName("test");
//        request.setEmail("test@example.com");
//        request.setPassword("password");
//        com.example.demo.DTO.RegisterRequest.PasswordPolicy testPolicy = new com.example.demo.DTO.RegisterRequest.PasswordPolicy();
//        request.setPasswordPolicy(testPolicy);
//
//        when(comService.register(request)).thenReturn(null);
//
//        mockMvc.perform(post("/auth/register")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isOk())
//                .andExpect(content().string(null));
//    }

    @Test
    public void testLogin() throws Exception {
        String email = "parthikdas@gmail.com";
        String password = "111";

        when(comService.login(email, password)).thenReturn("Login Successful");

        mockMvc.perform(get("/auth/login")
                .param("email", email)
                .param("password", password))
                .andExpect(status().isOk())
                .andExpect(content().string("Login Successful"));
    }

//    @Test
//    public void testGetCompanyDetails() throws Exception {
//        when(comService.getCompanyDetails()).thenReturn("Company Details");
//
//        mockMvc.perform(get("/auth/user"))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Company Details"));
//    }

//    @Test
//    public void testUpdateCompanyDetails() throws Exception {
//        UpdateRequest request = new UpdateRequest();
//        request.setEmail("updated@example.com");
//
//        when(comService.updateCompanyDetails(request)).thenReturn("Update Successful");
//
//        mockMvc.perform(put("/auth/user")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Update Successful"));
//    }

    @Test
    public void testLogout() throws Exception {
        String token = "Bearer testToken";

        mockMvc.perform(post("/auth/logout")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(content().string("Logout Successful!!.."));
    }

//    @Test
//    public void testResetPassword() throws Exception {
//        ResetPasswordRequest request = new ResetPasswordRequest();
//        request.setPassword("newPassword");
//
//        when(comService.resetPassword(request.getPassword())).thenReturn("Password Reset Successful");
//
//        mockMvc.perform(post("/auth/resetPassword")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Password Reset Successful"));
//    }
}