import { Component, Input, OnInit } from "@angular/core";
import { NgIf } from "@angular/common";
import { EditorComponent, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { SubirImagenesService } from "./subirImagen.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-editor-entradas",
  standalone: true,
  imports: [EditorComponent, NgIf],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js" },
  ],
  templateUrl: "./editor-entradas.component.html",
  styleUrl: "./editor-entradas.component.scss",
})
export class EditorEntradasComponent implements OnInit {
  loading = true;
  curretVersion: any;
  editorInstance: any;
  idEntrada: string = "";
  defaultContent: string = "";
  newContent: string = "";
  selectedImageName: string = ""; // Almacena el nombre del archivo seleccionado

  constructor(
    private subirImagenesService: SubirImagenesService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  //init
  ngOnInit(): void {
    // url id de la entrada
    this.idEntrada = this.route.snapshot.paramMap.get("id")!;
    this.obtenerUltimaVersion(this.idEntrada).subscribe({
      next: (version) => {
        console.log("Contenido de la entrada:", version);
        this.curretVersion = version;
        this.defaultContent = version.contenido;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al obtener el contenido de la entrada:", err);
        this.loading = false;
      },
    });
  }

  obtenerUltimaVersion(idEntrada: string): Observable<any> {
    const url = "http://localhost:8000/entradas/";
    return this.http.get<{ versiones: any[] }>(
      url + idEntrada + "/last-version",
    );
  }

  actualizarVersionDeEntrada(nuevoIdVersion: string) {
    const url = "http://localhost:8000/entradas/";
    this.http
      .put(url + this.idEntrada, { idVersionActual: nuevoIdVersion })
      .subscribe({
        next: (data) => {
          console.log("Entrada actualizada correctamente:", data);
          this.editorInstance.destroy();
          this.router.navigate(["/entrada/", this.idEntrada]);
        },
        error: (err) => {
          console.error("Error al actualizar la entrada:", err);
        },
      });
  }

  guardarVersion() {
    const body = {
      idUsuario: this.curretVersion.idUsuario,
      idEntrada: this.curretVersion.idEntrada,
      contenido: this.newContent,
    };
    const url = "http://localhost:8000/versiones/";
    this.http.post(url, body).subscribe({
      next: (data: any) => {
        console.log("Versión guardada correctamente:", data);
        this.actualizarVersionDeEntrada(data["idVersion"]);
      },
      error: (err) => {
        console.error("Error al guardar la versión:", err);
      },
    });
  }

  imageUploadHandler = (
    blobInfo: any,
    progress: (percent: number) => void,
  ): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const archivo = blobInfo.blob(); // Convertir a tipo File

      this.subirImagenesService.subirImagen(archivo).subscribe({
        next: (data) => {
          console.log("Imagen subida correctamente:", data);
          resolve(data.url);
        },
        error: (err) => {
          console.error("Error al subir la imagen:", err);
          resolve("");
        },
      });
    });
  };

  saveContent(editor: any) {
    console.log(editor.getContent());
    this.newContent = editor.getContent();
    if (this.newContent !== this.defaultContent) {
      this.guardarVersion();
    } else {
      this.editorInstance.destroy();
      this.router.navigate(["/entrada/", this.idEntrada]);
    }
  }

  init: EditorComponent["init"] = {
    license_key: "gpl",
    height: "100vh",
    plugins: "lists link image table code help wordcount",
    images_upload_handler: this.imageUploadHandler,
    image_list: [
      { title: "My image 1", value: "https://www.example.com/my1.gif" },
      { title: "My image 2", value: "http://www.moxiecode.com/my2.gif" },
    ],
    toolbar:
      "save image | undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link",
    setup: (editor) => {
      this.editorInstance = editor;
      editor.ui.registry.addButton("customImagePicker", {
        icon: "image",
        onAction: () => {
          alert("Custom image picker button clicked");
        },
      });
      editor.ui.registry.addButton("save", {
        icon: "save",
        onAction: () => {
          this.saveContent(editor);
        },
      });
    },
  };
}
