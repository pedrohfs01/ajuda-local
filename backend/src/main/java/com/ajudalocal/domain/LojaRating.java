package com.ajudalocal.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter @EqualsAndHashCode
public class LojaRating {

    @EmbeddedId
    private LojaRatingPK id;

    @ManyToOne
    @MapsId("usuarioId")
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties({"ratings", "lojas"})
    private Usuario usuario;

    @ManyToOne
    @MapsId("lojaId")
    @JoinColumn(name = "loja_id")
    @JsonIgnoreProperties({"ratings", "usuarios"})
    private Loja loja;

    int rating;
}
