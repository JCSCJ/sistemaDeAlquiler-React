package com.atuendos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.atuendos.model.Cliente;
import com.atuendos.service.ClienteService;

@RestController
@RequestMapping("/clientes")
@CrossOrigin
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service){
        this.service = service;
    }

    @GetMapping
    public List<Cliente> listar(){
        return service.listarClientes();
    }

    @PostMapping
    public Cliente guardar(@RequestBody Cliente cliente){
        return service.guardarCliente(cliente);
    }

}