import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Animais } from './../animais';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  animais!: Animais;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // ## subscribe hell ##
    // this.usuarioService.retornaUsuario().subscribe((usuario) => {
    //   const username = usuario.name ?? '';
    //   this.animaisService.listaDoUsuario(username).subscribe((animais) => {
    //     this.animais = animais;
    //   });
    // });

    // atribui o observable para a variável animais$ que será referenciada no template utilizando o pipe async
    // que faz o subscribe e o unsubscribe automaticamente.
    // this.animais$ = this.usuarioService.retornaUsuario().pipe(
    //   // troca o fluxo de usuario para lista de animais.
    //   switchMap((usuario) => {
    //     const username = usuario.name ?? '';
    //     return this.animaisService.listaDoUsuario(username);
    //   })
    // );

    // recebe a lista de animais carregada pelo Resolver antes de iniciar o componente.
    this.activatedRoute.params.subscribe((params) => {
      this.animais = this.activatedRoute.snapshot.data['animais'];
    });
  }
}
