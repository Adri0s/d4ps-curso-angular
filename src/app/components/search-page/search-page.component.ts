import { Component } from '@angular/core';

import { Book } from './../../shared/interfaces/book';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {
  results: Book[] = [];

  onSearch(results: Book[]) {
    this.results = results;
  }
}
