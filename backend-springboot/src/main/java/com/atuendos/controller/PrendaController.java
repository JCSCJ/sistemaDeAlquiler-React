package com.atuendos.controller;

import com.atuendos.model.Prenda;
import com.atuendos.service.PrendaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/prendas")
@CrossOrigin
public class PrendaController {

    private final PrendaService service;

    public PrendaController(PrendaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Prenda> listar() {
        return service.listarPrendas();
    }

    @GetMapping("/talla/{talla}")
    public List<Prenda> porTalla(@PathVariable String talla) {
        return service.buscarPorTalla(talla);
    }

    @GetMapping("/estado/{estado}")
    public List<Prenda> porEstado(@PathVariable String estado) {
        return service.buscarPorEstado(estado);
    }

    @PostMapping
    public Prenda guardar(@RequestBody Prenda prenda) {
        return service.guardarPrenda(prenda);
    }

    @PatchMapping("/{id}/estado")
    public Prenda actualizarEstado(@PathVariable Long id,
                                   @RequestBody Map<String, String> body) {
        return service.actualizarEstado(id, body.get("estado"));
    }
}
