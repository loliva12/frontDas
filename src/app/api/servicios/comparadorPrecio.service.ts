import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.developments';
import { CompararPreciosResponse } from '../modelos/comparadorPrecio.model';


@Injectable({
  providedIn: 'root'
})
export class CompararPreciosService {
  private apiUrl = `${environment.apiUrl}comparar-precios`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  obtenerComparacionPrecios(codigosBarra: string[], localidad: number): Observable<CompararPreciosResponse[]> {
    const body = { codigosBarra, localidad };
    return this.http.post<CompararPreciosResponse[]>(this.apiUrl, body, { headers: this.headers });
  }
}
