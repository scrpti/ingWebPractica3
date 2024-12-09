import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-busqueda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barra-busqueda.component.html'
})
export class BarraBusquedaComponent {
  textoBusqueda: string = '';
  private timeoutBusqueda: any;

  @Output() busqueda = new EventEmitter<string>();

  onSearchChange() {
    if (this.timeoutBusqueda) {
      clearTimeout(this.timeoutBusqueda);
    }

    this.timeoutBusqueda = setTimeout(() => {
      this.busqueda.emit(this.textoBusqueda);
    }, 250);
  }
}
