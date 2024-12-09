import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-boton-atras",
  standalone: true,
  imports: [],
  templateUrl: "./boton-atras.component.html"
})
export class BotonAtrasComponent {
  @Input()
  ruta: string = "/";
  constructor(private router: Router) {}
  volverAtras() {
    this.router.navigate([this.ruta]);
  }
}