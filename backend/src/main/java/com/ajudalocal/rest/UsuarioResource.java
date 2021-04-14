package com.ajudalocal.rest;

import com.ajudalocal.domain.Usuario;
import com.ajudalocal.repository.UsuarioRepository;
import com.ajudalocal.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Transactional
public class UsuarioResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioResource.class);

    private static final String ENTITY_NAME = "usuario";

    private final UsuarioRepository usuarioRepository;

    public UsuarioResource(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) throws URISyntaxException {
        log.debug("REST request to save Usuario : {}", usuario);
        if (usuario.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new usuario cannot already have an ID")).body(null);
        }
        Usuario result = usuarioRepository.save(usuario);
        return ResponseEntity.created(new URI("/api/usuarios/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    @PutMapping("/usuarios")
    public ResponseEntity<Usuario> updateUsuario(@RequestBody Usuario usuario) throws URISyntaxException {
        log.debug("REST request to update Usuario : {}", usuario);
        if (usuario.getId() == null) {
            return createUsuario(usuario);
        }
        Usuario result = usuarioRepository.save(usuario);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usuario.getId().toString()))
                .body(result);
    }

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        log.debug("REST request to get all Usuarios");
        return usuarioRepository.findAll();
    }



    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable Long id) {
        log.debug("REST request to get Usuario : {}", id);
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return new ResponseEntity(usuario.get(), HttpStatus.OK);
    }


    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        log.debug("REST request to delete Usuario : {}", id);
        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
