import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/Services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  reservation = {
    etudiant: null,
    universite: null,
    foyer: null,
    bloc: null,
    chambre: null,
  };
  etudiants: any[] = [];
  universites: any[] = [];
  foyers: any[] = [];
  blocs: any[] = [];
  chambres: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchEtudiants();
    this.fetchUniversites();
    this.fetchFoyers();
    this.fetchBlocs(); // Fetch all Blocs initially
  }

  fetchEtudiants() {
    this.reservationService.getEtudiants().subscribe(
      (data: any[]) => {
        this.etudiants = data;
      },
      (error) => {
        console.error('Error fetching étudiants:', error);
      }
    );
  }

  fetchUniversites() {
    this.reservationService.getUniversites().subscribe(
      (data: any[]) => {
        this.universites = data;
      },
      (error) => {
        console.error('Error fetching Universites:', error);
      }
    );
  }

  fetchFoyers() {
    this.reservationService.getFoyers().subscribe(
      (data: any[]) => {
        this.foyers = data;
      },
      (error) => {
        console.error('Error fetching Foyers:', error);
      }
    );
  }

  fetchBlocs() {
    this.reservationService.getBlocs().subscribe(
      (data: any[]) => {
        this.blocs = data;
      },
      (error) => {
        console.error('Error fetching Blocs:', error);
      }
    );
  }

  onUniversiteChange() {
    const selectedUniversiteId = this.reservation.universite; // Assuming reservation object is bound and contains selected université ID
    if (selectedUniversiteId) {
      this.reservationService
        .getFoyersByUniversite(selectedUniversiteId)
        .subscribe(
          (data) => {
            this.foyers = data;
          },
          (error) => {
            console.error('Error fetching foyers:', error);
          }
        );
    }
  }

  onFoyerChange() {
    const selectedFoyerId = this.reservation.foyer;
    if (selectedFoyerId) {
      this.reservationService.getBlocsByFoyer(selectedFoyerId).subscribe(
        (data: any[]) => {
          this.blocs = data;
        },
        (error) => {
          console.error('Error fetching Blocs:', error);
        }
      );
    } else {
      // If no Foyer is selected, reset Blocs to display all Blocs
      this.fetchBlocs();
    }
  }

  submitReservationForm() {
    console.log('Form submitted with data:', this.reservation);
    // Example: Call a service to submit data to a backend API
    // this.reservationService.submitReservation(this.reservation).subscribe(response => {
    //   console.log('Reservation submitted successfully:', response);
    //   // Handle success response
    // }, error => {
    //   console.error('Error submitting reservation:', error);
    //   // Handle error response
    // });
  }
}
