package com.manager.hcity.models;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity 
public class Atendimento {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private String servico;
    private String prioridade;
    private Date dataDeEntrada;

    @ManyToOne
    @JoinColumn (name = "numero_prontuario", nullable=false)
    private Paciente paciente;
    
    public Date getDataDeEntrada() {
        return dataDeEntrada;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public String getServico() {
        return servico;
    }

    public String getStatus() {
        return status;
    }

    public void setDataDeEntrada(Date dataDeEntrada) {
        this.dataDeEntrada = dataDeEntrada;
    }

    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
