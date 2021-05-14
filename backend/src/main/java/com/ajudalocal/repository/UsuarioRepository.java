package com.ajudalocal.repository;

import com.ajudalocal.domain.Usuario;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


    @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.senha = :senha")
    Optional<Usuario> procurarUsuario(String email, String senha);

    Optional<Usuario> findByEmail(String email);
}
