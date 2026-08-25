package com.plantelydt.controller;

import com.plantelydt.dto.LoginRequest;
import com.plantelydt.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        boolean valido = authService.validarCredenciales(request);

        if (!valido) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message", "Email y contraseña son obligatorios"
                    ));
        }

        return ResponseEntity.ok(
                Map.of(
                        "message", "Login recibido correctamente",
                        "email", request.getEmail()
                )
        );
    }
}