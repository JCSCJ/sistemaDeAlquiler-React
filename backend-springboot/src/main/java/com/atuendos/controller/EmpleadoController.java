package com.atuendos.controller;

import com.atuendos.model.Empleado;
import com.atuendos.service.EmpleadoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empleados")
@CrossOrigin
public class EmpleadoController {

    private final EmpleadoService service;

    public EmpleadoController(EmpleadoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Empleado> listar() {
        return service.listarEmpleados();
    }

    @PostMapping
    public Empleado guardar(@RequestBody Empleado empleado) {
        return service.guardarEmpleado(empleado);
    }
}
