import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenesService {

  constructor() { }
  private url: string = '';

  setUrl(url: string) {
    this.url = url;
  }

  getUrl(): string {
    return this.url;
  }
}
