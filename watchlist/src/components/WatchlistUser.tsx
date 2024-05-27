import { Link } from "react-router-dom"
import { useRef, MouseEvent, useContext, useState } from "react"
import { signOut, deleteUser, User } from "firebase/auth"
import { AppContext } from "../contexts/AppContext"
import { TAppContext } from "../types/appTypes"
import useCloseOnClickOutside from "../hooks/useCloseOnClickOutside"
import Loader from "./loader/loader"

export default function WatchlistUser() {
    const userMenuRef = useRef<HTMLUListElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const { isLoggedIn, signedInUser, auth, setDialog, openDialog} = useContext(AppContext) as TAppContext
    const [loading, setLoading] = useState<boolean>(false)
    
    useCloseOnClickOutside(userMenuRef, triggerRef)

    function signUserOut() {
        setLoading(prevLoading=> !prevLoading)
        signOut(auth)  
        .then(()=> {
            setDialog(prevDialog=> ({...prevDialog, message:`Sign out complete.`}))
            openDialog()
        })
        .catch(error=> {
            setDialog(prevDialog=> ({...prevDialog, message:error.message}))
            openDialog()
        })
        .finally(()=> setTimeout(()=> setLoading(prevLoading=> !prevLoading), 1000) )
    }

    function deleteAccount() {
        setLoading(prevLoading=> !prevLoading)
        deleteUser((signedInUser as User))
        .then(()=> {
            setDialog(prevDialog=> ({...prevDialog, message:`Account deleted successfully.`}))
            openDialog()
        })
        .catch(error=> {
            setDialog(prevDialog=> ({...prevDialog, message:error.message}))
            openDialog()
        })
        .finally(()=> setTimeout(()=> setLoading(prevLoading=> !prevLoading), 1000) )
    }
    
    function toggleUserMenuVisibility(e: MouseEvent) {
        const trigger = e.currentTarget as HTMLButtonElement
        const menuId = trigger.id.split('-').slice(0, -1).join('-')
        const menu = document.getElementById(menuId)
        menu?.classList.toggle('hidden')
        menu?.classList.toggle(`${'flex' || 'grid' || 'block' }`)
        trigger.setAttribute('aria-expanded', `${menu?.classList.contains('hidden') ? false : true}`)
    }

    return (
        <div className="relative overflow-visible">
            {loading && 
                <div className="fixed z-[9999] inset-0 grid place-content-center">
                    <Loader />
                </div>}
            <button id="user-menu-trigger"
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    aria-expanded={false}
                    aria-label="User menu"
                    onClick={toggleUserMenuVisibility}
                    ref={triggerRef}
                className='grid place-content-center w-10 h-10 bg-zinc-900/40 rounded-full cursor-pointer hover:bg-zinc-900/70 overflow-hidden transition-all hover:-translate-y-[2px] active:translate-y-[2px]'>
                {signedInUser?.photoURL ? 
                    <img className='' src={signedInUser.photoURL} alt={signedInUser.displayName || 'User'} />
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path fill="#fafafa" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                }
            </button> 
            
            <ul id="user-menu" 
                role="menu" 
                aria-labelledby="user-menu-trigger"
                ref={userMenuRef}
                className="hidden absolute top-[calc(100%+16px)] right-0 z-50 w-fit flex-col gap-4 p-4 bg-zinc-900/40 text-slate-100 rounded-lg">
                {!isLoggedIn && <Link className="group flex flex-row-reverse gap-2 items-center w-max transition-all hover:-translate-y-1 active:translate-y-1" to={"/sign-in"}>
                    <span className="text-base min-[375px]:text-lg font-robotoCondensed font-normal after:block after:w-0 group-hover:after:w-2/3 group-hover:drop-shadow-watchlist after:border-b-2 after:transition-all after:border-white">Sign in </span>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                        <path fill="#fafafa" d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg> 
                </Link>}

                {isLoggedIn && <button className="group flex flex-row-reverse gap-2 items-center w-max transition-all hover:-translate-y-1 active:translate-y-1" onClick={signUserOut}>
                    <span className="text-base min-[375px]:text-lg font-robotoCondensed font-normal after:block after:w-0 group-hover:after:w-2/3 group-hover:drop-shadow-watchlist after:border-b-2 after:transition-all after:border-white">Sign out</span>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                        <path fill="#fafafa" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                    </svg>
                </button> }

                {isLoggedIn && <button className="group flex flex-row-reverse gap-2 items-center w-max transition-all hover:-translate-y-1 active:translate-y-1 hover:text-red-500" onClick={deleteAccount}>
                    <span className="text-base min-[375px]:text-lg font-robotoCondensed font-normal after:block after:w-0 group-hover:after:w-2/3 group-hover:drop-shadow-watchlist after:border-b-2 after:transition-all after:border-red-500">Delete account</span>
                    <svg className="fill-zinc-100 group-hover:fill-red-500 " xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512">
                        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                    </svg>
                </button> }
            </ul>
        </div>
    )
}