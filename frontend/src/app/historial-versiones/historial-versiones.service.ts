import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistorialVersionesService {
  private apiUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getVersionesByEntradaId(entradaId: string) {
    return this.http
      .get<{ versiones: any[] }>
      (`${this.apiUrl}versiones?idEntrada=${entradaId}`)
      .pipe(map((response) => response.versiones));
  }

  getEntradaById(entradaId: string) {
    return this.http.get(`${this.apiUrl}entradas/${entradaId}`);
  }

  getUsuarioById(usuarioId: string) {
    return this.http.get(`${this.apiUrl}usuarios/${usuarioId}`);
  }
}
