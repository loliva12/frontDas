import { Pipe, PipeTransform } from '@angular/core';
import { Sucursales } from '../api/modelos/sucursales.model';
;

@Pipe({
  name: 'filtroSucursal',
  standalone: true
})
export class FiltroSucursalPipe implements PipeTransform {
  transform(sucursales: Sucursales[], searchTerm: string): Sucursales[] {
    if (!sucursales || !searchTerm) {
      return sucursales;
    }
    return sucursales.filter(sucursal =>
      sucursal.nomSucursal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
