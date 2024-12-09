import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ValoracionesService } from './valoraciones.service';
import { UsuarioService } from '../usuario/usuario.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valoraciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valoraciones.component.html'
})
export class ValoracionesComponent implements OnInit {
  @Input() idUsuario: string | null = null;
  @Output() reputacionMediaCalculada: EventEmitter<number> = new EventEmitter<number>();
  valoraciones: any[] = [];
  reputacionMedia: number = 0;

  constructor(
    private valoracionesService: ValoracionesService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    if (this.idUsuario) {
      this.obtenerValoraciones();
    }
  }

  obtenerValoraciones(): void {
    if (this.idUsuario) {
      this.valoracionesService.getValoraciones(({ idUsuarioValorado: this.idUsuario })).subscribe({
        next: (valoraciones) => {
          this.valoraciones = valoraciones;

          this.calcularReputacionMedia();

          this.reputacionMediaCalculada.emit(this.reputacionMedia);

          const usuariosObservables = this.valoraciones.map((valoracion) =>
            this.usuarioService.getUsuario(valoracion.idUsuarioRedactor)
          );

          forkJoin(usuariosObservables).subscribe({
            next: (usuarios) => {
              this.valoraciones.forEach((valoracion, index) => {
                valoracion.nombreRedactor = usuarios[index].name;
              });
            },
            error: (err) => {
              console.error('Error al obtener los usuarios:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener las valoraciones:', err);
        }
      });
    }
  }

  calcularReputacionMedia(): void {
    if (this.valoraciones.length > 0) {
      const totalNotas = this.valoraciones.reduce((total, valoracion) => total + valoracion.nota, 0);
      this.reputacionMedia = totalNotas / this.valoraciones.length;
    }
  }

  getEstrellas(nota: number): string[] {
    const completo = Array(nota).fill('fas fa-star');
    const vacio = Array(5 - nota).fill('far fa-star');
    return [...completo, ...vacio];
  }
}