import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-filter-entradas",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./filter-entradas.component.html"
})
export class FilterEntradasComponent {
  filtro = {
    nombre: "",
    autor: "",
    fechaCreacion: "",
  };

  @Output()
  filtroAplicado = new EventEmitter<any>();

  handleEntradasFilter(): void {
    this.filtroAplicado.emit(this.filtro);
  }

  resetFilters(): void {
    this.filtro = {
      nombre: "",
      autor: "",
      fechaCreacion: "",
    };
    this.handleEntradasFilter();
  }

  onEnter(event: any): void {
    event.preventDefault();
    this.handleEntradasFilter();
  }
}
