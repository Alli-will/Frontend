import { Routes } from '@angular/router';
import { DiarioComponent } from '../diario/diario.component';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../Cadastro/cadastro.component';
import { HistoricoComponent } from '../diario/consulta/historico.component';
import { AuthGuard } from './auth.guard';
import { EmBreveGuard } from './em-breve.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'diario', component: DiarioComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'historico', component: HistoricoComponent, canActivate: [AuthGuard] },
    { path: 'home', canActivate: [EmBreveGuard], component: LoginComponent },
    { path: '**', canActivate: [EmBreveGuard], component: LoginComponent },
];
