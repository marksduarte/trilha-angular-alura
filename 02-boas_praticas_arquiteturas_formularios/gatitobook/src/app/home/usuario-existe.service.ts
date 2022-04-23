import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './../../../app/home/novo-usuario/novo-usuario.service';
import { Injectable } from '@angular/core';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        // converte o fluxo
        switchMap((nomeUsuario) => this.novoUsuarioService.verificarUsuarioExistente(nomeUsuario)),
        // converte o resultado do switchMap
        map((usuarioExiste) => (usuarioExiste ? {usuarioExistente: true} : null)),
        // fecha o Observable
        first()
      )
    }
  }
}


