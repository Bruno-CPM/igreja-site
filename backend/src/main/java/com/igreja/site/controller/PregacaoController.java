package com.igreja.site.controller;

import com.igreja.site.model.Pregacao;
import com.igreja.site.repository.PregacaoRepository;
import com.igreja.site.repository.PregadorRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pregacoes")
public class PregacaoController {

    private final PregacaoRepository repository;
    private final PregadorRepository pregadorRepository;

    public PregacaoController(PregacaoRepository repository, PregadorRepository pregadorRepository) {
        this.repository = repository;
        this.pregadorRepository = pregadorRepository;
    }

    @GetMapping
    public List<Pregacao> listar(@RequestParam(required = false) Long pregadorId) {
        if (pregadorId != null) {
            return repository.findByPregadorIdOrderByDataDesc(pregadorId);
        }
        return repository.findAllByOrderByDataDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pregacao> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody Pregacao pregacao) {
        if (pregacao.getPregador() != null && pregacao.getPregador().getId() != null) {
            var pregador = pregadorRepository.findById(pregacao.getPregador().getId());
            if (pregador.isEmpty()) {
                return ResponseEntity.badRequest().body("Pregador informado nao existe");
            }
            pregacao.setPregador(pregador.get());
        }
        Pregacao salva = repository.save(pregacao);
        return ResponseEntity.status(201).body(salva);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
