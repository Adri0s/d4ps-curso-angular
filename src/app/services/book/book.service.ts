import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from 'src/app/shared/interfaces/book';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {}

  findBooks(params: HttpParams): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/libros', { params })
      .pipe(
        catchError(error => {
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
}
