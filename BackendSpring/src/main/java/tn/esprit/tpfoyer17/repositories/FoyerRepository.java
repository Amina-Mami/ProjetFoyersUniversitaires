package tn.esprit.tpfoyer17.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.tpfoyer17.entities.Foyer;

import java.util.List;

@Repository
public interface FoyerRepository extends CrudRepository<Foyer,Long> {
    List<Foyer> findByUniversiteIdUniversite(long idUniversite);
}
