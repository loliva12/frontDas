import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.developments';
import { ListadoProductos } from '../modelos/listadoProductos.model';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = `${environment.apiUrl}catalogo/productos`;

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<ListadoProductos> {
    return this.http.get<ListadoProductos>(this.apiUrl);
  }
}