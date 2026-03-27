package com.atuendos.patterns.adapter;

public class ClienteExternoDto {

    private String nombreCompleto;
    private String celular;
    private String email;

    public ClienteExternoDto(String nombreCompleto, String celular, String email) {
        this.nombreCompleto = nombreCompleto;
        this.celular = celular;
        this.email = email;
    }

    public String getNombreCompleto() { return nombreCompleto; }
    public String getCelular()        { return celular; }
    public String getEmail()          { return email; }
}
