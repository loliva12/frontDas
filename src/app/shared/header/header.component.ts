import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../carrito-core/services/carrito.service';
import { Carrito } from '../../carrito-core/modelo/carrito';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public carritoService = inject(CarritoService);
  selectedLanguage: string = 'es'; 
  carrito: Carrito[] = []; 
  
   //Detecta el idioma actual según el puerto de la aplicación

  detectLanguage(): void {
    const currentPort = window.location.port;
    this.selectedLanguage = currentPort === '4201' ? 'en' : 'es';
  }

  
  //Cambia el idioma de la aplicación y redirige al puerto correspondiente
  changeLanguage(language: string): void {
    this.selectedLanguage = language;

    // Vaciar el carrito antes de cambiar el idioma
    this.carritoService.limpiar();

    // Determina el puerto según el idioma
    const currentHost = window.location.hostname;
    const newPort = language === 'en' ? '4201' : '4200';

    // Redirige si el puerto actual no coincide con el deseado
    if (window.location.port !== newPort) {
      window.location.href = `${window.location.protocol}//${currentHost}:${newPort}`;
    }
  }
  

}
