import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificacionesService } from './notificaciones.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  imports: [CommonModule],
})
export class NotificacionesComponent implements OnInit {
  notificaciones: any[] = [];
  notificacionesFiltradas: any[] = [];
  notificacionesSinLeer: number = 0;
  mostrarDesplegable: boolean = false;
  filtroActual: string = 'todas';
  private routerSubscription: Subscription;

  constructor(
    private notificacionesService: NotificacionesService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarDesplegable = false;
      }
    });
  }

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  cargarNotificaciones(): void {
    this.notificacionesService.getNotificaciones().subscribe((data) => {
      const notificaciones = data.notifications;
      if (!notificaciones) {
        return;
      }
      this.notificaciones = notificaciones.sort(
        (a: any, b: any) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
      this.notificacionesSinLeer = this.notificaciones.filter(
        (n: any) => !n.is_read,
      ).length;
      this.notificacionesFiltradas = this.notificaciones;
    });
  }

  toggleDesplegable(): void {
    this.mostrarDesplegable = !this.mostrarDesplegable;
    if (this.mostrarDesplegable) {
      if (this.notificacionesSinLeer > 0) {
        this.filtroActual = 'pendientes';
      } else {
        this.filtroActual = 'todas';
      }
      this.filtrarNotificaciones(this.filtroActual);
    }
  }

  filtrarNotificaciones(filtro: string): void {
    this.filtroActual = filtro;
    if (filtro === 'todas') {
      this.notificacionesFiltradas = this.notificaciones;
    } else if (filtro === 'pendientes') {
      this.notificacionesFiltradas = this.notificaciones.filter(
        (n) => !n.is_read,
      );
    } else if (filtro === 'leidas') {
      this.notificacionesFiltradas = this.notificaciones.filter(
        (n) => n.is_read,
      );
    }
  }

  marcarComoLeida(notificacion: any, event: Event): void {
    event.stopPropagation();
    if (!notificacion.is_read) {
      this.notificacionesService.markAsRead(notificacion._id).subscribe(() => {
        notificacion.is_read = true;
        this.notificacionesSinLeer--;
        this.filtrarNotificaciones(this.filtroActual);
      });
    }
  }

  marcarComoNoLeida(notificacion: any, event: Event): void {
    event.stopPropagation();
    if (notificacion.is_read) {
      this.notificacionesService
        .markAsUnread(notificacion._id)
        .subscribe(() => {
          notificacion.is_read = false;
          this.notificacionesSinLeer++;
          this.filtrarNotificaciones(this.filtroActual);
        });
    }
  }

  redirigirEntrada(notificacion: any): void {
    this.http
      .get(`http://localhost:8000/entradas/${notificacion.entrada_id}`)
      .subscribe({
        next: () => {
          if (!notificacion.is_read) {
            this.notificacionesService
              .markAsRead(notificacion._id)
              .subscribe(() => {
                notificacion.is_read = true;
                this.notificacionesSinLeer--;
                this.router
                  .navigateByUrl(`/entrada/${notificacion.entrada_id}`)
                  .then(() => {
                    window.location.reload();
                  });
                this.filtrarNotificaciones(this.filtroActual);
              });
          } else {
            this.router
              .navigateByUrl(`/entrada/${notificacion.entrada_id}`)
              .then(() => {
                window.location.reload();
              });
            this.filtrarNotificaciones(this.filtroActual);
          }
        },
        error: () => {
          if (!notificacion.is_read) {
            this.notificacionesService
              .markAsRead(notificacion._id)
              .subscribe(() => {
                notificacion.is_read = true;
                this.notificacionesSinLeer--;
                this.filtrarNotificaciones(this.filtroActual);
              });
          }
        },
      });
  }

  // redirigirEntrada(notificacion: any): void {
  //   if (!notificacion.is_read) {
  //     this.notificacionesService.markAsRead(notificacion._id).subscribe(() => {
  //       notificacion.is_read = true;
  //       this.notificacionesSinLeer--;
  //     });
  //   }
  //   this.router.navigate([`/entrada/${notificacion.entrada_id}`]);
  // }

  eliminarNotificacion(notificacion: any, event: Event): void {
    event.stopPropagation();
    this.notificacionesService
      .deleteNotificacion(notificacion._id)
      .subscribe(() => {
        this.notificaciones = this.notificaciones.filter(
          (n) => n._id !== notificacion._id,
        );
        if (!notificacion.is_read) {
          this.notificacionesSinLeer--;
        }

        this.filtrarNotificaciones(this.filtroActual);
      });
  }

  limpiarNotificaciones(): void {
    this.notificacionesService.deleteAllNotificaciones().subscribe(() => {
      this.notificaciones = [];
      this.notificacionesFiltradas = [];
      this.notificacionesSinLeer = 0;
    });
  }
}
