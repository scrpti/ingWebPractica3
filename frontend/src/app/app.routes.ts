import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WikisComponent } from "./wikis/wikis.component";
import { NewWikiComponent } from "./new-wiki/new-wiki.component";
import { EntradasComponent } from "./entradas/entradas.component";
import { NewEntradaComponent } from "./new-entrada/new-entrada.component";
import { EntradaComponent } from "./entrada/entrada.component";
import { EditorWikiComponent } from "./editar-wiki/editar-wiki.component";
import { EditorEntradasComponent } from "./editor-entradas/editor-entradas.component";
import { HistorialVersionesComponent } from "./historial-versiones/historial-versiones.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuarioComponent } from "./usuario/usuario.component";

export const routes: Routes = [
  { path: "", component: WikisComponent },
  { path: "new_wiki", component: NewWikiComponent },
  { path: "wiki/:id", component: EntradasComponent },
  { path: "wiki/:idWiki/new_entrada", component: NewEntradaComponent },
  { path: "wiki/:idWiki/editar", component: EditorWikiComponent },
  { path: "entrada/:id", component: EntradaComponent },
  { path: "entrada/:id/editar", component: EditorEntradasComponent },
  { path: "entrada/:id/historial", component: HistorialVersionesComponent},
  { path: "perfil/:id", component: PerfilComponent},
  { path: "usuario/:id", component: UsuarioComponent},
  { path: "**", redirectTo: "" },
  // otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
