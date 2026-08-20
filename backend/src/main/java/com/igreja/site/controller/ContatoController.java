package com.igreja.site.controller;

import com.igreja.site.model.Mensagem;
import com.igreja.site.repository.MensagemRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contato")
public class ContatoController {

    private final MensagemRepository repository;

    public ContatoController(MensagemRepository repository) {
        this.repository = repository;
    }

    // Recebe as mensagens do formulario de "Contato" e salva no banco.
    // Pode futuramente ser conectado a um servico de e-mail (ex: JavaMailSender).
    @PostMapping
    public ResponseEntity<Mensagem> enviar(@Valid @RequestBody Mensagem mensagem) {
        Mensagem salva = repository.save(mensagem);
        return ResponseEntity.status(201).body(salva);
    }
}
