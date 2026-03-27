package com.atuendos.patterns.behavior.observer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class NotificadorCliente implements ObservadorPrenda {

    private static final Logger log = LoggerFactory.getLogger(NotificadorCliente.class);

    @Override
    public void actualizar(Long prendaId, String nuevoEstado) {
        log.info("[Cliente] La prenda id={} cambió a estado '{}'." +
                 " Notificando al cliente...", prendaId, nuevoEstado);

    }
}
