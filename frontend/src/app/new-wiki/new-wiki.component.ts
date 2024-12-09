import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NewWikiService } from './new-wiki.service';
import { SubirImagenesService } from '../subir-imagenes/subir-imagenes.service'; // Importa el servicio
import { BotonAtrasComponent } from "../boton-atras/boton-atras.component";
import { SubirImagenesComponent } from "../subir-imagenes/subir-imagenes.component";

@Component({
  selector: 'app-new-wiki',
  standalone: true,
  imports: [ReactiveFormsModule, BotonAtrasComponent, SubirImagenesComponent],
  templateUrl: './new-wiki.component.html',
})
export class NewWikiComponent {
  wikiForm: FormGroup;
  imageUrl: string = ''; // Variable para almacenar la URL
  mensaje: string = ''; // Variable para mostrar mensaje de error

  constructor(
    private router: Router,
    private wiki: NewWikiService,
    private fb: FormBuilder,
    private imagenUrl: SubirImagenesService // Inyecta el servicio
  ) {
    this.wikiForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  crearWiki() {
    if (this.wikiForm.valid) {
      const wikiData = this.wikiForm.value;
      this.imageUrl = this.imagenUrl.getUrl();
      // Agrega la URL de la imagen al formulario antes de enviar
      wikiData.imagenUrl = this.imageUrl;
      if (this.imageUrl == ""){
        this.mensaje = 'Debes subir una imagen';
        alert(this.mensaje);
      }
      else{
        this.wiki.createWiki(wikiData).subscribe({
          next: (response) => {
            console.log('Wiki creada correctamente:', response);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error al crear la wiki:', err);
          },
        });
      }
    } else {
      alert('Formulario no válido');
      console.log('Formulario no válido');
    }
  }
}
