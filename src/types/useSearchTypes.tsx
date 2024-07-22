import { FormEvent, ChangeEvent } from "react";
import { SetURLSearchParams, NavigateFunction } from "react-router-dom";
import { TResults } from "./resultTypes";

export type THandleSearchFormSubmit = (
  e: FormEvent,
  navigate?: NavigateFunction,
  setSearchParams?: SetURLSearchParams,
) => void;

export type TUseSearch = {
  searchTitle: string;
  isTitleMessageVisible: boolean;
  handleSearchFormSubmit: THandleSearchFormSubmit;
  suggestions: TResults;
  updateSearchTitleOnChange: (e: ChangeEvent) => void;
  isSuggestionsOpen: boolean;
  setIsSuggestionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchBarEmpty: boolean;
};
