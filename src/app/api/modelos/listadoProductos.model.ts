import { Producto } from "./producto.model";

export interface ListadoProductos {
    productos: Producto[];
    totalCount: number;
}