import { useState, createContext } from 'react'
import { TAppContext, TChildren } from '../types/appTypes'

export const AppContext = createContext<TAppContext | null>(null)

export default function AppContextProvider({children}: TChildren): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false)

    return  <AppContext.Provider value={{loading, setLoading}}>
                {children}
            </AppContext.Provider>
}