package com.plantelydt.service;

import com.plantelydt.dto.LoginRequest;
import com.plantelydt.entity.Usuario;
import com.plantelydt.repository.ClubUsuarioRepository;
import com.plantelydt.repository.UsuarioRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final ClubUsuarioRepository clubUsuarioRepository;
    private final PasswordEncoder passwordEncoder;
    public AuthService(UsuarioRepository usuarioRepository, ClubUsuarioRepository clubUsuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository; this.clubUsuarioRepository = clubUsuarioRepository; this.passwordEncoder = passwordEncoder;
    }
    public AuthenticatedUser authenticate(LoginRequest request) {
        if (request == null || blank(request.getEmail()) || blank(request.getPassword())) throw new InvalidCredentialsException();
        Usuario usuario = usuarioRepository.findByEmailIgnoreCaseAndActivoTrue(request.getEmail().trim()).orElseThrow(InvalidCredentialsException::new);
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())) throw new InvalidCredentialsException();
        List<String> roles = clubUsuarioRepository.findActiveRoleNamesByUsuarioId(usuario.getId());
        if (roles.isEmpty()) throw new InvalidCredentialsException();
        String selectedRole = blank(request.getRole()) ? roles.getFirst() : roles.stream().filter(role -> role.equals(request.getRole())).findFirst().orElseThrow(InvalidCredentialsException::new);
        List<GrantedAuthority> authorities = roles.stream().map(role -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + role)).toList();
        return new AuthenticatedUser(usuario.getEmail(), selectedRole, authorities);
    }
    private boolean blank(String value) { return value == null || value.isBlank(); }
    public record AuthenticatedUser(String email, String selectedRole, List<GrantedAuthority> authorities) { }
    public static class InvalidCredentialsException extends RuntimeException { }
}
