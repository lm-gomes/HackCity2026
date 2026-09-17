package com.manager.hcity.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.manager.hcity.dto.PacienteDTO;
import com.manager.hcity.models.Paciente;
import com.manager.hcity.service.PacienteService;

import io.micrometer.core.ipc.http.HttpSender.Response;


@RestController 
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> register(@RequestBody Paciente paciente){
        pacienteService.salvar(paciente);   
        return ResponseEntity.ok("Cadastro de paciente feito com sucesso!");
    }
}
