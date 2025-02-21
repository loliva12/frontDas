import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.developments';
import { Sucursales } from '../modelos/sucursales.model';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSucursales(codProvincia: string, nroLocalidad: string): Observable<Sucursales[]> {
    return this.http.get<Sucursales[]>(`${this.apiUrl}ubicaciones/supermercadossucursales/${codProvincia}/${nroLocalidad}`);
  }
}
