import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Provincia } from '../../api/modelos/provincia.model';
import { Localidad } from '../../api/modelos/localidad.model';
import { ProvinciaService } from '../../api/servicios/provincia.service';
import { LocalidadService } from '../../api/servicios/localidad.service';
import { CarritoService } from '../../carrito-core/services/carrito.service';
import { CompararPreciosService } from '../../api/servicios/comparadorPrecio.service';
import { ComparacionPreciosTabla, CompararPreciosResponse, SupermercadoTotal } from '../../api/modelos/comparadorPrecio.model';

declare var bootstrap: any;  // Importa bootstrap para controlar la modal desde el TS

@Component({
  selector: 'app-comparador-precios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comparador-precios.component.html',
  styleUrl: './comparador-precios.component.css'
})
export class ComparadorPreciosComponent implements OnInit {
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  selectedProvincia: string = '';  
  selectedLocalidad?: number; 
  supermercadoMasBarato: string = '';
  comparacionPreciosTabla: ComparacionPreciosTabla[] = [];
  supermercados: string[] = [];
  totalPorSupermercado: SupermercadoTotal[] = [];
  minTotal: number = 0;

  constructor(
    private provinciaService: ProvinciaService,
    private localidadesService: LocalidadService,
    private compararPreciosService: CompararPreciosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // Recuperar datos de sessionStorage
    const provinciaGuardada = sessionStorage.getItem('selectedProvincia');
    const localidadGuardada = sessionStorage.getItem('selectedLocalidad');
  
    if (provinciaGuardada) {
      this.selectedProvincia = provinciaGuardada;
      this.localidadesService.getLocalidades(this.selectedProvincia).subscribe((data) => {
        this.localidades = data;
      });
    }
  
    if (localidadGuardada) {
      this.selectedLocalidad = Number(localidadGuardada);
    }
  
    // Si ya hay datos guardados, no mostrar el modal
    if (!provinciaGuardada || !localidadGuardada) {
      const modal = new bootstrap.Modal(document.getElementById('modalSeleccion')!, {});
      modal.show();
    } else {
      this.obtenerComparacion();
    }
  
    // Cargar provincias
    this.provinciaService.getProvincias().subscribe((data) => {
      console.log("Provincias recibidas:", data);
      this.provincias = data;
    });
  }
  

  onProvinciaChange() {
    console.log('Provincia seleccionada:', this.selectedProvincia);
    this.selectedLocalidad = undefined;  
    this.comparacionPreciosTabla = [];  
  
    if (this.selectedProvincia) {
      // Guardar en sessionStorage
      sessionStorage.setItem('selectedProvincia', this.selectedProvincia);
  
      this.localidadesService.getLocalidades(this.selectedProvincia).subscribe(
        (data) => {
          console.log('Localidades recibidas:', data);
          this.localidades = data;
        },
        (error) => {
          console.error('Error al obtener localidades:', error);
        }
      );
    }
  }

  onLocalidadSeleccionada(event: Event) {
    const target = event.target as HTMLSelectElement;
    const localidadId = Number(target.value);
    console.log('Localidad seleccionada:', localidadId);
  
    if (!isNaN(localidadId)) {
      this.selectedLocalidad = localidadId;
      // Guardar en sessionStorage
      sessionStorage.setItem('selectedLocalidad', localidadId.toString());
    }
  }

  onModalClose() {
    const modalElement = document.getElementById('modalSeleccion');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  
    this.obtenerComparacion();
  }
  

  obtenerComparacion() {
    if (this.selectedLocalidad === undefined) {
      console.warn("No se seleccionó una localidad.");
      return;
    }
  
    const productosCarrito = this.carritoService.getCarrito().map(item => item.producto.codBarra);
    console.log("Productos en el carrito:", productosCarrito);
  
    this.compararPreciosService.obtenerComparacionPrecios(productosCarrito, this.selectedLocalidad).subscribe(data => {
      console.log("Datos recibidos del servicio:", data);
  
      if (!data || data.length === 0) {
        console.warn("El servicio no devolvió datos.");
        return;
      }
  
      this.comparacionPreciosTabla = this.transformarComparacion(data);
  
      // Extraer supermercados únicos
      this.supermercados = [...new Set(data.map(item => item.razonSocial))];
  
      // Aquí buscamos el supermercado más barato entre todos
      const supermercadoMasBaratoData = data.find(item => item.supermercadoMasBarato === "1");
  
      if (supermercadoMasBaratoData) {
        // Asignar el supermercado más barato (razonSocial)
        this.supermercadoMasBarato = supermercadoMasBaratoData.razonSocial;
      } else {
        console.warn("No se encontró un supermercado más barato.");
      }
  
      this.calcularTotales();
    });
  }
  
  

  transformarComparacion(datos: CompararPreciosResponse[]): ComparacionPreciosTabla[] {
    const productosMap = new Map<string, ComparacionPreciosTabla>();

    datos.forEach((item) => {
        if (!productosMap.has(item.codBarra)) {
            productosMap.set(item.codBarra, {
                nomProducto: item.nomProducto,
                codBarra: item.codBarra,
                imagen: item.imagen, 
                preciosPorSupermercado: {},
                precioMinimo: item.precio, 
                esMasBaratoPorSupermercado: {} 
            });
        }

        const producto = productosMap.get(item.codBarra)!;
        producto.preciosPorSupermercado[item.razonSocial] = item.precio;

        // Verificar y actualizar el precio mínimo
        if (item.precio < producto.precioMinimo) {
            producto.precioMinimo = item.precio;
        }
    });

    // Marcar el precio más barato en cada supermercado
    productosMap.forEach((producto) => {
        Object.keys(producto.preciosPorSupermercado).forEach((supermercado) => {
            producto.esMasBaratoPorSupermercado[supermercado] = 
                producto.preciosPorSupermercado[supermercado] === producto.precioMinimo;
        });
    });

    return Array.from(productosMap.values());
}

calcularTotales() {
  console.log("Calculando totales por supermercado...");
  this.totalPorSupermercado = this.supermercados.map((supermercado) => {
    const totalCompra = this.comparacionPreciosTabla.reduce(
      (acc, prod) => acc + (prod.preciosPorSupermercado[supermercado] || 0),
      0
    );
    return { razonSocial: supermercado, totalCompra };
  });

  console.log("Supermercado más barato:", this.supermercadoMasBarato);
}

getNombreLocalidad(localidadId?: number): string {
  if (!localidadId) return 'No seleccionada';

  const localidad = this.localidades.find(loc => Number(loc.nroLocalidad) === localidadId);
  return localidad ? localidad.nomLocalidad : 'Desconocida';
}

getNombreProvincia(provinciaId?: string): string {
  if (!provinciaId) return 'No seleccionada';

  const provincia = this.provincias.find(prov => Number(prov.codProvincia) === Number(provinciaId));
  return provincia ? provincia.nomProvincia : 'Desconocida';
}





}
