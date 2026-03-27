package com.atuendos.controller;

import com.atuendos.model.ItemLavanderia;
import com.atuendos.service.ItemLavanderiaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lavanderia")
@CrossOrigin
public class ItemLavanderiaController {

    private final ItemLavanderiaService service;

    public ItemLavanderiaController(ItemLavanderiaService service) {
        this.service = service;
    }

    @GetMapping
    public List<ItemLavanderia> listar() {
        return service.listarLavanderia();
    }

    @PostMapping
    public ItemLavanderia enviar(@RequestBody ItemLavanderia item) {
        return service.enviarALavanderia(item);
    }

    @DeleteMapping("/{id}")
    public void marcarLavada(@PathVariable Long id) {
        service.marcarComoLavada(id);
    }
}
