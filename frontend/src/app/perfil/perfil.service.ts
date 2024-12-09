import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PerfilService {
  private apiUrl = "http://localhost:8000/usuarios/";

  constructor(private http: HttpClient) {}

  // Método para obtener un usuario por su id
  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  //Metodo para editar un usuario
  editUsuario(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, data);
  }

  // Método para eliminar un usuario
  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}

