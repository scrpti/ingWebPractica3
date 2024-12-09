import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewWikiService {
  private apiUrl = "http://localhost:8000/wikis/";

  constructor(private http: HttpClient) {}

  createWiki(wikiData: any): Observable<any> {
    console.log("URL de la API: ", this.apiUrl);
    console.log(wikiData);
     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl,wikiData,{headers});
  }
}