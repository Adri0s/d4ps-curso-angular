import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { BookService } from './services/book/book.service';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SaveFormComponent } from './components/save-form/save-form.component';
import { SearchPageComponent } from './components/search-page/search-page.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultTableComponent,
    BookDetailComponent,
    SaveFormComponent,
    SearchPageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]

})
export class AppModule { }
