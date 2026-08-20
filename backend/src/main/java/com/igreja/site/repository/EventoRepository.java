package com.igreja.site.repository;

import com.igreja.site.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByRealizadoOrderByDataDesc(boolean realizado);
    List<Evento> findByRealizadoOrderByDataAsc(boolean realizado);
}
