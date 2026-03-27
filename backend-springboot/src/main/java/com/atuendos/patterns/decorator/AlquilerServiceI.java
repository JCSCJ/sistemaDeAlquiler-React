package com.atuendos.patterns.decorator;

import com.atuendos.model.Alquiler;

import java.util.List;

public interface AlquilerServiceI {

    List<Alquiler> listarActivos();

    Alquiler guardarAlquiler(Alquiler alquiler);

    Alquiler terminarAlquiler(Long id);
}
