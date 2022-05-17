import { fade } from './shared/animations/fade';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import {
  ModalService,
  ModalRef,
} from './shared/components/modal/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade],
})
export class AppComponent {
  @ViewChild('modal') public modalTemplateRef: TemplateRef<any>;

  title = 'a11y-p2';
  firstName = 'Marks';
  modalRef: ModalRef;
  info = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  public show(): void {
    this.modalRef = this.modalService.open({
      templateRef: this.modalTemplateRef,
      title: 'User Details',
    });
  }
}
