package com.ajudalocal.service;


import com.ajudalocal.domain.Usuario;
import com.ajudalocal.repository.UsuarioRepository;
import com.ajudalocal.service.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public Optional<Usuario> login(UsuarioDTO usuarioDTO){
        Optional<Usuario> usuario = usuarioRepository.procurarUsuario(usuarioDTO.getEmail(), usuarioDTO.getSenha());
        return usuario;
    }
}
