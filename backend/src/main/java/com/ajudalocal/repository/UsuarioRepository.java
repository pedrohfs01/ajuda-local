package com.ajudalocal.repository;

import com.ajudalocal.domain.Usuario;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
