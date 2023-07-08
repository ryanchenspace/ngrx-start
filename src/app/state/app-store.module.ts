import { NgModule, isDevMode } from "@angular/core";
import { BooksStoreModule } from "./books/book-store.module";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

export const featureStores = [BooksStoreModule]

@NgModule({
    imports: [
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        ...featureStores
    ]
})
export class AppStoreModule { }