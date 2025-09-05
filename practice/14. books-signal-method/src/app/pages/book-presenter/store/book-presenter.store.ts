import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialBookPresenterSlice } from './book-presenter.slice';
import { computed } from '@angular/core';
import { BOOKS_COLLECTION } from '../../../data/books-collection';
export const BookPresenterStore = signalStore(
  withState(initialBookPresenterSlice),
  withComputed((store) => ({
    book: computed(() => BOOKS_COLLECTION[store.id()]),
  })),
  withMethods((store) => ({
    setBookId: signalMethod<number>((id: number) => patchState(store, { id })),
  }))
);
