import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../models/usuarios.models';
import { UsuariosService } from '../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit, AfterContentChecked {

  usuarioForm: FormGroup;
  usuario: Usuarios;
  acao: string;
  titulo: string;
  loading = false;

  constructor(private readonly formBuilder: FormBuilder,
     private readonly usuarioService: UsuariosService,
     private toastr: ToastrService,
     private readonly  route: ActivatedRoute) { }

  ngOnInit(): void {
    this.iniciaFormulario();
    this.setCurrentAction();
    this.carregarUsuario();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  iniciaFormulario(){
    this.usuarioForm = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      data_nasc: [null, Validators.required],
      cep: [null, Validators.required],
      rua: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      numero: [null, Validators.required],
      estado: [null, Validators.required],
    });
  }

  salvarUsuario(){

    this.usuario = this.usuarioForm.value;
    this.loading = true;

    this.usuarioService.cadastrarNovoUsuario(this.usuario).subscribe(usuario => {
      this.toastr.success('Usuário cadastrado', 'O usuário foi cadastrado com sucesso!');
      this.loading = false;
      this.usuarioForm.reset();
    },
    (error)=> {
      this.loading = false;
      this.toastr.error('Usuário não cadastrado', 'O usuário não foi cadstrado!');
    })
  };

  atualizarUsuario(){

    this.usuario = this.usuarioForm.value;
    this.loading = true;
    this.usuarioService.atualizarUsuario(this.usuario, +this.route.snapshot.params.id ).subscribe(usuario => {
      this.loading = false;
      this.toastr.success('Usuário atualizado', 'O usuário foi atualizado com sucesso!');
    },(error)=> {
      this.loading = false;
      this.toastr.error('Usuário não atualizado', 'O usuário não foi atualizado!');
    })
  };

  isFieldWithError(field: string) {
    return this.usuarioForm.get(field).hasError('required') && this.usuarioForm.get(field).invalid
      && (this.usuarioForm.get(field).dirty || this.usuarioForm.get(field).touched);
  }

  protected setCurrentAction() {
    if(this.route.snapshot.url[0].path == "editar")
      this.acao = "editar"
    else
      this.acao = "novo"
  }

  protected setPageTitle() {
    if (this.acao == 'novo')
      this.titulo = this.creationPageTitle();
    else{
      this.titulo = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string{
    return "Novo"
  }

  protected editionPageTitle(): string{
    return "Editar"
  }

  protected carregarUsuario() {
    if (this.acao == "editar") {
      
      this.route.paramMap.pipe(
        switchMap(params => this.usuarioService.getById(+params.get("id")))
      )
      .subscribe(
        (usuario: Usuarios) => {
          this.usuario = usuario;
          this.usuarioForm.patchValue(usuario) // binds loaded resource data to resourceForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  submitForm(){
   
    if(this.acao == "novo")
      this.salvarUsuario();
    else 
      this.atualizarUsuario();
  }

}
