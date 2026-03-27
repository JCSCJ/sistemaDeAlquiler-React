package com.atuendos.patterns.adapter;

import com.atuendos.model.Cliente;

public class ClienteAdapter {

    public static Cliente adaptar(ClienteExternoDto externo) {
        Cliente cliente = new Cliente();
        cliente.setNombre(externo.getNombreCompleto());
        cliente.setTelefono(externo.getCelular());
        cliente.setCorreo(externo.getEmail());
        return cliente;
    }
}
