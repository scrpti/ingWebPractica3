import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  private apiUrl = "http://localhost:8000/valoraciones/";

  constructor(private http: HttpClient) { }

  getValoraciones(params: { [key: string]: any }): Observable<any[]> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<any>(this.apiUrl, { params: httpParams }).pipe(
      map((response) => response.valoraciones || [])
    );
  }

  createValoracion(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  updateValoracion(id: string, nota: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}`, { nota });
  }
}
