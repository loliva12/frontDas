export interface CompararPreciosResponse {
  codBarra: string;
  nomProducto: string;
  razonSocial: string;  
  precio: number;  
  precioMinimo: number; 
  imagen: string;
  supermercadoMasBarato?: string;  
  cod_barra_prod_sustituto: string | null;
  nombre_producto_sustituto: string; 
  precio_producto_sustituto: string; 

}

export interface ComparacionPreciosTabla {
  nomProducto: string;
  codBarra: string;
  imagen: string; 
  preciosPorSupermercado: { [razonSocial: string]: number | null };
  precioMinimo: number;
  esMasBaratoPorSupermercado: { [razonSocial: string]: boolean };
  sustituto?: Sustituto | null; 
}

export interface SupermercadoTotal {
  razonSocial: string;
  totalCompra: number | null; 
  
}

export interface Sustituto {
  cod_barra_prod_sustituto: string; 
  nombre_producto_sustituto: string;
  precio_producto_sustituto: string; 
}

