import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { BookModel } from 'src/app/shared/models/books.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {
  originalBook: BookModel | undefined;
  @Output() save = new EventEmitter()
  @Output() cancel = new EventEmitter()
  @ViewChild("f") private formDirective!: NgForm;

  constructor(private fb: FormBuilder) { }

  bookForm = this.fb.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    description: [''],
    imageLink: [''],
  })

  controlAndLabels = [{
    label: 'Name',
    controlName: 'name',
    required: true
  }, {
    label: 'Author',
    controlName: 'author',
    required: true
  }, {
    label: 'Descrption',
    controlName: 'description',
    required: false
  }, {
    label: 'Image',
    controlName: 'imageLink',
    required: false
  }]

  @Input() set book(book: BookModel | null) {
    this.resetForm();
    this.originalBook = undefined;

    if (book) {
      this.bookForm.setValue({
        name: book.name,
        author: book.author,
        description: book.description!,
        imageLink: book.imageLink!
      })
      this.originalBook = book;
    }
  }

  get isEditing() {
    return this.originalBook?.id;
  }

  onSubmit(book: BookModel) {
    this.save.emit({ ...this.originalBook, ...book });
  }


  onCancel() {
    this.isEditing ? this.cancel.emit() : this.resetForm()
  }

  resetForm() {
    this.formDirective?.resetForm();
    this.bookForm.reset();
  }

}
