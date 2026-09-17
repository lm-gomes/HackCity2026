package com.manager.hcity.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manager.hcity.dto.LoginDTO;

@Service
public class UsuarioService {

    private final PasswordEncoder passwordEncoder;

    // EDITE AQUI OS USUÁRIOS MOCKADOS
    private final Map<String, String> usuarios = new HashMap<>();

    public UsuarioService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;

        usuarios.put(
                "admin@email.com",
                passwordEncoder.encode("123456")
        );

        usuarios.put(
                "usuario@email.com",
                passwordEncoder.encode("senha123")
        );
    }

    public boolean login(LoginDTO login) {

        String senhaHash = usuarios.get(login.email());

        if (senhaHash == null) {
            return false;
        }

        return passwordEncoder.matches(
                login.senha(),
                senhaHash
        );
    }
}