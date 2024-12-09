import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EntradaService {
  private apiUrl = "http://localhost:8000/entradas/";

  constructor(private http: HttpClient) {}

  getEntradaById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }
}
