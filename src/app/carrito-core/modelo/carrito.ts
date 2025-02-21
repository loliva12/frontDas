import { Producto } from "../../api/modelos/producto.model";


export class Carrito {
  producto: Producto;
  cantidad: number;

  constructor(producto: Producto, cantidad: number) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}
