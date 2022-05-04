import { Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class ModalService {
  constructor() {}

  public open(config: ModalConfig): ModalRef {
    return new ModalRef();
  }
}

export interface ModalConfig {
  templateRef: TemplateRef<any>;
  title: string;
}

export class ModalRef {
  public close(): void {}
}
