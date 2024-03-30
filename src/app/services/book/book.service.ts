import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Book } from 'src/app/shared/interfaces/book';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {}

  findBooks(params: HttpParams): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/libros', { params })
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/libros/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  createBook(book: Book): Observable<Book> {
    return this.http.get<Book[]>(`http://localhost:3000/libros?isbn=${book.isbn}`).pipe(
      switchMap((books: Book[]) => {
        if (books.length > 0) {
          return throwError('Ya existe un libro con ese ISBN');
        } else {
          return this.http.post<Book>('http://localhost:3000/libros', book);
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`http://localhost:3000/libros/${book.id}`, book).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
