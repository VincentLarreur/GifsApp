import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'wJ1YYLKDYn9QEJ0sMvBZvrdhJEJ3YMyv';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs/search';

  private _historial: string[] = [];

  private _resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  get resultados() {
    return [...this._resultados];
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this._resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs( query: string ) {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', query);

    this.http.get<SearchGIFResponse>(this.apiUrl, { params })
      .subscribe( (resp) => {
        this._resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this._resultados));
      });
  }
}
