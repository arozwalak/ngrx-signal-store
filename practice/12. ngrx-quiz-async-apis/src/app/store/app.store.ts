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
import { map, mergeAll, switchAll, tap } from 'rxjs';

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
    const _invalidateDictionary = rxMethod<string>((input$) => {
      const output$ = input$.pipe(
        tap((_) => patchState(store, setBusy(true))),
        map((lang) => store._dictionariesService.getDictionaryWithDelay(lang)),
        switchAll(),
        tap((dictionary) => {
          patchState(store, setDictionary(dictionary), setBusy(false));
        })
      );

      return output$;
    });

    return {
      changeLanguage: () => {
        patchState(store, changeLanguage(store._languages));
        _invalidateDictionary(store.selectedLanguage());
      },
      _resetLanguages: () => {
        patchState(store, resetLanguages(store._languages));
        _invalidateDictionary(store.selectedLanguage());
      },
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store._resetLanguages();
    },
  }))
);
