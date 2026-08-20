package com.igreja.site.controller;

import com.igreja.site.model.Pregador;
import com.igreja.site.repository.PregadorRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pregadores")
public class PregadorController {

    private final PregadorRepository repository;

    public PregadorController(PregadorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Pregador> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pregador> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pregador> criar(@Valid @RequestBody Pregador pregador) {
        Pregador salvo = repository.save(pregador);
        return ResponseEntity.status(201).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pregador> atualizar(@PathVariable Long id, @Valid @RequestBody Pregador dados) {
        return repository.findById(id).map(existente -> {
            existente.setNome(dados.getNome());
            existente.setCargo(dados.getCargo());
            existente.setBiografia(dados.getBiografia());
            existente.setFotoUrl(dados.getFotoUrl());
            return ResponseEntity.ok(repository.save(existente));
        }).orElse(ResponseEntity.notFound().build());
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
