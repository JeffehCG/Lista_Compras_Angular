import { Routes } from "@angular/router";
import { LoginGuard } from "./shared/guards/login.guard";

export const ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: "./autenticacao/login/login.module#LoginModule"
    },
    {
        path: 'cadastro',
        loadChildren: "./autenticacao/cadastro/cadastro.module#CadastroModule"
    },
    {
        path: '',
        loadChildren: "./dashboard/dashboard.module#DashboardModule",
        canLoad: [LoginGuard],
        canActivate: [LoginGuard]
    },
]
