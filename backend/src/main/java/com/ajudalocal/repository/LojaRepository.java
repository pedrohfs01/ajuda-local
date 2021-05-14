package com.ajudalocal.repository;

import com.ajudalocal.domain.Loja;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface LojaRepository extends JpaRepository<Loja, Long> {

    List<Loja> findAllByEstado(String estado);
    List<Loja> findAllByCidade(String cidade);
    List<Loja> findAllByUsuarioId(Long id);
    Optional<Loja> findByCnpj(String cnpj);

}
