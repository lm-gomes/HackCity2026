package com.manager.hcity.models;

import java.sql.Date;

public class Paciente {
    private String numeroProntuario;
    private String hipoteseDiagnostica;
    private Date dataDaAbertura;
    private String nome;
    private String cns;
    private Date dataDeNascimento;
    private String nomeDaMae;
    private String telefone;
    private String sexo;
    private String cor;
    private String endereco;
    private String unidadeDeReferencia;
    private String nomeResponsavel;
    private String cnsDoResponsavel;
    private String dataDeNascimentoResponsavel;

    public String getCns() {
        return cns;
    }

    public String getCnsDoResponsavel() {
        return cnsDoResponsavel;
    }

    public String getCor() {
        return cor;
    }

    public Date getDataDaAbertura() {
        return dataDaAbertura;
    }

    public Date getDataDeNascimento() {
        return dataDeNascimento;
    }

    public String getDataDeNascimentoResponsavel() {
        return dataDeNascimentoResponsavel;
    }

    public String getEndereco() {
        return endereco;
    }

    public String getHipoteseDiagnostica() {
        return hipoteseDiagnostica;
    }

    public String getNome() {
        return nome;
    }

    public String getNomeDaMae() {
        return nomeDaMae;
    }

    public String getNomeResponsavel() {
        return nomeResponsavel;
    }

    public String getNumeroProntuario() {
        return numeroProntuario;
    }

    public String getSexo() {
        return sexo;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getUnidadeDeReferencia() {
        return unidadeDeReferencia;
    }

    public void setCns(String cns) {
        this.cns = cns;
    }

    public void setCnsDoResponsavel(String cnsDoResponsavel) {
        this.cnsDoResponsavel = cnsDoResponsavel;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public void setDataDaAbertura(Date dataDaAbertura) {
        this.dataDaAbertura = dataDaAbertura;
    }

    public void setDataDeNascimento(Date dataDeNascimento) {
        this.dataDeNascimento = dataDeNascimento;
    }

    public void setDataDeNascimentoResponsavel(String dataDeNascimentoResponsavel) {
        this.dataDeNascimentoResponsavel = dataDeNascimentoResponsavel;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public void setHipoteseDiagnostica(String hipoteseDiagnostica) {
        this.hipoteseDiagnostica = hipoteseDiagnostica;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setNomeDaMae(String nomeDaMae) {
        this.nomeDaMae = nomeDaMae;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public void setNumeroProntuario(String numeroProntuario) {
        this.numeroProntuario = numeroProntuario;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setUnidadeDeReferencia(String unidadeDeReferencia) {
        this.unidadeDeReferencia = unidadeDeReferencia;
    }
}
