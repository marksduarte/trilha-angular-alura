import { switchMap, take } from 'rxjs/operators';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { AnimaisService } from './../animais.service';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Animais } from '../animais';

/**
 * Resolver para carregar a lista de animais antes do componente ser renderizado.
 */

@Injectable({
  providedIn: 'root',
})
export class ListaAnimaisResolver implements Resolve<Animais> {
  constructor(
    private animaisService: AnimaisService,
    private usuarioService: UsuarioService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Animais> {
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const username = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(username);
      }),
      // encerra o fluxo após uma requisição.
      // É necessário pois o método retornaUsuario é um observable do BehaviorSubject que mantém o fluxo aberto.
      take(1)
    );
  }
}
