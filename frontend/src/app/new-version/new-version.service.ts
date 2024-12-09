import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewVersionService {
  private apiUrl = "http://localhost:8000/versiones/";

  constructor(private http: HttpClient) {}

  // Método para crear una versión
  createVersion(versionData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl,versionData,{headers}).pipe(
        catchError((error) => {
            console.error("Error al crear la versión", error);
            return throwError(() => error);
        })
    );
  }

  // Método para actualizar una versión
  updateVersion(id: string, versionData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}${id}`,versionData,{headers}).pipe(
        catchError((error) => {
            console.error("Error al actualizar la versión", error);
            return throwError(() => error);
        })
    );
  }
}
