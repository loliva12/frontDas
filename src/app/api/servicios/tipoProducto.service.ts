
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.developments';
import { TipoProducto } from '../modelos/tipoProducto.model';

@Injectable({
  providedIn: 'root',
})
export class tipoProductoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTiposProductos(nroRubro: number, nroCategoria: number): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(`${this.apiUrl}catalogo/tipoProducto/${nroRubro}/${nroCategoria}`);
  }
}
