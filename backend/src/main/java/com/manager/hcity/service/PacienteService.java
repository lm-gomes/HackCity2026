package com.manager.hcity.service;

import org.springframework.stereotype.Service;

import com.manager.hcity.models.Paciente;
import com.manager.hcity.repository.PacienteRepository;

@Service 
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository){
        this.pacienteRepository = pacienteRepository;
    }

    public void salvar(Paciente paciente){
        pacienteRepository.save(paciente);

    }
    
}
