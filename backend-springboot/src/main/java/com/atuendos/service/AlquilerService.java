package com.atuendos.service;

import com.atuendos.model.Alquiler;
import com.atuendos.model.Prenda;
import com.atuendos.patterns.composite.GrupoPrendas;
import com.atuendos.patterns.composite.PrendaHoja;
import com.atuendos.patterns.decorator.AlquilerServiceI;
import com.atuendos.patterns.factory.AlquilerFactory;
import com.atuendos.patterns.singleton.ContadorAlquilerSingleton;
import com.atuendos.repository.AlquilerRepository;
import com.atuendos.repository.PrendaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AlquilerService implements AlquilerServiceI {

    private final AlquilerRepository alquilerRepository;
    private final PrendaRepository prendaRepository;
    private final ContadorAlquilerSingleton contador; 

    public AlquilerService(AlquilerRepository alquilerRepository,
                           PrendaRepository prendaRepository,
                           ContadorAlquilerSingleton contador) {
        this.alquilerRepository = alquilerRepository;
        this.prendaRepository   = prendaRepository;
        this.contador           = contador;
    }

    public List<Alquiler> listarAlquileres() {
        return alquilerRepository.findAll();
    }

    @Override
    public List<Alquiler> listarActivos() {
        return alquilerRepository.findByEstado("activo");
    }

    public List<Alquiler> listarTerminados() {
        return alquilerRepository.findByEstado("terminado");
    }

    public List<Alquiler> listarPorCliente(Long clienteId) {
        return alquilerRepository.findByClienteId(clienteId);
    }

    @Override
    public Alquiler guardarAlquiler(Alquiler alquiler) {
        int numero = contador.siguiente();       
        Alquiler nuevo = AlquilerFactory.crear(    
            "normal",
            alquiler.getCliente(),
            alquiler.getEmpleado(),
            alquiler.getPrendas(),
            alquiler.getFechaAlquiler(),
            numero
        );
        return alquilerRepository.save(nuevo);
    }

    @Override
    public Alquiler terminarAlquiler(Long id) {
        Alquiler alquiler = alquilerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alquiler no encontrado: " + id));

        alquiler.setEstado("terminado");
        alquiler.setFechaDevolucion(LocalDate.now());

        for (Prenda prenda : alquiler.getPrendas()) {
            prenda.setEstado("sucia");
            prendaRepository.save(prenda);
        }

        return alquilerRepository.save(alquiler);
    }

    public String getDescripcionAlquiler(Long id) {
        Alquiler alquiler = alquilerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alquiler no encontrado: " + id));

        GrupoPrendas grupo = new GrupoPrendas("Alquiler #" + alquiler.getNumeroServicio());
        alquiler.getPrendas().forEach(p -> grupo.agregar(new PrendaHoja(p)));  // Composite

        return grupo.getDescripcion();
    }
}
