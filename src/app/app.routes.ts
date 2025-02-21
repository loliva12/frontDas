import { Routes } from '@angular/router';
import { CatalogoInicioComponent } from './components/catalogo/catalogo-inicio/catalogo-inicio.component';
import { CarritoListarComponent } from './components/carrito/carrito-listar/carrito-listar.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { ComparadorPreciosComponent } from './components/comparador-precios/comparador-precios.component';

export const routes: Routes = [
    {path: '', component: CatalogoInicioComponent},
    {path: 'carrito', component: CarritoListarComponent},
    { path: 'comparar-precios', component: ComparadorPreciosComponent},
    {path: 'sucursales', component: SucursalesComponent},
    {path: '**', pathMatch: 'full', redirectTo: ''} //redirecciona a mi ruta inicial
    
];
