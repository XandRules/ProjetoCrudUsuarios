import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios.models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  readonly url = 'http://localhost:3000';

  buscarUsuarios(nome?: string): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.url}/usuarios${nome !== '' ? '?nome='+ nome : ''}`);
  }

  cadastrarNovoUsuario(usuario: Usuarios){
    return this.http.post(`${this.url}/usuarios`, usuario);
  }

  excluirUsuario(id: number){
    return this.http.delete(`${this.url}/usuarios/${id}`);
  }

  atualizarUsuario(usuario: Usuarios, id: number){
    return this.http.put(`${this.url}/usuarios/${id}`, usuario);
  }

  getById(id: number){
    return this.http.get(`${this.url}/usuarios/${id}`);
  }
}
