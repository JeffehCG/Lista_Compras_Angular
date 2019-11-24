import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ListasComponent } from '../shared/components/listas/listas.component';
import { ProdutosComponent } from '../shared/components/produtos/produtos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ListasComponent,
    ProdutosComponent],
  exports: [
    HeaderComponent,
    ListasComponent,
    ProdutosComponent
  ]
})
export class DashboardModule { }
