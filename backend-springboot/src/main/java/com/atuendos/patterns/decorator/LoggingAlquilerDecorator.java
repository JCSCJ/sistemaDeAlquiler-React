package com.atuendos.patterns.decorator;

import com.atuendos.model.Alquiler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class LoggingAlquilerDecorator implements AlquilerServiceI {

    private static final Logger log = LoggerFactory.getLogger(LoggingAlquilerDecorator.class);

    private final AlquilerServiceI delegate;

    public LoggingAlquilerDecorator(AlquilerServiceI delegate) {
        this.delegate = delegate;
    }

    @Override
    public List<Alquiler> listarActivos() {
        log.info("[Alquiler] Consultando alquileres activos");
        List<Alquiler> resultado = delegate.listarActivos();
        log.info("[Alquiler] Se encontraron {} alquileres activos", resultado.size());
        return resultado;
    }

    @Override
    public Alquiler guardarAlquiler(Alquiler alquiler) {
        log.info("[Alquiler] Registrando nuevo alquiler para cliente id={}",
            alquiler.getCliente() != null ? alquiler.getCliente().getId() : "null");
        Alquiler guardado = delegate.guardarAlquiler(alquiler);
        log.info("[Alquiler] Alquiler #{} registrado correctamente", guardado.getNumeroServicio());
        return guardado;
    }

    @Override
    public Alquiler terminarAlquiler(Long id) {
        log.info("[Alquiler] Terminando alquiler id={}", id);
        Alquiler terminado = delegate.terminarAlquiler(id);
        log.info("[Alquiler] Alquiler #{} terminado. Fecha devolución: {}",
            terminado.getNumeroServicio(), terminado.getFechaDevolucion());
        return terminado;
    }
}
