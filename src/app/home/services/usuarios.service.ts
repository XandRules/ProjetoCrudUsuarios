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
}
