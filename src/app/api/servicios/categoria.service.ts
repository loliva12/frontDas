import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.developments';
import { Categoria } from '../modelos/categoria.modelo';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}catalogo/categoria/`;

  constructor(private http: HttpClient) {}

  getCategoria(nroRubro: number): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}${nroRubro}`);
  }
}
