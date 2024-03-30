import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent implements OnInit {
  /* Esta lista habría que definirla en un lugar común */
  genres = ['Ut', 'Nam', 'Voluptatem', 'Unde', 'Aperiam', 'In'];
  saveForm!: FormGroup;
  isEditMode: boolean = false;
  isFocused = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const item: Book = history.state.item;
    this.isEditMode = !!item && !!item.id;

    this.saveForm = this.formBuilder.group({
      id:         new FormControl(''), // Este campo no se muestra en el formulario
      title:      new FormControl('', Validators.required),
      author:     new FormControl('', Validators.required),
      image:      new FormControl({value: 'https://picsum.photos/480/640', disabled: true}),
      genre:      new FormControl('', Validators.required),
      isbn:       new FormControl({value: '', disabled: this.isEditMode}, Validators.required),
      published:  new FormControl(new Date().toISOString().split('T')[0], Validators.required),
      publisher:  new FormControl('', Validators.required),
      description:new FormControl('', Validators.required)
    });


    if (item) {
      this.saveForm.patchValue(item);
    }
  }

  onSubmit(): void {
    if (this.saveForm.valid) {
      // todo
    } else {
      Object.values(this.saveForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onBack(): void {
    this.router.navigate(['']);
  }
}
