import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.developments';
import { Rubro } from '../modelos/rubros.model';


@Injectable({ providedIn: 'root' })
export class RubroService {
  private apiUrl = `${environment.apiUrl}catalogo/rubros`;

  constructor(private http: HttpClient) {}

  getRubro(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(this.apiUrl);
  }
}
