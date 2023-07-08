import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { BookModel, BookRequiredProps } from "src/app/shared/models/books.model";

export const BooksApiActions = createActionGroup({
    source: 'Books API',
    events: {
        'Books Loaded Success': props<{ books: BookModel[] }>(),
        'Book Created': props<{ book: BookModel }>(),
        'Book Updated ': props<{ book: BookModel }>(),
        'Book Deleted': props<{ bookId: string }>(),
    }
})


export const BooksPageActions = createActionGroup({
    source: 'Books Page',
    events: {
        'Enter': emptyProps(),
        'Edit Book': props<{ bookId: string }>(),
        'Cancle Editing Book': emptyProps(),
        'Create Book': props<{ book: BookRequiredProps }>(),
        'Update Book': props<{ bookId: string, changes: BookRequiredProps }>(),
        'Delete Book': props<{ bookId: string }>(),
    }
})