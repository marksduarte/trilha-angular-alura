import { fade } from './../../animations/fade';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ModalConfig } from './interfaces/modal-config';
import { ModalRef } from './models/modal-ref';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [fade],
})
export class ModalComponent implements OnInit {
  @HostBinding('@fade') fade = true;
  public modalRef: ModalRef;
  public config: ModalConfig;

  constructor() {}

  ngOnInit(): void {}
}
