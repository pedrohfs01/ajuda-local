package com.ajudalocal.repository;

import com.ajudalocal.domain.Loja;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface LojaRepository extends JpaRepository<Loja, Long> {
}
