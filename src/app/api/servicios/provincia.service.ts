import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.developments';

import { Provincia } from '../modelos/provincia.model';

@Injectable({ providedIn: 'root' })
export class ProvinciaService {
  private apiUrl = `${environment.apiUrl}ubicaciones/provincias`;

  constructor(private http: HttpClient) {}

  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.apiUrl);
  }
}
