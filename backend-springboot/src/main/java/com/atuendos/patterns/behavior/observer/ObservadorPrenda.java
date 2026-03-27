package com.atuendos.patterns.behavior.observer;


public interface ObservadorPrenda {

    /**
     * @param prendaId
     * @param nuevoEstado  
     */
    void actualizar(Long prendaId, String nuevoEstado);
}
