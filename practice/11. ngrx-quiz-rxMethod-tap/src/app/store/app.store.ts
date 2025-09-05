import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { initialAppSlice } from './app.slice';
import { inject } from '@angular/core';
import {
  changeLanguage,
  resetLanguages,
  setBusy,
  setDictionary,
} from './app.updaters';
import { DictionariesService } from '../services/dictionaries.service';
import { tap, delay } from 'rxjs';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppSlice),
  withProps((_) => {
    const _dictionariesService = inject(DictionariesService);
    const _languages = _dictionariesService.languages;

    return {
      _dictionariesService,
      _languages,
    };
  }),
  withMethods((store) => {
    const _invalidateDictionary = rxMethod<string>((input$) =>
      input$.pipe(
        tap((lang) => {
          console.log('invalidate dictionary for language', lang);
          patchState(store, setBusy(true));
        }),
        delay(1000),
        tap((lang) => {
          console.log('completed invalidate dictionary for language', lang);
          patchState(store, setBusy(false));
        })
      )
    );

    return {
      changeLanguage: async () => {
        patchState(store, changeLanguage(store._languages));
        await _invalidateDictionary(store.selectedLanguage());
      },
      _resetLanguages: async () => {
        patchState(store, resetLanguages(store._languages));
        await _invalidateDictionary(store.selectedLanguage());
      },
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store._resetLanguages();
    },
  }))
);
