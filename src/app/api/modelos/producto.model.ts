import { Categoria } from "./categoria.modelo";
import { Rubro } from "./rubros.model";
import { TipoProducto } from "./tipoProducto.model";

export interface Producto {
    codBarra: string;
    nom_producto: string;
    imagen: string;
    nom_marca: string; 
    nro_rubro: number;
    nro_categoria: number;
    nro_tipo_producto: number;
    nro_marca: number;
}
  