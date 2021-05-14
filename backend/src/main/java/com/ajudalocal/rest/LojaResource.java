package com.ajudalocal.rest;

import com.ajudalocal.domain.Loja;
import com.ajudalocal.domain.LojaRating;
import com.ajudalocal.domain.LojaRatingPK;
import com.ajudalocal.domain.Usuario;
import com.ajudalocal.repository.LojaRatingRepository;
import com.ajudalocal.repository.LojaRepository;
import com.ajudalocal.repository.UsuarioRepository;
import com.ajudalocal.rest.util.CustomParameterizedException;
import com.ajudalocal.rest.util.HeaderUtil;
import com.ajudalocal.rest.util.Utilitarios;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Transactional
@CrossOrigin("*")
public class LojaResource {

    private final Logger log = LoggerFactory.getLogger(LojaResource.class);

    private static final String ENTITY_NAME = "loja";

    private final LojaRepository lojaRepository;

    private final UsuarioRepository usuarioRepository;

    private final LojaRatingRepository lojaRatingRepository;

    public LojaResource(LojaRepository lojaRepository, UsuarioRepository usuarioRepository, LojaRatingRepository lojaRatingRepository) {
        this.lojaRepository = lojaRepository;
        this.usuarioRepository = usuarioRepository;
        this.lojaRatingRepository = lojaRatingRepository;
    }

    @PostMapping(value = "/lojas", consumes = {"multipart/form-data"})
    public ResponseEntity<Loja> createLoja(@RequestPart("loja")  Loja loja, @RequestPart(name = "foto", required = false) MultipartFile foto) throws URISyntaxException, IOException {
        log.debug("REST request to save Loja : {}", loja);
        if (loja.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new loja cannot already have an ID")).body(null);
        }else if(Utilitarios.isCNPJ(loja.getCnpj()) == false){
            throw new CustomParameterizedException("cnpjinvalido");
        }else if(lojaRepository.findByCnpj(loja.getCnpj()).isPresent()){
            throw new CustomParameterizedException("cnpjexiste");
        }

        if(!foto.isEmpty()){
            loja.setFoto(foto.getBytes());
        }

        Loja result = lojaRepository.save(loja);
        return ResponseEntity.created(new URI("/api/lojas/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }


    @PutMapping(value = "/lojas", consumes = {"multipart/form-data"})
    public ResponseEntity<Loja> updateLoja(@RequestPart("loja")  Loja loja, @RequestPart(name = "foto", required = false) MultipartFile foto) throws URISyntaxException, IOException {
        log.debug("REST request to update Loja : {}", loja);
        if (loja.getId() == null) {
            return createLoja(loja, foto);
        }

        if(foto != null){
            loja.setFoto(foto.getBytes());
        }else{
            Optional<Loja> lojaFoto = lojaRepository.findById(loja.getId());
            if(lojaFoto.isPresent()){
                loja.setFoto(lojaFoto.get().getFoto());
            }
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

    @GetMapping("/lojas/estado")
    public List<Loja> getAllLojasByEstado(@RequestParam("nome") String estado){
        List<Loja> lojas = lojaRepository.findAllByEstado(estado);
        return lojas;
    }

    @GetMapping("/lojas/cidade")
    public List<Loja> getAllLojasByCidade(@RequestParam("nome") String cidade){
        List<Loja> lojas = lojaRepository.findAllByCidade(cidade);
        return lojas;
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

    @GetMapping("/lojas/usuario/{id}")
    public List<Loja> getAllByUsuario(@PathVariable Long id){
        List<Loja> lojas = lojaRepository.findAllByUsuarioId(id);
        return lojas;
    }


    @GetMapping("/lojas/{id}/{idUsuario}/{quantidade}")
    public ResponseEntity<Loja> adicionarRating(@PathVariable("id") Long id, @PathVariable("idUsuario") Long idUsuario,@PathVariable("quantidade") Long quantidade){
        Optional<Loja> loja = lojaRepository.findById(id);
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);

        LojaRating lojaRating = new LojaRating();
        if(loja.isPresent() && usuario.isPresent()){
            Loja newLoja = loja.get();
            Usuario newUsuario = usuario.get();
            LojaRatingPK lojaRatingPK = new LojaRatingPK();
            lojaRatingPK.setLojaId(newLoja.getId());
            lojaRatingPK.setUsuarioId(newUsuario.getId());

            lojaRating.setLoja(newLoja);
            lojaRating.setRating(quantidade.intValue());
            lojaRating.setUsuario(newUsuario);

            lojaRating.setId(lojaRatingPK);

            newUsuario.setRatings(Arrays.asList(lojaRating).stream().collect(Collectors.toSet()));
            newLoja.setRatings(Arrays.asList(lojaRating).stream().collect(Collectors.toSet()));

            lojaRatingRepository.save(lojaRating);

            lojaRepository.save(newLoja);
            usuarioRepository.save(newUsuario);

            return new ResponseEntity<>(newLoja, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }
}
