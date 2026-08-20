package com.igreja.site.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "pregacoes")
public class Pregacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String titulo;

    @NotNull
    private LocalDate data;

    private String tema; // ex: Fe, Familia, Esperanca

    private String videoUrl; // link do video (Youtube, etc)

    @Column(length = 3000)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "pregador_id")
    @JsonIgnoreProperties({"biografia"})
    private Pregador pregador;

    public Pregacao() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public String getTema() { return tema; }
    public void setTema(String tema) { this.tema = tema; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Pregador getPregador() { return pregador; }
    public void setPregador(Pregador pregador) { this.pregador = pregador; }
}
