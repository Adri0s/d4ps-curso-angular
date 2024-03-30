import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent {
  /* Esta lista habría que definirla en un lugar común */
  genres = ['Ut', 'Nam', 'Voluptatem', 'Unde', 'Aperiam', 'In'];

  saveForm = new FormGroup({
    title:      new FormControl(''),
    author:     new FormControl(''),
    image:      new FormControl({value: 'https://picsum.photos/480/640', disabled: true}),
    genre:      new FormControl(''),
    isbn:       new FormControl(''),
    published:  new FormControl(new Date().toISOString().split('T')[0]),
    publisher:  new FormControl(''),
    description:new FormControl('')
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.saveForm = this.formBuilder.group({});

    const item: Book = history.state.item;
    if (item) {
      this.saveForm.patchValue(item);
    }
  }

  onSubmit(): void {
    // Aquí puedes hacer la lógica para agregar el registro a la base de datos
    console.log(this.saveForm.value);
  }

  onBack(): void {
    this.router.navigate(['']);
  }
}
