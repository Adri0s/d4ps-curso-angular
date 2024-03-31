import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookService } from 'src/app/services/book/book.service';
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
    private bookService: BookService,
    private snackBar: MatSnackBar
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
      description:new FormControl('')
    });

    if (item) {
      this.saveForm.patchValue(item);
    }
  }

  onSubmit(): void {
    if (this.saveForm.valid) {
      const book: Book = this.saveForm.getRawValue();

      if (book.id) {
        this.bookService.updateBook(book).subscribe(updatedBook => {
          this.bookService.getById(updatedBook.id).subscribe(bbddBook => {
            this.saveForm.patchValue(bbddBook);
          });
          this.snackBar.open('Actualizado correctamente', '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-center-text']
          });
        });
      } else {
        this.bookService.createBook(book).subscribe(createdBook => {
          this.bookService.getById(createdBook.id).subscribe(bbddBook => {
            this.saveForm.patchValue(bbddBook);
          });
          this.snackBar.open('Creado correctamente', '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-center-text']
          });
        });
      }
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
