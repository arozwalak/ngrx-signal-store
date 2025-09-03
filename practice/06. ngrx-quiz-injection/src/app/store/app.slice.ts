export interface AppSlice {
  readonly selectedLanguage: string;
  readonly possibleLanguages: string[];
}

export const initialAppSlice: AppSlice = {
  selectedLanguage: '',
  possibleLanguages: [],
};
