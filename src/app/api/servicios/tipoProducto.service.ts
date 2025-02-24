
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.developments';
import { TipoProducto } from '../modelos/tipoProducto.model';

@Injectable({
  providedIn: 'root',
})
export class tipoProductoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTiposProductos(nroRubro: number, nroCategoria: number): Observable<TipoProducto[]> {
    const language = window.location.port === '4201' ? 'en' : 'es';
    console.log("Idioma seleccionado para la petición:", language);
  
    const headers = new HttpHeaders({
      'Accept-Language': language 
    });
  
    return this.http.get<TipoProducto[]>(`${this.apiUrl}catalogo/tipoProducto/${nroRubro}/${nroCategoria}`, { headers });
  }
  
}
