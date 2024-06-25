import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Reservation } from '../Models/Reservation';
import { Etudiant } from '../Models/Etudiant';
import { Universite } from '../Models/Universite';
import { Bloc } from '../Models/Bloc';
import { Foyer } from '../Models/Foyer';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8081/foyer/api';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(`${this.apiUrl}/reservations/getAll`)
      .pipe(
        tap((data) => console.log('Reservations:', data)),
        catchError(this.handleError<Reservation[]>('getReservations', []))
      );
  }
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/etudiants/getAll`).pipe(
      tap((data) => console.log('Etudiants:', data)),
      catchError(this.handleError<Etudiant[]>('getEtudiantsList', []))
    );
  }
  getUniversites(): Observable<Universite[]> {
    return this.http
      .get<Universite[]>(`${this.apiUrl}/universites/getAll`)
      .pipe(catchError(this.handleError<Universite[]>('getUniversites', [])));
  }
  getBlocs(): Observable<Bloc[]> {
    return this.http
      .get<Bloc[]>(`${this.apiUrl}/blocs/getAll`)
      .pipe(catchError(this.handleError<Bloc[]>('getBlocs', [])));
  }
  getFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/foyers/getAll`).pipe(
      tap((data) => console.log('Foyers:', data)),
      catchError(this.handleError<Foyer[]>('getFoyers', []))
    );
  }
  getBlocsByFoyer(foyerId: number): Observable<Bloc[]> {
    return this.http
      .get<Bloc[]>(`${this.apiUrl}/blocs/getByFoyer/${foyerId}`)
      .pipe(
        tap((data) => console.log(`Blocs for Foyer ${foyerId}:`, data)),
        catchError(
          this.handleError<Bloc[]>(`getBlocsByFoyer id=${foyerId}`, [])
        )
      );
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    const addEndpoint = `${this.apiUrl}/reservations/add`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<Reservation>(addEndpoint, reservation, { headers })
      .pipe(
        tap((data) => console.log('Reservation added:', data)),
        catchError(this.handleError<Reservation>('addReservation'))
      );
  }

  deleteReservation(id: number): Observable<void> {
    const deleteEndpoint = `${this.apiUrl}/reservations/delete/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete<void>(deleteEndpoint, { headers }).pipe(
      tap(() => console.log(`Reservation deleted: ${id}`)),
      catchError(this.handleError<void>('deleteReservation'))
    );
  }
  getFoyersByUniversite(universiteId: number): Observable<Foyer[]> {
    return this.http
      .get<Foyer[]>(`${this.apiUrl}/foyers/getByUniversite/${universiteId}`)
      .pipe(
        tap((data) => console.log('Foyers by Université:', data)),
        catchError(this.handleError<Foyer[]>('getFoyersByUniversite', []))
      );
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    const updateEndpoint = `${this.apiUrl}/reservations/update`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .put<Reservation>(updateEndpoint, reservation, { headers })
      .pipe(
        tap((data) => console.log('Reservation updated:', data)),
        catchError(this.handleError<Reservation>('updateReservation'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
