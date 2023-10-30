import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PesquisarUsuariosComponent } from './components/pesquisar-usuarios/pesquisar-usuarios.component';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';



@NgModule({
  declarations: [
    SidebarComponent,
    PesquisarUsuariosComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    MessagesModule,
    InputTextModule,
    AutoCompleteModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    InputSwitchModule
  ],
  exports: [
    SidebarComponent,
    ButtonModule,
    PesquisarUsuariosComponent
  ]
})
export class SharedModule { }
