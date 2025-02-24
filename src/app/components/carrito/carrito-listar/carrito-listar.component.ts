import { Component, inject, OnInit } from '@angular/core';
import { AppMessageService } from '../../../core copy/services/app-message.service';
import { CarritoService } from '../../../carrito-core/services/carrito.service';
import { Carrito } from '../../../carrito-core/modelo/carrito';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-listar',
  standalone: true,
  templateUrl: './carrito-listar.component.html',
  styleUrl: './carrito-listar.component.css'
})
export class CarritoListarComponent implements OnInit {
  public carritoService = inject(CarritoService);
  public messageService = inject(AppMessageService);
  listCarrito: Carrito[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getListCarrito();
  }

  getListCarrito() {
    this.listCarrito = this.carritoService.getCarrito();
  }

  eliminarItem(index: number) {
    this.carritoService.eliminar(index);
    this.getListCarrito();

    this.messageService.showMessage({
      title: $localize`:@@productoEliminado:Producto eliminado`,
      text: $localize`:@@productoEliminadoTexto:El producto ha sido eliminado del carrito.`
    });
  }

  compararPrecios() {
    this.router.navigate(['/comparar-precios']);
  }

  limpiarCarrito() {
    this.carritoService.limpiar();
    this.getListCarrito();
    
    this.messageService.showMessage({
      title: $localize`:@@carritoVaciado:Carrito vaciado`,
      text: $localize`:@@carritoVaciadoTexto:Todos los productos han sido eliminados del carrito.`
    });
  }
  
}
