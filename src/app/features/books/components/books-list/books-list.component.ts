import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from 'src/app/shared/models/books.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
  @Input() books: BookModel[] | null = [];
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
}
