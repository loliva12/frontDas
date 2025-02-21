import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { Producto } from '../../../api/modelos/producto.model';
import { ProductosService } from '../../../api/servicios/productos.service';
import { AppMessageService } from '../../../core copy/services/app-message.service';
import { FilterProductsPipe } from '../../../pipes/filter-products.pipe';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../carrito-core/services/carrito.service';
import { Rubro } from '../../../api/modelos/rubros.model';
import { RubroService } from '../../../api/servicios/rubros.service';
import { CategoriaService } from '../../../api/servicios/categoria.service';
import { Categoria } from '../../../api/modelos/categoria.modelo';
import { tipoProductoService } from '../../../api/servicios/tipoProducto.service';
import { TipoProducto } from '../../../api/modelos/tipoProducto.model';
import { ListadoProductos } from '../../../api/modelos/listadoProductos.model';
import { MarcasService } from '../../../api/servicios/marcas.service';
import { Marca } from '../../../api/modelos/marca.model';

@Component({
  selector: 'app-catalogo-inicio',
  standalone: true,
  imports: [FilterProductsPipe, FormsModule, NgFor,],
  templateUrl: './catalogo-inicio.component.html',
  styleUrls: ['./catalogo-inicio.component.css'] 
})
export class CatalogoInicioComponent implements OnInit {
  private productosService = inject(ProductosService);
  private carritoService = inject(CarritoService);
  private messageService = inject(AppMessageService); 
  private rubroService = inject(RubroService);
  private categoriaService = inject(CategoriaService);
  private tipoProdService = inject(tipoProductoService);
  private marcasService = inject(MarcasService);
 
  productos: Producto[] = [];
  rubro: Rubro[] = [];
  productosFiltrados: Producto[] = [];
  categorias: Categoria[] = [];
  tiposProductos: TipoProducto[] = [];
  marcas: Marca[] = [];

  searchText: string = '';
  selectedRubro: number | null = null;
  selectedCategoria: number | null = null;
  selectedTipoProducto: number | null = null;
  selectedMarca: number | null = null; 


  ngOnInit(): void {
    this.productosFiltrados = [...this.productos]; 
    this.getProductos();
    this.getRubros();
  }

  constructor() {
    this.productosFiltrados = [...this.productos]; 
  }

  getProductos(nroRubro?: number, nroCategoria?: number, nroTipoProducto?: number) {
    this.productosService.obtenerProductos().subscribe({
      next: (data: any) => { 
        console.log("Respuesta de la API:", data);
        this.productos = data; 
        this.productosFiltrados = [...this.productos]; // 🔥 Ahora se mostrarán todos los productos al inicio
      },
      error: (e) => {
        console.error("Error al obtener productos:", e);
      }
    });
  }
  

  aplicarFiltros() {
    if (this.selectedRubro === null && this.selectedCategoria === null && 
      this.selectedTipoProducto === null && this.selectedMarca === null && 
      this.searchText.trim() === '') {
      this.productosFiltrados = [...this.productos]; // Mostrar todos los productos
      return;
    }
    this.productosFiltrados = this.productos.filter(producto => {    
      const selectedRubroNumber = Number(this.selectedRubro);
      const cumpleFiltroRubro = this.selectedRubro === null || producto.nro_rubro === selectedRubroNumber;

      const selectedCategoriaNumber = Number(this.selectedCategoria);
      const cumpleFiltroCategoria = this.selectedCategoria === null  || producto.nro_categoria === selectedCategoriaNumber;

      const selectedTipoProductoNumber = Number(this.selectedTipoProducto);
      const cumpleFiltroTipoProducto = this.selectedTipoProducto === null || producto.nro_tipo_producto === selectedTipoProductoNumber;
      
      const selectedMarcaNumber = Number(this.selectedMarca);
      const cumpleFiltroMarca = this.selectedMarca === null || producto.nro_marca === selectedMarcaNumber;

      const cumpleFiltroTexto = !this.searchText || producto.nom_producto.toLowerCase().includes(this.searchText.toLowerCase());
    
      return cumpleFiltroRubro && cumpleFiltroCategoria && cumpleFiltroTipoProducto && cumpleFiltroTexto && cumpleFiltroMarca;
    });
    
  }

  getRubros() {
    this.rubroService.getRubro().subscribe({
      next: (data: Rubro[]) => {
        console.log("Rubros obtenidos:", data);
        this.rubro = data;
      },
      error: (e) => console.error("Error al obtener rubros:", e)
    });
    
  }
  
  onRubroChange() {
    this.selectedCategoria = null;
    this.selectedTipoProducto = null;
    this.selectedMarca = null;
  
    if (this.selectedRubro === null) {
      this.productosFiltrados = [...this.productos]; 
      this.categorias = [];
      this.tiposProductos = [];
      this.marcas = [];
    } else {
      this.getCategorias(this.selectedRubro);
    }
    
    this.aplicarFiltros();
  }
  
  

  getCategorias(codRubro: number) {
    this.categoriaService.getCategoria(codRubro).subscribe({
      next: (data) => {
        console.log('Categorías obtenidas:', data);
        this.categorias = data;
      },
      error: (e) => console.error('Error al obtener categorías:', e),
    });
  }

  onCategoriaChange() {
    this.selectedTipoProducto = null;
    this.selectedMarca = null;
  
    if (this.selectedCategoria === null) {
      this.productosFiltrados = [...this.productos]; // Restaurar todos los productos
      this.tiposProductos = [];
      this.marcas = [];
    } else {
      this.getTipoProducto(this.selectedRubro!, this.selectedCategoria);
    }
  
    this.aplicarFiltros();
  }
  
  

  getTipoProducto(codRubro: number, nroCategoria: number) {
    this.tipoProdService.getTiposProductos(codRubro, nroCategoria).subscribe({
      next: (data) => {
        console.log('Categorías obtenidas:', data);
        this.tiposProductos = data;
      },
      error: (e) => console.error('Error al obtener categorías:', e),
    });
  }

  onTipoProductoChange() {
    this.selectedMarca = null; // Se borra la marca al cambiar de tipo de producto
  
    if (this.selectedTipoProducto === null) {
      this.productosFiltrados = [...this.productos]; // Restaurar todos los productos
      this.marcas = [];
    } else {
      this.getMarcas(this.selectedTipoProducto);
    }
  
    this.aplicarFiltros();
  }
  

getMarcas(nroTipoProducto: number) {
  this.marcasService.getMarcas(nroTipoProducto).subscribe({
    next: (data) => {
      console.log('Marcas obtenidas:', data);
      this.marcas = data;
    },
    error: (e) => console.error('Error al obtener marcas:', e),
  });
}

onMarcaChange() {
  if (this.selectedMarca === null) {
    this.productosFiltrados = [...this.productos]; // Restaurar todos los productos
  }

  this.aplicarFiltros();
}

  
  agregarAlCarrito(item: Producto) {
    this.carritoService.agregar(item, 1);
    console.log('Carrito actualizado:', this.carritoService.getCarrito());

    this.messageService.showMessage({
      title: 'Producto agregado',
      text: `${item.nom_producto} se ha agregado al carrito.`
    });
  }

  estaEnCarrito(item: Producto): boolean {
    return this.carritoService.getCarrito().some(p => p.producto.codBarra === item.codBarra);
  }

  
  
}
