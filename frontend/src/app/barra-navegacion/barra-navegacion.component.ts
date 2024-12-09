import { Component } from '@angular/core';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component.js';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [NotificacionesComponent],
  templateUrl: './barra-navegacion.component.html'
})
export class BarraNavegacionComponent {
  usuarioEnSesion() {
    return true;
  }

  usuarioEsAdmin() {
    return true;
  }
}
