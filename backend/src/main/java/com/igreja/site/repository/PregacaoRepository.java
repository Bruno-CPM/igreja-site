package com.igreja.site.repository;

import com.igreja.site.model.Pregacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PregacaoRepository extends JpaRepository<Pregacao, Long> {
    List<Pregacao> findAllByOrderByDataDesc();
    List<Pregacao> findByPregadorIdOrderByDataDesc(Long pregadorId);
}
