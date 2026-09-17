package com.manager.hcity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manager.hcity.models.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, String> {
}
