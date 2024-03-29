import { HttpParams } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';

import { BookService } from 'src/app/services/book/book.service';
import { Book } from '../../shared/interfaces/book';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  title: string = '';
  genre: string = '';
  startDate: string = '';
  endDate: string = '';
  showFilters: boolean = false;

  constructor(private libroService: BookService) {}

  @Output()
  searchEvent = new EventEmitter<Book[]>();

  handleSearch() {
    let params = new HttpParams();

    if (this.title) {
      params = params.append('title', this.title);
    }
    if (this.genre) {
      params = params.append('genre', this.genre);
    }
    if (this.startDate) {
      params = params.append('published_gte', this.startDate);
    }
    if (this.endDate) {
      params = params.append('published_lte', this.endDate);
    }

    this.libroService.findBooks(params)
      .subscribe(response => {
        this.searchEvent.emit(response);
      });
  }

  handleClear() {
    this.title = '';
    this.genre = '';
    this.startDate = '';
    this.endDate = '';
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
