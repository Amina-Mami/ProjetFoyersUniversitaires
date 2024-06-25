import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Etudiant } from '../Models/Etudiant';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8081/foyer/api/etudiants';

  constructor(private http: HttpClient) {}

  getEtudiantsList(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/getAll`).pipe(
      tap((data) => console.log('Etudiants:', data)),
      catchError(this.handleError<Etudiant[]>('getEtudiantsList', []))
    );
  }

  createEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<Etudiant>(`${this.apiUrl}/add`, etudiant, { headers })
      .pipe(
        tap((data) => console.log('Etudiant ajouté:', data)),
        catchError(this.handleError<Etudiant>('createEtudiant'))
      );
  }

  deleteEtudiant(idEtudiant: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .delete<void>(`${this.apiUrl}/delete/${idEtudiant}`, { headers })
      .pipe(
        tap(() => console.log(`Etudiant supprimé: ${idEtudiant}`)),
        catchError(this.handleError<void>('deleteEtudiant'))
      );
  }

  getEtudiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/get?idEtudiant=${id}`).pipe(
      tap((data) => console.log(`Etudiant récupéré: ${data}`)),
      catchError(this.handleError<Etudiant>('getEtudiantById'))
    );
  }

  updateEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .put<Etudiant>(`${this.apiUrl}/update`, etudiant, { headers })
      .pipe(
        tap((response) =>
          console.log('Etudiant modifié avec succès', response)
        ),
        catchError(this.handleError<Etudiant>('updateEtudiant'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
