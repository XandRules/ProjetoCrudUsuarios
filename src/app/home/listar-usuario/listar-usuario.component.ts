import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../models/usuarios.models';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  public usuarios: Usuarios[];
  public loading = false;
  public nome: string = '';
  public buscarTodos = false;
  p: number = 1;
  usuarioVazio = true;

  constructor(private readonly usuarioService: UsuariosService) { }

  ngOnInit(): void {
   
  }

  buscarUsuarios(){
    this.loading = true;
    this.usuarios = [];
    this.usuarioService.buscarUsuarios(this.nome).subscribe((usuarios: Usuarios[])=> {
      this.usuarios = usuarios;
      console.log(this.usuarios);
      this.loading = false;
      this.usuarioVazio = this.usuarios.length > 0 ? false: true;
    })
  }

}
