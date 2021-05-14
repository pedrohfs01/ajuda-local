package com.ajudalocal.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter @Setter @EqualsAndHashCode
public class LojaRatingPK implements Serializable {

    @Column(name= "loja_id")
    private Long lojaId;

    @Column(name = "usuario_id")
    private Long usuarioId;

}
