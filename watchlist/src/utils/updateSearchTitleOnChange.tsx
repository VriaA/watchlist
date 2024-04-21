import { ChangeEvent } from 'react'

// CONTROLS THE SEARCH INPUT
export default function updateSearchTitleOnChange(e: ChangeEvent, setTitle: React.Dispatch<React.SetStateAction<string>>) {
    const searchBar = e.target as HTMLInputElement
    setTitle(searchBar.value)
}