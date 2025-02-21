export interface CompararPreciosResponse {
    codBarra: string;
    nomProducto: string;
    razonSocial: string;  // Se elimina el array y se agrega razonSocial directamente
    precio: number;  
    precioMinimo: number;     // Se elimina el array y se agrega precio directamente
}

  export interface ComparacionPreciosTabla {
    nomProducto: string;
    codBarra: string;
    preciosPorSupermercado: { [razonSocial: string]: number | null };
    precioMinimo: number;
    esMasBaratoPorSupermercado: { [razonSocial: string]: boolean };
  }
  
  export interface SupermercadoTotal {
    razonSocial: string;
    totalCompra: number;
  }
  