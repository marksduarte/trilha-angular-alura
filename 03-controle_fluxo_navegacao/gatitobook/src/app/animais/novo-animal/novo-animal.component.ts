import { Router } from '@angular/router';
import { AnimaisService } from './../animais.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css'],
})
export class NovoAnimalComponent implements OnInit {
  formAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentualEnvio = 0;

  constructor(
    private animaisService: AnimaisService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formAnimal = this.fb.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload() {
    const allowComments = this.formAnimal.get('allowComments')?.value ?? false;
    const description = this.formAnimal.get('description')?.value ?? '';

    this.animaisService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => this.router.navigate(['animais'])))
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const total = event.total ?? 1;
            this.percentualEnvio = Math.round(100 * (event.loaded / total));
          }
        },
        (error) => console.log(error)
      );
  }

  gravaArquivo(arquivo: any): void {
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
