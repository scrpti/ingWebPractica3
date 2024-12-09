import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewEntradaService {
  private apiUrl = "http://localhost:8000/entradas/";

  constructor(private http: HttpClient) {}

  // Método para crear una entrada
  createEntrada(entradaData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl,entradaData,{headers}).pipe(
        catchError((error) => {
            console.error("Error en la creación de la entrada", error);
            return throwError(error);
        })
    );
  }
}
