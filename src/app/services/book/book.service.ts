import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Book } from 'src/app/shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/libros';
  private duplicateIsbnError = 'Ya existe un libro con ese ISBN';
  private params!: HttpParams;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  findBooks(params: HttpParams): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, { params })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  createBook(book: Book): Observable<Book> {
    return this.http.get<Book[]>(`${this.apiUrl}?isbn=${book.isbn}`).pipe(
      switchMap((books: Book[]) => {
        if (books.length > 0) {
          this.snackBar.open(this.duplicateIsbnError, '', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          return throwError(this.duplicateIsbnError);
        } else {
          return this.http.post<Book>(this.apiUrl, book);
        }
      }),
      catchError(error => {
        if (error !== this.duplicateIsbnError) {
          this.snackBar.open('Ocurrió un error inesperado', '', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
        return throwError(error);
      })
    );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // handle last search
  setParams(params: HttpParams) {
    this.params = params;
  }

  getParams(): HttpParams {
    return this.params;
  }
}
