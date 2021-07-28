import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ButtonsModule, CardsModule, CheckboxModule, IconsModule, InputsModule, InputUtilitiesModule, NavbarModule, WavesModule } from 'angular-bootstrap-md';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [MenuComponent, CadastrarUsuarioComponent, ListarUsuarioComponent, FooterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    InputsModule, 
    InputUtilitiesModule,
    NgxPaginationModule,
    CardsModule,
    CheckboxModule,
    NgxMaskModule,
    MatTableModule
  ],
  exports: [MenuComponent, CadastrarUsuarioComponent, ListarUsuarioComponent, FooterComponent],
})
export class HomeModule { }
