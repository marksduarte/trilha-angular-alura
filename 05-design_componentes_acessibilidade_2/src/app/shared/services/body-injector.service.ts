import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BodyInjectorService {
  // Referência para a aplicação
  constructor(private appRef: ApplicationRef) {}

  public stackBeforeAppRoot(compRef: ComponentRef<any>): void {
    const domElement = this.createDomElement(compRef);
    const appRoot = document.body.querySelector('app-root');
    document.body.insertBefore(domElement, appRoot);
  }

  private createDomElement(compRef: ComponentRef<any>): HTMLElement {
    this.appRef.attachView(compRef.hostView);
    /* O hostView é do tipo ViewRef, porém em tempo de execução é do tipo EmbeddedViewRef. */
    /* O tipo EmbeddedViewRef contém as propriedades necessárias para acessar o nós do DOM. */
    return (compRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
  }
}
