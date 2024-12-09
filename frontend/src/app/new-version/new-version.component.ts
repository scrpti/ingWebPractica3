import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewVersionService } from './new-version.service';

@Component({
  selector: 'app-new-version',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-version.component.html',
})
export class NewVersionComponent implements OnInit {
  @Input() version!: FormGroup;
  @Output() versionCreated = new EventEmitter<string>();

  constructor(private newVersionService: NewVersionService) {}

  ngOnInit(): void {}

  crearVersion() {
    if (this.version.valid) {
      const versionData = {
        idUsuario: '673d2a12ada998325690b320', // TO-DO
        idEntrada: '674df7b1a1067f53a7b2e294', // TO-DO
        contenido: this.version.get('contenido')?.value,
      };

      this.newVersionService.createVersion(versionData).subscribe({
        next: (response) => {
          console.log('Versión creada correctamente:', response);
          this.versionCreated.emit(response.idVersion);
        },
        error: (err) => {
          console.error('Error al crear la versión:', err);
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  actualizarVersion(id: string, idUsuario: string, idEntrada: string, contenido: string) {
    const updatedVersionData = {
      idUsuario: idUsuario,
      idEntrada: idEntrada,
      contenido: contenido,
    };

    this.newVersionService.updateVersion(id, updatedVersionData).subscribe({
      next: (response) => {
        console.log('Versión actualizada correctamente:', response);
      },
      error: (err) => {
        console.error('Error al actualizar la versión:', err);
      },
    });
  }
}
