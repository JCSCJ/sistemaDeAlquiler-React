package com.atuendos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.atuendos.model.Cliente;
import com.atuendos.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> listarClientes(){
        return repository.findAll();
    }

    public Cliente guardarCliente(Cliente cliente){
        return repository.save(cliente);
    }

}