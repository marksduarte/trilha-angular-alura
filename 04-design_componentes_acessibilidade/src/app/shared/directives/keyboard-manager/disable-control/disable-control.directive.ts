import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]',
})
export class DisableControlDirective implements OnChanges {
  @Input() appDisableControl = false;

  constructor(private ngControl: NgControl) {}

  public ngOnChanges(changes: SimpleChanges): void {
    // se o valor mudou o changes terá a propriedade.
    if (changes.appDisableControl) {
      const action = this.appDisableControl ? 'disable' : 'enable';
      this.ngControl.control[action]();
    }
  }
}
