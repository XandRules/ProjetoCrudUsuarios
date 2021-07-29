import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../models/usuarios.models';
import { UsuariosService } from '../services/usuarios.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  displayedColumns =
      ['nome', 'email', 'telefone', 'data_nasc', 'cep', 'rua', 'cidade', 'bairro', 'numero', 'estado'];   
  dataSource: Usuarios[] = [];

  constructor(private readonly usuarioService: UsuariosService, private readonly router: Router, private toastr: ToastrService,) { }

  ngOnInit(): void {   
   
  }

  selecionarUsuario(nome: string, id: number){
    Swal.fire({
      title: `Usuário ${nome}`,
      text: "O que você gostaria de fazer?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Excluir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['editar', id]);
      }else{

        this.loading = true;

        this.usuarioService.excluirUsuario(id).subscribe(resposta => {
          Swal.fire(
            'Usuário apagado!',
            'Usuário apagado com sucesso',
            'success'
          );
          this.buscarUsuarios();
        },error => {
          Swal.fire(
            'Erro!',
            'Erro ao tentar apagar o usuário',
            'error'
          );
        })
      }
    })
  }

  buscarUsuarios(){
    this.loading = true;
    this.usuarios = [];
    this.usuarioService.buscarUsuarios(this.nome).subscribe((usuarios: Usuarios[])=> {
      this.usuarios = usuarios;
      this.loading = false;
      this.usuarioVazio = this.usuarios.length > 0 ? false: true;
    },(error)=> {
      this.loading = false;
      this.toastr.error('Erro ao acessar a base', 'Tente novamente!');
    })
  }

}
