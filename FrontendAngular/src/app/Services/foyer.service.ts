import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Foyer } from '../Models/Foyer';
import { Universite } from '../Models/Universite';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoyerService {
  private apiUrl = 'http://localhost:8081/foyer/api/foyers';

  private modificationReussieMessageSource = new BehaviorSubject<string>('');
  modificationReussieMessage$ =
    this.modificationReussieMessageSource.asObservable();

  constructor(private http: HttpClient) {}

  getFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/getAll`).pipe(
      tap((data) => console.log('Foyers:', data)),
      catchError(this.handleError<Foyer[]>('getFoyers', []))
    );
  }

  ajouterFoyer(foyer: Foyer): Observable<Foyer> {
    const ajouterEndpoint = `${this.apiUrl}/add`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const dataToSend = { ...foyer, universite: null };

    return this.http.post<Foyer>(ajouterEndpoint, dataToSend, { headers }).pipe(
      tap((data) => console.log('Foyer ajouté:', data)),
      catchError(this.handleError<Foyer>('ajouterFoyer'))
    );
  }

  supprimerFoyer(idFoyer: number): Observable<void> {
    const supprimerEndpoint = `${this.apiUrl}/delete/${idFoyer}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete<void>(supprimerEndpoint, { headers }).pipe(
      tap(() => console.log(`Foyer supprimé: ${idFoyer}`)),
      catchError(this.handleError<void>('supprimerFoyer'))
    );
  }

  getFoyerById(id: number): Observable<Foyer> {
    const url = `${this.apiUrl}/get?idFoyer=${id}`;
    return this.http.get<Foyer>(url).pipe(
      tap((data) => console.log(`Foyer récupéré: ${data}`)),
      catchError(this.handleError<Foyer>('getFoyerById'))
    );
  }

  informerModificationReussieMessage(message: string): void {
    this.modificationReussieMessageSource.next(message);
  }

  modifierFoyer(foyer: Foyer): Observable<Foyer> {
    const modifierEndpoint = `${this.apiUrl}/update`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<Foyer>(modifierEndpoint, foyer, { headers }).pipe(
      tap((response) => {
        console.log('Foyer modifié avec succès', response);
        this.informerModificationReussieMessage('Foyer modifié avec succès');
      }),
      catchError(this.handleError<Foyer>('modifierFoyer'))
    );
  }

  getUniversites(): Observable<Universite[]> {
    const universiteApiUrl =
      'http://localhost:8081/foyer/api/universites/getAll';
    return this.http.get<Universite[]>(universiteApiUrl).pipe(
      tap((data) => console.log("Données d'universités:", data)),
      catchError(this.handleError<Universite[]>('getUniversites', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
