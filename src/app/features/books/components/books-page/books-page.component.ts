import { Component } from '@angular/core';
import { Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookModel, BookRequiredProps } from 'src/app/shared/models/books.model';
import { BooksPageActions } from 'src/app/state/books/books.actions';
import { booksFeature } from 'src/app/state/books/books.reducer';


@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent {
  books$: Observable<BookModel[]>;
  currentBook$: Observable<BookModel | null>;


  constructor(private store: Store) {
    this.books$ = store.select(booksFeature.selectBooks);
    this.currentBook$ = store.select(booksFeature.selectActiveBook);
  }

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enter());
  }

  onEdit(book: BookModel) {
    this.store.dispatch(BooksPageActions.editBook({ bookId: book.id }));
  }

  onCancel() {
    this.store.dispatch(BooksPageActions.cancleEditingBook());
  }



  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({ book: bookProps }));
  }

  updateBook(book: BookModel) {
    this.store.dispatch(
      BooksPageActions.updateBook({ bookId: book.id, changes: book })
    );
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({ bookId: book.id }));
  }
}
