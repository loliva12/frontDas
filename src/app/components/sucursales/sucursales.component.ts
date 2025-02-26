import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Provincia } from '../../api/modelos/provincia.model';
import { ProvinciaService } from '../../api/servicios/provincia.service';

import { Localidad } from '../../api/modelos/localidad.model';
import { LocalidadService } from '../../api/servicios/localidad.service';
import { Sucursales } from '../../api/modelos/sucursales.model';
import { SucursalesService } from '../../api/servicios/sucursales.service';
import { MatDialog } from '@angular/material/dialog';
import { FiltroSucursalPipe } from '../../pipes/filtro-sucursal.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-sucursales',
  standalone: true,
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
  imports: [CommonModule, MatTableModule, MatCardModule, MatSelectModule, FormsModule, FiltroSucursalPipe]
})
export class SucursalesComponent {
  displayedColumns: string[] = [
    'cuit', 
    'razonSocial', 
    'nomSucursal', 
    'calle', 
    'nroCalle', 
    'telefonos', 
    'serviciosDisponibles', 
    'horarioSucursal'
  ];
  
  sucursales: Sucursales[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  selectedProvincia?: string; 
  selectedLocalidad?: string; 
  sucursalSeleccionada: any = null;
  searchTerm: string = '';
  
  constructor(
    private sucursalesService: SucursalesService,
    private provinciaService: ProvinciaService,
    private localidadesService: LocalidadService,
    private dialog: MatDialog
  ) {
    this.provinciaService.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
  }

  onProvinciaChange() {
    console.log('Provincia seleccionada:', this.selectedProvincia); // Depuración
    if (this.selectedProvincia) {
      this.localidadesService.getLocalidades(this.selectedProvincia).subscribe(
        (data) => {
          console.log('Localidades recibidas:', data); // Depuración
          this.localidades = data;
        },
        (error) => {
          console.error('Error al obtener localidades:', error);
        }
      );
    }
  }

  onLocalidadChange() {
    console.log('Localidad seleccionada:', this.selectedLocalidad); // Depuración
    if (this.selectedProvincia && this.selectedLocalidad) {
      this.sucursalesService.getSucursales(this.selectedProvincia, this.selectedLocalidad).subscribe(
        (data) => {
          console.log('Sucursales recibidas:', data); // Depuración
          this.sucursales = data;
        },
        (error) => {
          console.error('Error al obtener sucursales:', error);
        }
      );
    }
  }

  abrirModal(sucursal: any) {
    this.sucursalSeleccionada = { ...sucursal };
  
    console.log('HorarioSucursal (antes de parsear):', this.sucursalSeleccionada.horarioSucursal);
  
    // Verificar si `horarioSucursal` es un string y hacer el parseo si es necesario
    if (typeof this.sucursalSeleccionada.horarioSucursal === 'string') {
      try {
        // Intentar parsear si es un string
        this.sucursalSeleccionada.horarioSucursal = JSON.parse(this.sucursalSeleccionada.horarioSucursal);
        console.log('HorarioSucursal (después de parsear):', this.sucursalSeleccionada.horarioSucursal);
      } catch (error) {
        console.error('Error al parsear horarioSucursal:', error);
        this.sucursalSeleccionada.horarioSucursal = [];
      }
    }

    console.log('TiposServicios (antes de parsear):', this.sucursalSeleccionada.serviciosDisponibles);

  // Parsear tipos_servicios si es un string
  if (typeof this.sucursalSeleccionada.serviciosDisponibles === 'string') {
    try {
      this.sucursalSeleccionada.serviciosDisponibles = JSON.parse(this.sucursalSeleccionada.serviciosDisponibles);
      console.log('TiposServicios (después de parsear):', this.sucursalSeleccionada.serviciosDisponibles);
    } catch (error) {
      console.error('Error al parsear tipos_servicios:', error);
      this.sucursalSeleccionada.serviciosDisponibles = [];
    }
  }

  // Verifica si tienes datos después de la asignación
  console.log('Sucursal seleccionada:', this.sucursalSeleccionada);

    // Mostrar el modal
    let modal = new bootstrap.Modal(document.getElementById('sucursalModal'));
    modal.show();
  }

}
