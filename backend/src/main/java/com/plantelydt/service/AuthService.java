package com.plantelydt.service;

import com.plantelydt.dto.LoginRequest;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public boolean validarCredenciales(LoginRequest request) {

        return request.getEmail() != null
                && !request.getEmail().isBlank()
                && request.getPassword() != null
                && !request.getPassword().isBlank();
    }
}