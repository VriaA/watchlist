import { useState, createContext, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { TAppContext, TDialog } from '../types/appTypes'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase'

export const AppContext = createContext<TAppContext | null>(null)

export default function AppContextProvider(): JSX.Element {
    const auth = getAuth(app)
    const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(null)
    const [signedInUser, setSignedInUser] = useState<User | null>(null)
    const [dialog, setDialog] = useState<TDialog>({message: null, isOpen: false})
    const dialogRef = useRef<HTMLDialogElement | null>(null) 

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            setisLoggedIn(user ? true : false)
            setSignedInUser(()=> user)
        })   
    }, [])

    const openDialog = (): void => {
        setDialog(prevDialog=> {
            return {...prevDialog, ['isOpen']: true}
        })
        dialogRef.current?.showModal()
    }

    const closeDialog = (): void => {
        setDialog(prevDialog=> ({...prevDialog, isOpen: false}))
        dialogRef.current?.close()
    }

    return  <AppContext.Provider value={{isLoggedIn, signedInUser, auth, setDialog, openDialog}}>
                <Outlet />
                <dialog className={`${dialog.isOpen ? 'flex' : ''} flex-col gap-6 items-start w-[70%] max-w-[300px] p-5 backdrop:bg-zinc-900/40 font-inter rounded-lg`}
                        ref={dialogRef}>
                    <p className='text-base font-medium'>{dialog.message}</p>
                    <button className='self-end bg-red-800 text-zinc-100 font-semibold tracking-wide rounded-lg px-[.5em] py-[.25em] ml-6' onClick={closeDialog}>Close</button>
                </dialog>
            </AppContext.Provider>
}