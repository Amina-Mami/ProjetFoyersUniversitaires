import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Universite } from '../Models/Universite';
import { Foyer } from '../Models/Foyer';

@Injectable({
  providedIn: 'root',
})
export class CrudUniversite {
  private apiUrl = 'http://localhost:8081/foyer/api/universites';

  constructor(private http: HttpClient) {}

  getUniversites(): Observable<Universite[]> {
    return this.http
      .get<Universite[]>(`${this.apiUrl}/getAll`)
      .pipe(catchError(this.handleError<Universite[]>('getUniversites', [])));
  }

  addUniversite(universite: Universite): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/add`, universite, this.httpOptions())
      .pipe(catchError(this.handleError<any>('addUniversite')));
  }

  deleteUniversite(id: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http
      .delete<any>(url, this.httpOptions())
      .pipe(catchError(this.handleError<any>('deleteUniversite')));
  }

  updateUniversite(id: number, universite: Universite): Observable<any> {
    const url = `${this.apiUrl}/modify-Universite/${id}`;
    return this.http
      .put<any>(url, universite, this.httpOptions())
      .pipe(catchError(this.handleError<any>('updateUniversite')));
  }

  findUniversiteById(id: number): Observable<Universite> {
    const url = `${this.apiUrl}/get/${id}`;
    return this.http
      .get<Universite>(url, this.httpOptions())
      .pipe(catchError(this.handleError<Universite>('findUniversiteById')));
  }

  getFoyers(): Observable<Foyer[]> {
    const foyerApiUrl = 'http://localhost:8081/foyer/api/foyers/getAll';
    return this.http
      .get<Foyer[]>(foyerApiUrl)
      .pipe(catchError(this.handleError<Foyer[]>('getFoyers', [])));
  }

  exportUniversitesPdf(): Observable<Blob> {
    const pdfUrl = `${this.apiUrl}/pdf`;
    const httpOptionsPdf = {
      headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }),
      responseType: 'blob' as 'json',
    };
    return this.http
      .get<Blob>(pdfUrl, httpOptionsPdf)
      .pipe(catchError(this.handleError<Blob>('exportUniversitesPdf')));
  }

  searchUniversite(nom: string): Observable<Universite[]> {
    const searchUrl = `${this.apiUrl}/search/by-nom/${nom}`;
    return this.http
      .get<Universite[]>(searchUrl, this.httpOptions())
      .pipe(catchError(this.handleError<Universite[]>('searchUniversite', [])));
  }

  getUniversitesTrieesParAdresse(): Observable<Universite[]> {
    const triAdresseUrl = `${this.apiUrl}/retrieve-all-Universites/par-adresse`;
    return this.http
      .get<Universite[]>(triAdresseUrl, this.httpOptions())
      .pipe(
        catchError(
          this.handleError<Universite[]>('getUniversitesTrieesParAdresse', [])
        )
      );
  }

  getUniversitesTrieesParNom(): Observable<Universite[]> {
    const triNomUrl = `${this.apiUrl}/retrieve-all-Universites/par-nom`;
    return this.http
      .get<Universite[]>(triNomUrl, this.httpOptions())
      .pipe(
        catchError(
          this.handleError<Universite[]>('getUniversitesTrieesParNom', [])
        )
      );
  }

  private httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
