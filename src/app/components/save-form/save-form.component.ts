import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  //styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent {
  saveForm = new FormGroup({
    title:      new FormControl(''),
    author:     new FormControl(''),
    image:      new FormControl(''),
    genre:      new FormControl(''),
    isbn:       new FormControl(''),
    published:  new FormControl(''),
    publisher:  new FormControl(''),
    description:new FormControl('')
  });

  constructor(
    private router: Router
  ) { }

  onSubmit(): void {
    // Aquí puedes hacer la lógica para agregar el registro a la base de datos
    console.log(this.saveForm.value);
  }

  onBack(): void {
    this.router.navigate(['']);
  }
}
