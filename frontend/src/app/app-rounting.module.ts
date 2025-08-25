import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import { CadastrarPolicialComponent } from "./components/cadastrar-policial/cadastrar-policial.component";
import { ListarPoliciaisComponent } from "./components/listar-policiais/listar-policiais.component";

const routes: Routes = [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
    { path: 'cadastrar', component: CadastrarPolicialComponent },
     {path: 'listar', component: ListarPoliciaisComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
