package com.ajudalocal.domain.enums;

public enum Plano {
    PLANO_COMUM(0),
    PLANO_BRONZE(1),
    PLANO_PRATA(2),
    PLANO_OURO(3),
    PLANO_DIAMANTE(4);

    private int valor;
    Plano(int valor) {
        this.valor = valor;
    }
}
