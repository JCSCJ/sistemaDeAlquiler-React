package com.atuendos.service;

import com.atuendos.model.Prenda;
import com.atuendos.patterns.behavior.observer.GestorEventosPrenda;
import com.atuendos.patterns.behavior.observer.NotificadorCliente;
import com.atuendos.patterns.behavior.observer.NotificadorEmpleado;
import com.atuendos.patterns.factory.PrendaFactory;
import com.atuendos.repository.PrendaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrendaService {

    private final PrendaRepository     repository;
    private final GestorEventosPrenda  gestor;

    public PrendaService(PrendaRepository repository,
                         GestorEventosPrenda gestor,
                         NotificadorCliente notificadorCliente,
                         NotificadorEmpleado notificadorEmpleado) {
        this.repository = repository;
        this.gestor     = gestor;

        gestor.registrar(notificadorCliente);
        gestor.registrar(notificadorEmpleado);
    }

    public List<Prenda> listarPrendas() {
        return repository.findAll();
    }

    public Prenda guardarPrenda(Prenda prenda) {
        Prenda nueva = PrendaFactory.crear(
            prenda.getReferencia(),
            prenda.getMarca(),
            prenda.getTalla()
        );
        return repository.save(nueva);
    }

    public List<Prenda> buscarPorTalla(String talla) {
        return repository.findByTalla(talla);
    }

    public List<Prenda> buscarPorEstado(String estado) {
        return repository.findByEstado(estado);
    }

    public Prenda actualizarEstado(Long id, String nuevoEstado) {
        Prenda prenda = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Prenda no encontrada: " + id));

        prenda.setEstado(nuevoEstado);
        Prenda guardada = repository.save(prenda);

        gestor.notificar(guardada.getId(), nuevoEstado);

        return guardada;
    }
}
