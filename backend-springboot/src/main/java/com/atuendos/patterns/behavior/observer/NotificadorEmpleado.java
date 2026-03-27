package com.atuendos.patterns.behavior.observer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class NotificadorEmpleado implements ObservadorPrenda {

    private static final Logger log = LoggerFactory.getLogger(NotificadorEmpleado.class);

    @Override
    public void actualizar(Long prendaId, String nuevoEstado) {
        log.info("[Empleado] Alerta de inventario: la prenda id={} ahora está '{}'.",
                 prendaId, nuevoEstado);

    }
}
