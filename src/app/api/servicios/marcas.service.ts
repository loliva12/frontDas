
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.developments';
import { Marca } from '../modelos/marca.model';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMarcas(nroTipoProducto: number): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.apiUrl}catalogo/marca/${nroTipoProducto}`);
  }
}
