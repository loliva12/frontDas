import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../api/modelos/producto.model';

@Pipe({
  name: 'filterProducts',
  standalone: true,
  pure: false // Se actualizará automáticamente cuando cambie la lista
})
export class FilterProductsPipe implements PipeTransform {
  transform(productos: Producto[], searchText: string): Producto[] {
    if (!productos || !searchText) {
      return productos;
    }
    return productos.filter(producto =>
      producto.nom_producto.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
