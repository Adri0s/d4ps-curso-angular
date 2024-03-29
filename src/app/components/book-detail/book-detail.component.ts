import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Book } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
