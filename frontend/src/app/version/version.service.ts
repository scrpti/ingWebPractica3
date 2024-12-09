import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VersionService {
  private apiUrl = "http://localhost:8000/versiones/";

  constructor(private http: HttpClient) { }

  getVersionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  deleteVersionesByIdEntrada(idEntrada: string): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const body = { idEntrada };
    return this.http.delete(this.apiUrl, { headers, body }).pipe(
      catchError((error) => {
        console.error("Error al crear la versión", error);
        return throwError(() => error);
      }),
    );
  }
  obtenerUltimaVersion(idEntrada: string): Observable<any> {
    const url = "http://localhost:8000/entradas/";
    return this.http.get<{ versiones: any[] }>(
      url + idEntrada + "/last-version",
    );
  }
}

