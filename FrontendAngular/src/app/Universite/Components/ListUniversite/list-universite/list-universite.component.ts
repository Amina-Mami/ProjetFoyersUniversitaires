import { Component, OnInit } from '@angular/core';
import { Universite } from 'src/app/Models/Universite';
import { CrudUniversite } from 'src/app/Service/CrudUniversite';
import { Router } from '@angular/router';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-list-universite',
  templateUrl: './list-universite.component.html',
  styleUrls: ['./list-universite.component.css'],
})
export class ListUniversiteComponent implements OnInit {
  universites: Universite[] = [];

  recherche: string = '';

  constructor(private service: CrudUniversite, private router: Router) {}

  onDeleteBloc(universite: Universite) {
    if (confirm('Voulez vous supprimer ce universite ?')) {
      this.service.deleteUniversite(universite.idUniversite).subscribe(() => {
        this.router.navigate(['/listeUniversite']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  ngOnInit(): void {
    this.loadUniversites();
  }
  loadUniversites() {
    if (this.recherche) {
      this.service.searchUniversite(this.recherche).subscribe(
        (data) => {
          this.universites = data;
          console.log('Universités:', data);
        },
        (error) => {
          console.error('Erreur lors de la recherche des universités', error);
        }
      );
    } else {
      this.service.getUniversites().subscribe(
        (data) => {
          this.universites = data;
          console.log('Universités:', data);
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des universités',
            error
          );
        }
      );
    }
  }

  ExportPdf() {
    this.service.exportUniversitesPdf().subscribe(
      (blob: Blob) => {
        const fileName = 'universites.pdf';
        saveAs(blob, fileName);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  triParNom() {
    this.service.getUniversitesTrieesParNom().subscribe(
      (data) => {
        this.universites = data;
        console.log('Universités triées par nom:', data);
      },
      (error) => {
        console.error('Erreur lors du tri des universités par nom', error);
      }
    );
  }

  triParAdresse() {
    this.service.getUniversitesTrieesParAdresse().subscribe(
      (data) => {
        this.universites = data;
        console.log('Universités triées par adresse:', data);
      },
      (error) => {
        console.error('Erreur lors du tri des universités par adresse', error);
      }
    );
  }

  localiserUniversite(universite: Universite) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      universite.adresse
    )}`;
    window.open(url, '_blank');
  }
}
