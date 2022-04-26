import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Para que nosso componente interaja com o ReactiveForms, devemos implementar a interface ControlValueAccessor.
 */
@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      /** É um injection token que marca nosso componente para que seja injetado dentro da infraestrutura do formGroup. */
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      /** evita que a injeção do token seja feita antes do componente estar pronto */
      useExisting: forwardRef(() => YesNoButtonGroupComponent),
    },
  ],
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {
  @Input() public value: string = null;
  @Input() public label = '';
  @Output() public valueChange = new EventEmitter<string>();
  public options = YesNoOptionsEnum;
  public onChange = (value: string) => {};
  public onTouched = (value: string) => {};

  constructor() {}

  ngOnInit(): void {}

  /** Recebe o valor passado pelo controle */
  writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  /** registra uma função dos eventos do controle */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /** Lógica quando o controle for tocado */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  public activate(value: string): void {
    this.writeValue(value);
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}

enum YesNoOptionsEnum {
  YES = 'yes',
  NO = 'no',
}
