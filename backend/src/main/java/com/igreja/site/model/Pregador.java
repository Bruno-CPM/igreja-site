package com.igreja.site.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "pregadores")
public class Pregador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    private String cargo; // ex: Pastor titular, Pastor auxiliar, Ministro

    @Column(length = 2000)
    private String biografia;

    private String fotoUrl; // link da foto (a ser fornecida futuramente)

    public Pregador() {}

    public Pregador(String nome, String cargo, String biografia, String fotoUrl) {
        this.nome = nome;
        this.cargo = cargo;
        this.biografia = biografia;
        this.fotoUrl = fotoUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getBiografia() { return biografia; }
    public void setBiografia(String biografia) { this.biografia = biografia; }

    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }
}
