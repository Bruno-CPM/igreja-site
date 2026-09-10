package com.igreja.site.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "lembretes_dizimo")
public class LembreteDizimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    // Canal preferido: "email" ou "whatsapp"
    @NotBlank
    private String canal;

    // Endereco de e-mail ou numero de WhatsApp, conforme o canal
    @NotBlank
    private String contato;

    // Dia do mes preferido para o lembrete (1-28)
    private Integer diaPreferido;

    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }

    public LembreteDizimo() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCanal() { return canal; }
    public void setCanal(String canal) { this.canal = canal; }

    public String getContato() { return contato; }
    public void setContato(String contato) { this.contato = contato; }

    public Integer getDiaPreferido() { return diaPreferido; }
    public void setDiaPreferido(Integer diaPreferido) { this.diaPreferido = diaPreferido; }

    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }
}
