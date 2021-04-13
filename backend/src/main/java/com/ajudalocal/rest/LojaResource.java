package com.ajudalocal.rest;

import com.ajudalocal.domain.Loja;
import com.ajudalocal.repository.LojaRepository;
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
public class LojaResource {

    private final Logger log = LoggerFactory.getLogger(LojaResource.class);

    private static final String ENTITY_NAME = "loja";

    @Value("${spring.application.name}")
    private String applicationName;

    private final LojaRepository lojaRepository;

    public LojaResource(LojaRepository lojaRepository) {
        this.lojaRepository = lojaRepository;
    }

    @PostMapping("/lojas")
    public ResponseEntity<Loja> createLoja(@RequestBody Loja loja) throws URISyntaxException {
        log.debug("REST request to save Loja : {}", loja);
        if (loja.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new loja cannot already have an ID")).body(null);
        }
        Loja result = lojaRepository.save(loja);
        return ResponseEntity.created(new URI("/api/lojas/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }


    @PutMapping("/lojas")
    public ResponseEntity<Loja> updateLoja(@RequestBody Loja loja) throws URISyntaxException {
        log.debug("REST request to update Loja : {}", loja);
        if (loja.getId() == null) {
            return createLoja(loja);
        }
        Loja result = lojaRepository.save(loja);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, loja.getId().toString()))
                .body(result);
    }

    @GetMapping("/lojas")
    public List<Loja> getAllLojas() {
        log.debug("REST request to get all Lojas");
        return lojaRepository.findAll();
    }


    @GetMapping("/lojas/{id}")
    public ResponseEntity<Loja> getLoja(@PathVariable Long id) {
        log.debug("REST request to get Loja : {}", id);
        Optional<Loja> loja = lojaRepository.findById(id);
        return new ResponseEntity<>(loja.get(), HttpStatus.OK);
    }

    @DeleteMapping("/lojas/{id}")
    public ResponseEntity<Void> deleteLoja(@PathVariable Long id) {
        log.debug("REST request to delete Loja : {}", id);
        lojaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
