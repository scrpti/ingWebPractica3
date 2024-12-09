import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WikisService } from '../wikis/wikis.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotonAtrasComponent } from "../boton-atras/boton-atras.component";
import { SubirImagenesComponent } from "../subir-imagenes/subir-imagenes.component";  // Importa FormsModule
import { SubirImagenesService } from '../subir-imagenes/subir-imagenes.service';

@Component({
  selector: 'app-editar-wiki',
  standalone: true,
  imports: [CommonModule, FormsModule, BotonAtrasComponent, SubirImagenesComponent,ReactiveFormsModule], // Asegúrate de incluir FormsModule aquí
  templateUrl: './editar-wiki.component.html',
})
export class EditorWikiComponent implements OnInit {
  wikiId!: string;
  wikiForm: FormGroup;
  imageUrl: string = ''; // Variable para almacenar la URL
  antiguoNombreWiki: string = '';
  nombreWiki: string = '';


  constructor(
    private WikisService: WikisService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private imagenUrl: SubirImagenesService,
  ) {
    this.wikiForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.wikiId = this.route.snapshot.paramMap.get('idWiki')!;
    this.WikisService.getWiki(this.wikiId).subscribe({
      next: (data) => {
        this.wikiForm.patchValue({
          nombre: data.nombre,
        });
        this.antiguoNombreWiki = data.nombre;
        this.nombreWiki = data.nombre;
        this.imageUrl = data.imagenUrl;
        console.log('Wiki:', data);
      },
      error: (err) => {
        console.error('Error al obtener la wiki:', err);
      },
    });
  }

  guardarCambios(): void {
    console.log('Guardando cambios...');
    if (this.wikiForm.valid) {
      const wikiData = this.wikiForm.value;
      console.log('Datos del formulario:', wikiData);
      console.log('Imagen URL:', this.imagenUrl.getUrl());
      this.imageUrl = this.imagenUrl.getUrl();
      wikiData.imagenUrl = this.imageUrl;

      this.WikisService.editWiki(this.wikiId, wikiData).subscribe({
        next: (data) => {
          console.log('Cambios guardados:', data);
          
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
        },
      });
    }else {
      console.log('Formulario no válido');
    }
  }
}
