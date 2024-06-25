import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bloc } from '../Models/Bloc';
import { Foyer } from '../Models/Foyer';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiUrl = 'http://localhost:8081/foyer';

  constructor(private http: HttpClient) {}

  addBloc(bloc: Bloc): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/api/blocs/add-Bloc`, bloc, httpOptions)
      .pipe(catchError(this.handleError<any>('addBloc')));
  }

  deleteBloc(id: number): Observable<any> {
    const url = `${this.apiUrl}/api/blocs/remove-Bloc/${id}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError<any>('deleteBloc')));
  }

  getBlocs(): Observable<Bloc[]> {
    return this.http
      .get<Bloc[]>(`${this.apiUrl}/api/blocs/getAll`)
      .pipe(catchError(this.handleError<Bloc[]>('getBlocs', [])));
  }

  getListFoyers(): Observable<Foyer[]> {
    return this.http
      .get<Foyer[]>(`${this.apiUrl}/api/foyers/get`)
      .pipe(catchError(this.handleError<Foyer[]>('getListFoyers', [])));
  }

  findBlocById(id: number): Observable<Bloc> {
    const url = `${this.apiUrl}/api/blocs/get/${id}`;
    return this.http
      .get<Bloc>(url, httpOptions)
      .pipe(catchError(this.handleError<Bloc>('findBlocById')));
  }

  updateBloc(id: number, bloc: Bloc): Observable<any> {
    const url = `${this.apiUrl}/api/blocs/update-Bloc/${id}`;
    return this.http
      .put<any>(url, bloc, httpOptions)
      .pipe(catchError(this.handleError<any>('updateBloc')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
