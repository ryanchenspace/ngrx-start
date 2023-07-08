export interface BookModel {
    id: string;
    name: string;
    author: string;
    description?: string;
    imageLink?: string;
}

export type BookRequiredProps = Pick<BookModel, "name" | "author">;