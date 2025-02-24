import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.developments';
import { Categoria } from '../modelos/categoria.modelo';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}catalogo/categoria/`;

  constructor(private http: HttpClient) {}

  getCategoria(nroRubro: number): Observable<Categoria[]> {
    const language = window.location.port === '4201' ? 'en' : 'es';
        console.log("Idioma seleccionado para la petición:", language);
      
        const headers = new HttpHeaders({
          'Accept-Language': language 
        });
      
        return this.http.get<Categoria[]>(`${this.apiUrl}${nroRubro}`, { headers });

  }
}
