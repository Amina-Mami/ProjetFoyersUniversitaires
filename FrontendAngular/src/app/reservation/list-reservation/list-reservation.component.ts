import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/Models/Reservation';
import { ReservationService } from 'src/app/Services/reservation.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css'],
})
export class ListReservationComponent implements OnInit {
  reservations: Reservation[] = [];
  recherche: string = '';

  constructor(private service: ReservationService, private router: Router) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.service.getReservations().subscribe(
      (data) => {
        console.log('Données reçues du service', data);
        this.reservations = data;
      },
      (error) =>
        console.error('Erreur dans la récupération des reservation', error)
    );
  }

  filtrerReservations(): Reservation[] {
    const searchYear = this.rechercherReservations(); // Assuming this returns a year as a string or number
    return this.reservations.filter(
      (reservation) =>
        reservation.anneeUniversitaire.getFullYear() === parseInt(searchYear)
    );
  }

  rechercherReservations(): string {
    return this.recherche;
  }

  onDeleteReservation(reservation: Reservation) {
    if (confirm('Voulez vous supprimer cette reservation ?')) {
      this.service
        .deleteReservation(reservation.idReservation)
        .subscribe(() => {
          this.router.navigate(['/listeReservation']).then(() => {
            window.location.reload();
          });
        });
    }
  }
}
