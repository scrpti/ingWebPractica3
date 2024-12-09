import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton-editar',
  standalone: true,
  templateUrl: './boton-editar.component.html',
  styleUrls: ['./boton-editar.component.scss']
})
export class BotonEditarComponent {
  // Texto del botón (opcional, permite personalización)
  @Input() texto: string = 'Editar';

  // Evento que se emite cuando el botón es clicado
  @Output() editar: EventEmitter<void> = new EventEmitter<void>();

  // Método que se ejecuta al hacer clic
  onClick(): void {
    console.log('Botón Editar clicado');
    this.editar.emit(); // Emite el evento al componente padre
  }
}
