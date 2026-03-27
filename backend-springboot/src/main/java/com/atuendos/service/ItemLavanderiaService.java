package com.atuendos.service;

import com.atuendos.model.ItemLavanderia;
import com.atuendos.model.Prenda;
import com.atuendos.repository.ItemLavanderiaRepository;
import com.atuendos.repository.PrendaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ItemLavanderiaService {

    private final ItemLavanderiaRepository lavanderiaRepository;
    private final PrendaRepository prendaRepository;

    public ItemLavanderiaService(ItemLavanderiaRepository lavanderiaRepository,
                                 PrendaRepository prendaRepository) {
        this.lavanderiaRepository = lavanderiaRepository;
        this.prendaRepository = prendaRepository;
    }

    public List<ItemLavanderia> listarLavanderia() {
        return lavanderiaRepository.findAll();
    }

    public ItemLavanderia enviarALavanderia(ItemLavanderia item) {
        Prenda prenda = item.getPrenda();
        String nuevoEstado = item.isPrioridad() ? "lavanderia(prioridad)" : "lavanderia";
        prenda.setEstado(nuevoEstado);
        prendaRepository.save(prenda);

        item.setFechaSalida(LocalDate.now());
        return lavanderiaRepository.save(item);
    }

    public void marcarComoLavada(Long itemId) {
        ItemLavanderia item = lavanderiaRepository.findById(itemId)
            .orElseThrow(() -> new RuntimeException("Item de lavandería no encontrado: " + itemId));

        Prenda prenda = item.getPrenda();
        prenda.setEstado("disponible");
        prendaRepository.save(prenda);

        lavanderiaRepository.deleteById(itemId);
    }
}
