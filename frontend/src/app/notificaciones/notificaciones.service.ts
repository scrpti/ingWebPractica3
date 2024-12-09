import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private apiURL = 'http://localhost:8000/notificaciones';

  constructor(private http: HttpClient) {}

  getNotificaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}`);
  }

  deleteNotificacion(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  deleteAllNotificaciones(): Observable<any> {
    return this.http.delete(`${this.apiURL}`);
  }

  markAsRead(id: string): Observable<any> {
    const body = { is_read: true };
    return this.http.put(`${this.apiURL}/${id}`, body);
  }

  markAsUnread(id: string): Observable<any> {
    const body = { is_read: false };
    return this.http.put(`${this.apiURL}/${id}`, body);
  }
}
