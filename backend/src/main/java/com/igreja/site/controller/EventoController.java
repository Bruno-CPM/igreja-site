package com.igreja.site.controller;

import com.igreja.site.model.Evento;
import com.igreja.site.repository.EventoRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoRepository repository;

    public EventoController(EventoRepository repository) {
        this.repository = repository;
    }

    // GET /api/eventos?realizado=true  -> eventos que a igreja ja realizou
    // GET /api/eventos?realizado=false -> proximos eventos
    // GET /api/eventos                 -> todos
    @GetMapping
    public List<Evento> listar(@RequestParam(required = false) Boolean realizado) {
        if (realizado == null) {
            return repository.findAll();
        }
        return realizado
                ? repository.findByRealizadoOrderByDataDesc(true)
                : repository.findByRealizadoOrderByDataAsc(false);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Evento> criar(@Valid @RequestBody Evento evento) {
        Evento salvo = repository.save(evento);
        return ResponseEntity.status(201).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> atualizar(@PathVariable Long id, @Valid @RequestBody Evento dados) {
        return repository.findById(id).map(existente -> {
            existente.setTitulo(dados.getTitulo());
            existente.setData(dados.getData());
            existente.setHorario(dados.getHorario());
            existente.setLocal(dados.getLocal());
            existente.setDescricao(dados.getDescricao());
            existente.setImagemUrl(dados.getImagemUrl());
            existente.setRealizado(dados.isRealizado());
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
