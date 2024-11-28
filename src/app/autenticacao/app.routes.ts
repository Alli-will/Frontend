import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DiarioComponent } from '../diario/diario.component';
import { LoginComponent } from '../login/login.component';
import { PosteComponent } from '../poste/poste.component';
import { AuthGuard } from './auth.guard';
import { HistoricoComponent } from '../diario/consulta/historico.component'
import { CadastroComponent } from '../Cadastro/cadastro.component';


export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: "diario", component:DiarioComponent, canActivate: [AuthGuard]},
    {path: "home", component:HomeComponent},
    {path: "login", component:LoginComponent},
    {path: "poste", component:PosteComponent, canActivate: [AuthGuard]},
    {path: 'historico', component: HistoricoComponent},
    { path:'cadastro', component: CadastroComponent },
    
];
