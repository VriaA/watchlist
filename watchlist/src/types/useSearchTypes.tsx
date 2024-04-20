import React, {  FormEvent } from "react"
import { SetURLSearchParams, NavigateFunction } from "react-router-dom"

export type THandleSearchFormSubmit = (e: FormEvent, navigate?: NavigateFunction, setSearchParams?: SetURLSearchParams)=> void

export type TUseSearch = {
    searchTitle: string, 
    setSearchTitle: React.Dispatch<React.SetStateAction<string>>, 
    isSearchBarEmpty: boolean, 
    setIsSearchBarEmpty:  React.Dispatch<React.SetStateAction<boolean>>, 
    searchParams: URLSearchParams, 
    setSearchParams: SetURLSearchParams, 
    handleSearchFormSubmit : THandleSearchFormSubmit
}