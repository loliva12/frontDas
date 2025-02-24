import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.developments';
import { Rubro } from '../modelos/rubros.model';


@Injectable({ providedIn: 'root' })
export class RubroService {
  private apiUrl = `${environment.apiUrl}catalogo/rubros`;

  constructor(private http: HttpClient) {}

  getRubro(): Observable<Rubro[]> {
    const language = window.location.port === '4201' ? 'en' : 'es';
    console.log("Idioma seleccionado para la petición:", language);
  
    const headers = new HttpHeaders({
      'Accept-Language': language 
    });
  
    return this.http.get<Rubro[]>(this.apiUrl, { headers });
  }
  
}
