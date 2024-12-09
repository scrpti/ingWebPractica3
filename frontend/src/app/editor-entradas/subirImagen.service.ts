import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubirImagenesService {
  private apiUrl = "http://localhost:8000/archivos/subir";

  constructor(private http: HttpClient) { }

  subirImagen(file: File): Observable<any> {
    const body = new FormData();
    body.append("archivo", file);
    return this.http.post(this.apiUrl, body);
  }
}
