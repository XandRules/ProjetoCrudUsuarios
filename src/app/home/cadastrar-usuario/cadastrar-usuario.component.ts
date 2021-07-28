import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../models/usuarios.models';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  usuario: Usuarios;

  constructor(private readonly formBuilder: FormBuilder, private readonly usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.iniciaFormulario();
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

    this.usuarioService.cadastrarNovoUsuario(this.usuario).subscribe(usuario => {
      console.log(usuario);
    })
  }

}
