package com.atuendos.service;

import com.atuendos.model.Empleado;
import com.atuendos.repository.EmpleadoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService {

    private final EmpleadoRepository repository;

    public EmpleadoService(EmpleadoRepository repository) {
        this.repository = repository;
    }

    public List<Empleado> listarEmpleados() {
        return repository.findAll();
    }

    public Empleado guardarEmpleado(Empleado empleado) {
        return repository.save(empleado);
    }
}
