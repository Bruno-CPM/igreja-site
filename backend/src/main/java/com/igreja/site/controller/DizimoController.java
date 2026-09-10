package com.igreja.site.controller;

import com.igreja.site.model.LembreteDizimo;
import com.igreja.site.repository.LembreteDizimoRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dizimo")
public class DizimoController {

    private final LembreteDizimoRepository repository;

    public DizimoController(LembreteDizimoRepository repository) {
        this.repository = repository;
    }

    // Cadastra o pedido de lembrete mensal de dizimo/contribuicao.
    // O envio em si (e-mail/WhatsApp) ainda precisa ser conectado a um
    // provedor (ex: JavaMailSender ou API do WhatsApp Business) rodando
    // num job mensal que leia esta tabela.
    @PostMapping("/lembrete")
    public ResponseEntity<LembreteDizimo> cadastrarLembrete(@Valid @RequestBody LembreteDizimo lembrete) {
        LembreteDizimo salvo = repository.save(lembrete);
        return ResponseEntity.status(201).body(salvo);
    }
}
