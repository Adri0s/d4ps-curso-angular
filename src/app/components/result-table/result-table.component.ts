import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Book } from 'src/app/shared/interfaces/book';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent {
  @Input() searchResults: Book[];

  constructor(
    private dialog: MatDialog,
    private bookService: BookService,
    private router: Router
    ) {
      this.searchResults = [];
  }

  openDetailsModal(item: Book) {
    this.dialog.open(BookDetailComponent, {
      data: {
        book: item
      }
    });
  }

  openEditForm(item: Book) {
    this.router.navigate(['save'], { state: {item}});
  }

  confirmDelete(item: Book) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(item.id).subscribe(() => {
          this.searchResults = this.searchResults.filter(book => book.id !== item.id);
        });
      }
    });
  }

  onNewBtnClick() {
    this.router.navigate(['save']);
  }
}
