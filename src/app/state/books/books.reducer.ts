import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { BookModel } from "src/app/shared/models/books.model";
import { BooksPageActions, BooksApiActions } from "./books.actions";

const createBook = (books: BookModel[], book: BookModel) => [book, ...books];
const updateBook = (books: BookModel[], changes: BookModel) =>
    books.map(book => {
        return book.id === changes.id ? Object.assign({}, book, changes) : book;
    });
const deleteBook = (books: BookModel[], bookId: string) =>
    books.filter(book => bookId !== book.id);

export interface State {
    books: BookModel[];
    activeBookId: string | null;
}

export const initialState: State = {
    books: [],
    activeBookId: null
};

export const booksFeature = createFeature({
    name: 'books',
    reducer: createReducer(
        initialState,
        on(BooksPageActions.cancleEditingBook, BooksPageActions.enter, state => ({
            ...state,
            activeBookId: null
        })),
        on(BooksPageActions.editBook, (state, action) => ({
            ...state,
            activeBookId: action.bookId
        })),
        on(BooksApiActions.booksLoadedSuccess, (state, action) => ({
            ...state,
            books: action.books
        })),
        on(BooksApiActions.bookCreated, (state, action) => ({
            books: createBook(state.books, action.book),
            activeBookId: null
        })),
        on(BooksApiActions.bookUpdated, (state, action) => ({
            books: updateBook(state.books, action.book),
            activeBookId: null
        })),
        on(BooksApiActions.bookDeleted, (state, action) => ({
            ...state,
            books: deleteBook(state.books, action.bookId)
        }))
    ),
    extraSelectors: ({ selectBooks, selectActiveBookId }) => ({
        selectActiveBook: createSelector(
            selectBooks,
            selectActiveBookId,
            (books, activeBookId) => books.find((book) => book.id === activeBookId) || null
        )
    })
})