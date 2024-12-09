import { Component, Input, OnInit } from "@angular/core";
import { VersionService } from "./version.service";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-version",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./version.component.html",
})
export class VersionComponent implements OnInit {
  @Input()
  versionId!: string;
  idEntrada: string = "";
  contenido: string = "";
  contenidoSeguro: SafeHtml = "";
  fechaEdicion: Date = new Date();

  constructor(
    private http: HttpClient,
    private versionService: VersionService,
    private route: ActivatedRoute,
    private router: Router,
    private sanatizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.idEntrada = this.route.snapshot.paramMap.get("id")!;
    this.versionService.obtenerUltimaVersion(this.idEntrada).subscribe({
      next: (data) => {
        console.log("Datos de la versión", data);
        this.contenido = data["contenido"];
        this.fechaEdicion = new Date(data["fechaEdicion"]);
        this.contenidoSeguro = this.sanatizer.bypassSecurityTrustHtml(
          this.contenido,
        );
      },
      error: (err) => {
        console.error("Error al obtener la version:", err);
      },
    });
  }
}
