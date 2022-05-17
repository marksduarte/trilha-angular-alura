import { BodyInjectorService } from './../../../services/body-injector.service';
import { ModalComponent } from './../modal.component';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { ModalConfig } from '../interfaces/modal-config';

@Injectable()
export class ModalService {
  // fábrica do componente
  private componentFactory: ComponentFactory<ModalComponent>;
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private bodyInjectorService: BodyInjectorService
  ) {
    // Cria a fábrica de componentes do tipo ModalComponent
    this.componentFactory =
      componentFactoryResolver.resolveComponentFactory(ModalComponent);
  }

  public open(config: ModalConfig): ModalRef {
    // Recebe o injector para 'injetar' o componente e retornar a referência.
    // Nesse estágio ele ainda está desconectado do DOM.
    const componentRef = this.createComponentRef();
    componentRef.instance.config = config;
    // Renderiza o component acima do app-root.
    this.bodyInjectorService.stackBeforeAppRoot(componentRef);
    return new ModalRef(componentRef);
  }

  private createComponentRef(): ComponentRef<ModalComponent> {
    return this.componentFactory.create(this.injector);
  }
}

export class ModalRef {
  constructor(private componentRef: ComponentRef<ModalComponent>) {}
  public close(): void {
    this.componentRef.destroy();
  }
}
