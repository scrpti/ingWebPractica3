import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PerfilService } from './perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {
  idUsuario: string | null = null;
  usuarioData: any;

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('id');

    if (this.idUsuario) {
      this.getUsuario();
    }
  }

  getUsuario(): void {
    if (this.idUsuario) {
      this.perfilService.getUsuario(this.idUsuario).subscribe({
        next: (data) => {
          this.usuarioData = data;
        },
        error: (err) => {
          console.error('Error al obtener los datos del usuario:', err);
        }
      });
    }
  }
}