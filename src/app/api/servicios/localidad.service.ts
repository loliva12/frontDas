import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.developments';
import { Localidad } from '../modelos/localidad.model';


@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLocalidades(codProvincia: string): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(`${this.apiUrl}ubicaciones/localidades/${codProvincia}`);
  }
}
