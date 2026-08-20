package com.igreja.site.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "servicos")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome; // ex: Culto de Celebracao, Escola Biblica, Ministerio Infantil

    @Column(length = 2000)
    private String descricao;

    private String horario; // ex: Domingos as 18h

    private String icone; // nome do icone usado no frontend

    public Servico() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getHorario() { return horario; }
    public void setHorario(String horario) { this.horario = horario; }

    public String getIcone() { return icone; }
    public void setIcone(String icone) { this.icone = icone; }
}
