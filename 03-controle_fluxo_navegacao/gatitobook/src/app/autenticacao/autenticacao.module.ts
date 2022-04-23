import { AutenticacaoInterceptor } from './autenticacao.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      // Avisa ao Angular que existem vários interceptors.
      // Assim a requisição passará por todos os interceptors registrados.
      // A ordem não é garantida.
      multi: true,
    },
  ],
})
export class AutenticacaoModule {}
