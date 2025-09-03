import { PartialStateUpdater } from '@ngrx/signals';
import { AppSlice } from './app.slice';

export function changeLanguage(
  languages: string[]
): PartialStateUpdater<AppSlice> {
  return (state) => {
    const index = languages.indexOf(state.selectedLanguage) ?? -1;
    const nextIndex = (index + 1) % languages.length;
    const selectedLanguage = languages[nextIndex];
    return {
      selectedLanguage,
    };
  };
}
