import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValoracionesService } from '../valoraciones/valoraciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-valoracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-valoracion.component.html',
})
export class NewValoracionComponent {
  @Input() idUsuarioValorado!: string;
  @Output() valoracionCreada = new EventEmitter<any>();

  valoracionForm: FormGroup;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder, private valoracionesService: ValoracionesService) {
    this.valoracionForm = this.fb.group({
      idUsuarioRedactor: ['67531570f5f5e7e16350da50', Validators.required],
      idUsuarioValorado: ['', Validators.required],
      nota: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnChanges(): void {
    if (this.idUsuarioValorado) {
      this.valoracionForm.patchValue({ idUsuarioValorado: this.idUsuarioValorado });
    }
  }

  setNota(nota: number): void {
    this.valoracionForm.patchValue({ nota });
  }

  enviarValoracion(): void {
    if (this.valoracionForm.valid) {
      const valoracion = this.valoracionForm.value;

      this.valoracionesService.getValoraciones({
        idUsuarioRedactor: valoracion.idUsuarioRedactor,
        idUsuarioValorado: valoracion.idUsuarioValorado,
      }).subscribe({
        next: (valoraciones) => {
          if (valoraciones.length > 0) {
            const valoracionExistente = valoraciones[0];
            if (confirm("Ya has realizado una valoración a este usuario. ¿Quieres actualizarla?")) {
              this.valoracionesService.updateValoracion(valoracionExistente.id, valoracion.nota).subscribe({
                next: () => {
                  this.valoracionCreada.emit(valoracion);
                  this.resetFormulario();
                },
                error: (err) => {
                  console.error("Error al actualizar la valoración:", err);
                  this.mensajeError = err.error?.detail || "Error desconocido";
                },
              });
            }
          } else {
            this.valoracionesService.createValoracion(valoracion).subscribe({
              next: () => {
                this.valoracionCreada.emit(valoracion);
                this.resetFormulario();
              },
              error: (err) => {
                console.error("Error al crear la valoración:", err);
                this.mensajeError = err.error?.detail || "Error desconocido";
              },
            });
          }
        },
        error: (err) => {
          console.error("Error al obtener valoraciones:", err);
          this.mensajeError = "Error al verificar si la valoración ya existe.";
        },
      });
    } else {
      this.mensajeError = "Por favor, completa todos los campos correctamente.";
    }
  }

  private resetFormulario(): void {
    this.valoracionForm.controls['nota'].setValue(0);
    this.valoracionForm.enable();
    this.mensajeError = null;
  }
}