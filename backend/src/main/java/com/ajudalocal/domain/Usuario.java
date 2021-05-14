package com.ajudalocal.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "senha")
    private String senha;

    @Column(name = "email")
    private String email;

    @Column(name = "estado")
    private String estado;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "uf")
    private String uf;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private Set<Loja> lojas = new HashSet<>();

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private Set<LojaRating> ratings;

    private Boolean isEmpresario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Usuario nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public Usuario senha(String senha) {
        this.senha = senha;
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public Usuario email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEstado() {
        return estado;
    }

    public Usuario estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public Usuario cidade(String cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public Usuario uf(String uf) {
        this.uf = uf;
        return this;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public Set<Loja> getLojas() {
        return lojas;
    }

    public Usuario lojas(Set<Loja> lojas) {
        this.lojas = lojas;
        return this;
    }

    public Usuario addLoja(Loja loja) {
        this.lojas.add(loja);
        loja.setUsuario(this);
        return this;
    }

    public Usuario removeLoja(Loja loja) {
        this.lojas.remove(loja);
        loja.setUsuario(null);
        return this;
    }

    public void setLojas(Set<Loja> lojas) {
        this.lojas = lojas;
    }

    public Set<LojaRating> getRatings() {
        return ratings;
    }

    public void setRatings(Set<LojaRating> ratings) {
        this.ratings = ratings;
    }

    public Boolean getEmpresario() {
        return isEmpresario;
    }

    public void setEmpresario(Boolean empresario) {
        isEmpresario = empresario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + getId() +
                ", nome='" + getNome() + "'" +
                ", senha='" + getSenha() + "'" +
                ", email='" + getEmail() + "'" +
                ", estado='" + getEstado() + "'" +
                ", cidade='" + getCidade() + "'" +
                ", uf='" + getUf() + "'" +
                "}";
    }
}
