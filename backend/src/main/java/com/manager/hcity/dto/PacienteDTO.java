package com.manager.hcity.dto;
import java.sql.Date;

public record PacienteDTO(
    String numeroProntuario,
    String hipoteseDiagnostica,
    Date dataDaAbertura,
    String nome,
    String cns,
    Date dataDeNascimento,
    String nomeDaMae,
    String telefone,
    String sexo,
    String cor,
    String endereco,
    String unidadeDeReferencia,
    String nomeResponsavel,
    String cnsDoResponsavel,
    String dataDeNascimentoResponsavel
) {}
