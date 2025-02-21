import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Producto } from '../api/modelos/producto.model';

@Pipe({
  name: 'filterDropdowns',
  standalone: true, // ✅ Pipe independiente
})
@Injectable({ providedIn: 'root' }) // ✅ Permite inyección automática
export class FilterDropdownsPipe implements PipeTransform {
  transform(
    productos: Producto[],
    rubro?: number,
    categoria?: number,
    tipoProducto?: number,
    searchText?: string
  ): Producto[] {
    return productos.filter(p =>
      (!rubro || p.nro_rubro === rubro) &&
      (!categoria || p.nro_categoria === categoria) &&
      (!tipoProducto || p.nro_tipo_producto=== tipoProducto) &&
      (!searchText || p.nom_producto.toLowerCase().includes(searchText.toLowerCase()))
    );
  }
}
