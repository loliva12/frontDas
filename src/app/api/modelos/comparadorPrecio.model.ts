export interface CompararPreciosResponse {
  codBarra: string;
  nomProducto: string;
  razonSocial: string;  
  precio: number;  
  precioMinimo: number; 
  imagen: string;
  supermercadoMasBarato?: string;  
}

export interface ComparacionPreciosTabla {
  nomProducto: string;
  codBarra: string;
  imagen: string; 
  preciosPorSupermercado: { [razonSocial: string]: number | null };
  precioMinimo: number;
  esMasBaratoPorSupermercado: { [razonSocial: string]: boolean };
}

export interface SupermercadoTotal {
  razonSocial: string;
  totalCompra: number | null; 
}
