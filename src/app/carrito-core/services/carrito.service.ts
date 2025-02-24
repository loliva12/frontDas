import { Injectable } from '@angular/core';
import { Carrito } from '../modelo/carrito';
import { Producto } from '../../api/modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listCarrito : Carrito[] = [];

  getCarrito(){
    this.obtenerSession();
    return this.listCarrito;
  }

  agregar(producto : Producto, cantidad : number = 1){
    this.obtenerSession();
    const index = this.listCarrito.findIndex(item => item.producto.codBarra == producto.codBarra); 

    if (index == -1){
        const item = new Carrito(producto, cantidad); 
        this.listCarrito.push(item);
    } else {
        this.actualizar(index, this.listCarrito[index].cantidad + cantidad);
    }

    this.guardarSession();
}


  actualizar(index: number, cantidad: number){
    if(index >= 0 && index < this.listCarrito.length ){
      this.listCarrito[index].cantidad = cantidad; 
      this.guardarSession();
    }
  }

  cantidad(){
    this.obtenerSession();
    return this.listCarrito.length;
  }

  eliminar(index:number){
    if(index >= 0 && index < this.listCarrito.length ){
      this.listCarrito.splice(index, 1);
      this.guardarSession();
    }
  }

  guardarSession(){
    sessionStorage.setItem('carrito', JSON.stringify(this.listCarrito));
  }

  obtenerSession(){
    this.listCarrito = [];
     if(typeof window != 'undefined' && window.sessionStorage){
      const carrito = sessionStorage.getItem('carrito');
      if(carrito != null){
        this.listCarrito = JSON.parse(carrito)
      }
     }
  }

  obtenerProductosParaComparacion() {
    this.obtenerSession(); 
    return this.listCarrito.map(item => ({
      codBarra: item.producto.codBarra,
      nomProducto: item.producto.nom_producto
    }));
  }

  limpiar() {
    this.listCarrito = [];
    this.guardarSession();
  }
  
  
  constructor() { }
}
