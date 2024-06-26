import { useContext } from "react"
import { AppContext } from "../contexts/AppContext"
import { TAppContext } from "../types/appTypes"
/*
    WHAT DO I WANT TO DO
    - add a film to the watchlist
        - poster
        - date
        - name
        - type
        - duration
 */

export default function Watchlist(): JSX.Element {
    const { signedInUser } = useContext(AppContext) as TAppContext
    console.log(signedInUser?.uid)
    return (
        <>
            <h1 className="text-slate-900">Watchlist</h1>
        </>
    )
}