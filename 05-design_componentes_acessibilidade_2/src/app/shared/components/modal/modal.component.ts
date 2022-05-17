import { Component, OnInit } from '@angular/core';
import { ModalConfig } from './interfaces/modal-config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  public config: ModalConfig;

  constructor() {}

  ngOnInit(): void {}
}
