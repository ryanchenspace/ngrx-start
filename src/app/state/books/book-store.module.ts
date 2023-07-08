import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { booksFeature } from "./books.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BooksEffects } from "./books.effects";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(booksFeature),
        EffectsModule.forFeature(BooksEffects)
    ]
})
export class BooksStoreModule { }