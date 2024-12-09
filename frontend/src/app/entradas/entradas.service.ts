import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EntradasService {
  private apiUrl = "http://localhost:8000/entradas/";

  constructor(private http: HttpClient) {}

  getEntradas(wikiId: string): Observable<any[]> {
    return this.http
      .get<{ entradas: any[] }>(this.apiUrl + "?idWiki=" + wikiId)
      .pipe(map((response) => response.entradas));
  }

  getWikiName(wikiId: string): Observable<any> {
    return this.http.get("http://localhost:8000/wikis/" + wikiId);
  }

  deleteEntrada(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
