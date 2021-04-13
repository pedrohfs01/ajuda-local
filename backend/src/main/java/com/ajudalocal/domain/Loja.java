package com.ajudalocal.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Loja.
 */
@Entity
@Table(name = "loja")
public class Loja implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cnpj")
    private Long cnpj;

    @Column(name = "nome")
    private String nome;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "estado")
    private String estado;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "uf")
    private String uf;

    @Column(name = "categoria")
    private String categoria;

    @ManyToOne
    @JsonIgnoreProperties(value = "lojas", allowSetters = true)
    private Usuario usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCnpj() {
        return cnpj;
    }

    public Loja cnpj(Long cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(Long cnpj) {
        this.cnpj = cnpj;
    }

    public String getNome() {
        return nome;
    }

    public Loja nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public Loja telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDescricao() {
        return descricao;
    }

    public Loja descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEstado() {
        return estado;
    }

    public Loja estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public Loja cidade(String cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public Loja uf(String uf) {
        this.uf = uf;
        return this;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCategoria() {
        return categoria;
    }

    public Loja categoria(String categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Loja usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Loja)) {
            return false;
        }
        return id != null && id.equals(((Loja) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Loja{" +
            "id=" + getId() +
            ", cnpj=" + getCnpj() +
            ", nome='" + getNome() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", estado='" + getEstado() + "'" +
            ", cidade='" + getCidade() + "'" +
            ", uf='" + getUf() + "'" +
            ", categoria='" + getCategoria() + "'" +
            "}";
    }
}
