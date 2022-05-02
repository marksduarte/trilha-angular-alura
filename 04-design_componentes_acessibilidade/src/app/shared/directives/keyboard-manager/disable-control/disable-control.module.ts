import { DisableControlDirective } from './disable-control.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  exports: [DisableControlDirective],
  declarations: [DisableControlDirective],
})
export class DisableControlModule {}
