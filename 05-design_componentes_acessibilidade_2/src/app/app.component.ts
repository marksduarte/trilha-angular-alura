import { fade } from './shared/animations/fade';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from './shared/components/modal/services/modal.service';
import { ModalRef } from './shared/components/modal/models/modal-ref';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade],
})
export class AppComponent {
  @ViewChild('modal') public modalTemplateRef: TemplateRef<any>;

  title = 'a11y-p2';
  modalRef: ModalRef;
  form: FormGroup;

  constructor(private modalService: ModalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['Marks', Validators.required],
      surname: [null, Validators.required],
      age: [null, Validators.required],
      info: [false, Validators.required],
    });
  }

  public show(): void {
    this.modalRef = this.modalService.open({
      templateRef: this.modalTemplateRef,
      title: 'User Details',
    });
  }

  public submit(): void {
    if (this.form.invalid) return;

    console.log(this.form.value);
  }
}
