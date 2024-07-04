import { FormEvent, useEffect, useRef, useState, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { deleteDoc, doc } from "firebase/firestore"
import { app, db } from "../firebase"
import { User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, reauthenticateWithCredential, deleteUser, AuthCredential, EmailAuthProvider, reauthenticateWithPopup, UserCredential } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../contexts/AppContext"
import { TAppContext } from "../types/appTypes"

type newUser = {
    email: string;
    password: string;
    confirmPassword: string;
}

type TAuthError = {
    isMessageShown: boolean;
    message: string | null;
}

export default function Authentication(): JSX.Element {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const location = useLocation()
    const isSignIn = location.pathname === '/sign-in'
    const isSignUp = location.pathname === '/sign-up'
    const isDeleteAccount = location.pathname === '/delete-account'
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState<newUser>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [authError, setAuthError] = useState<TAuthError>(() => ({ isMessageShown: false, message: null }))
    const formRef = useRef<HTMLFormElement | null>(null)
    const emailInputRef = useRef<HTMLInputElement | null>(null)
    const passwordInputRef = useRef<HTMLInputElement | null>(null)
    const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null)
    const isBothFilled: boolean = (newUser.password.trim().split('').length > 0) && (newUser.confirmPassword.trim().split('').length > 0)
    const isMatch: boolean = newUser.password === newUser.confirmPassword
    const PASSWORD_INPUT_BORDER_CLASS = isBothFilled && isMatch ? 'border-green-600' : isBothFilled && !isMatch ? 'border-red-700' : 'border-zinc-300'
    const { setDialog, openDialog, loading, setLoading, userWatchlist, setUserWatchlist } = useContext(AppContext) as TAppContext

    useEffect(() => {
        if (!formRef.current) return
        const form = formRef.current
        clearUserDetails(form)
    }, [location.pathname])

    function updateUserDataOnChange(e: FormEvent): void {
        const input = e.target as HTMLFormElement
        const key: string = input.name
        const value: string = input.value

        setNewUser(prevUser => ({ ...prevUser, [key]: value }))
    }

    function authenticateWithEmailAndPassword(e: FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const { email, password, confirmPassword } = newUser

        if (isSignUp && password !== confirmPassword) {
            showErrorMessage(`Passwords do not match.`)
        } else {
            setLoading(true)
            if (isSignIn) {
                signIn(email, password, form)
            } else if (isSignUp) {
                createAccount(email, password, form)
            } else {
                const credential = EmailAuthProvider.credential(email, password)
                deleteAccount((auth.currentUser as User), 'emailAndPassword', credential)
            }
        }
    }

    async function signIn(email: string, password: string, form: HTMLFormElement) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential) {
                clearUserDetails(form)
                setLoading(() => false)
                navigate('/watchlist', { replace: true })
            }
        } catch (error: any) {
            setLoading(() => false)
            showErrorMessage(error.message)
        }
    }

    async function authenticateWithGoogle() {
        try {
            setLoading(() => true)
            if (isDeleteAccount) {
                await deleteAccount(auth.currentUser as User, 'google')
            } else {
                const userCredential = await signInWithPopup(auth, provider)
                if (userCredential) {
                    setLoading(() => false)
                    !isDeleteAccount && navigate('/watchlist', { replace: true })
                }
            }
        } catch (error: any) {
            setLoading(() => false)
            setDialog((prevDialog) => ({ ...prevDialog, message: error.message }))
            openDialog()
        }
    }

    async function deleteAccount(user: User, method: string, credential?: AuthCredential) {
        try {
            let userCredential: UserCredential;
            if (method === 'emailAndPassword') {
                userCredential = await reauthenticateWithCredential(user, credential as AuthCredential)
            } else {
                userCredential = await reauthenticateWithPopup(user, provider)
            }
            if (userCredential) {
                await deleteUser((user))
                await deleteUserWatchlistData()
                setDialog(prevDialog => ({ ...prevDialog, message: `Account deleted successfully.` }))
                openDialog()
                setLoading(() => false)
                navigate('/', { replace: true })
            }
        } catch (error: any) {
            setDialog(prevDialog => ({ ...prevDialog, message: error.message }))
            openDialog()
            setLoading(() => false)
        }
    }

    function deleteUserWatchlistData() {
        if (!userWatchlist) return
        const promises = userWatchlist.map((film) => deleteDoc(doc(db, 'watchlist', film.docId)))
        setUserWatchlist(() => [])
        return Promise.all(promises)
    }

    async function createAccount(email: string, password: string, form: HTMLFormElement) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            if (userCredential) {
                clearUserDetails(form)
                setLoading(() => false)
                navigate('/watchlist', { replace: true })
            }
        } catch (error: any) {
            showErrorMessage(error.message)
        } finally {
            setLoading(() => false)
        }
    }

    function clearUserDetails(form: HTMLFormElement): void {
        setNewUser((prevUser): newUser => {
            prevUser = { email: '', password: '', confirmPassword: '' }
            return prevUser
        })
        form.reset()
    }

    function showErrorMessage(message: string) {
        setAuthError((prev) => ({ ...prev, isMessageShown: true, message: message }))
        setTimeout(() => setAuthError((prev) => ({ ...prev, isMessageShown: false, message: null })), 6000)
    }

    return (
        <div className="w-screen min-h-screen bg-authBg bg-cover bg-center bg-red-800 bg-blend-overlay">
            <div className="flex justify-center items-center w-screen min-h-screen backdrop-blur-sm overflow-y-auto">
                <section className="flex flex-col items-center w-[80%] md:w-[30%] rounded-lg bg-zinc-900/80 px-8 py-8">
                    <h1 className="self-center font-robotoCondensed text-4xl text-slate-50 font-semibold leading-none">{isDeleteAccount ? 'Sad to see you go!' : `Welcome${isSignIn ? ' back' : ''}!`}</h1>
                    <p className="self-center font-inter mt-2 mb-8 text-base text-zinc-400">{isSignIn ? 'Sign in to access your watchlist.' : isDeleteAccount ? 'Confirm account ownership before deleting.' : 'Sign up to add movies to your watchlist.'}</p>
                    <form className="flex-none w-full" onSubmit={authenticateWithEmailAndPassword} ref={formRef}>
                        <fieldset className="relative flex flex-col gap-6 w-full">
                            <input className="box-border h-10 leading-none p-2 text-zinc-300 font-inter bg-transparent outline-none border border-zinc-300 rounded-lg"
                                type="text"
                                placeholder="Email address"
                                name="email"
                                onChange={updateUserDataOnChange}
                                ref={emailInputRef}
                                required
                                autoComplete="off"
                            />
                            <input className={`${PASSWORD_INPUT_BORDER_CLASS} box-border h-10 leading-none p-2 text-zinc-300 font-inter bg-transparent outline-none border rounded-lg`}
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={updateUserDataOnChange}
                                ref={passwordInputRef}
                                required
                            />
                            {isSignUp &&
                                <input className={`${PASSWORD_INPUT_BORDER_CLASS} box-border h-10 leading-none p-2 text-zinc-300 font-inter bg-transparent outline-none border rounded-lg`}
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    onChange={updateUserDataOnChange}
                                    ref={confirmPasswordInputRef}
                                    required
                                />
                            }

                            {
                                authError.isMessageShown &&
                                <p className="absolute z-10 self-center top-[110%] px-2 py-1 text-sm text-zinc-950 font-semibold bg-slate-100 rounded-lg">
                                    <span className="relative flex items-center gap-1 before:absolute before:top-[-22px] before:left-0 before:block before:border-x-transparent before:border-x-[10px] before:border-t-transparent before:border-t-[10px] before:border-b-[12px] before:border-b-slate-100 before:z-[9]">
                                        <span className="material-symbols-outlined text-red-600">error</span>
                                        <span>{authError.message}</span>
                                    </span>
                                </p>
                            }

                        </fieldset>
                        <button className={`${loading ? 'cursor-not-allowed' : ''} grid place-content-center box-border h-12 leading-none w-full mt-10 py-2 bg-red-800 hover:bg-red-900 text-slate-50 font-inter font-semibold rounded-lg transition-all active:translate-y-1`}
                            disabled={loading ? true : false}>
                            {loading ? <svg aria-label="Loading..." xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="32" height="32" style={{ shapeRendering: 'auto', display: 'block', background: 'transparent' }} xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" stroke="#ffffff" fill="none" cy="50" cx="50">
                                <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                            </circle><g></g></g></svg>
                                : isSignIn ? 'Sign in'
                                    : isDeleteAccount ? 'Confirm'
                                        : 'Create account'}
                        </button>
                    </form>
                    {!isDeleteAccount &&
                        <p className="text-sm font-light font-inter mt-8 self-center text-slate-50">
                            {isSignIn ? 'New here?' : 'Already have an account?'}&nbsp;
                            <Link to={`${isSignIn ? '/sign-up' : '/sign-in'}`} replace={true} className="text-red-700 text-base font-semibold hover:underline hover:underline-offset-2">{isSignIn ? 'Sign up' : 'Sign in'}</Link>
                        </p>
                    }

                    <p className="flex items-center justify-center gap-2 w-full overflow-hidden h-fit my-5 p-0 text-base font-inter font-light text-zinc-300 leading-none before:block before:flex-none before:w-full before:mt-[1%] before:h-[1px] before:bg-[#99999940] after:block after:flex-none after:w-full after:mt-[1%] after:h-[1px] after:bg-[#99999940]">or</p>
                    <button
                        className={`${loading ? 'cursor-not-allowed' : ''} flex gap-2 items-center text-sm font-inter font-light text-slate-50 hover:underline hover:underline-offset-2`}
                        onClick={authenticateWithGoogle}
                        disabled={loading ? true : false}>
                        <svg aria-label="Google logo" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.9996 19.6363V28.9309H36.916C36.3488 31.9199 34.6468 34.4509 32.0941 36.1527L39.8831 42.1964C44.4213 38.0075 47.0395 31.8547 47.0395 24.5456C47.0395 22.8438 46.8868 21.2073 46.6031 19.6366L23.9996 19.6363Z" fill="#4285F4" />
                            <path d="M10.5494 28.568L8.79263 29.9128L2.57434 34.7564C6.52342 42.589 14.6174 48 23.9991 48C30.4789 48 35.9116 45.8618 39.8826 42.1964L32.0936 36.1528C29.9554 37.5927 27.2281 38.4656 23.9991 38.4656C17.7591 38.4656 12.4575 34.2547 10.5592 28.5819L10.5494 28.568Z" fill="#34A853" />
                            <path d="M2.57436 13.2436C0.938084 16.4726 0 20.1163 0 23.9999C0 27.8834 0.938084 31.5271 2.57436 34.7561C2.57436 34.7777 10.5599 28.5597 10.5599 28.5597C10.08 27.1197 9.79624 25.5925 9.79624 23.9996C9.79624 22.4067 10.08 20.8795 10.5599 19.4395L2.57436 13.2436Z" fill="#FBBC05" />
                            <path d="M23.9996 9.55636C27.5342 9.55636 30.676 10.7781 33.1851 13.1345L40.0577 6.2619C35.8904 2.37833 30.4797 0 23.9996 0C14.6179 0 6.52342 5.38908 2.57434 13.2437L10.5597 19.44C12.4578 13.7672 17.7596 9.55636 23.9996 9.55636Z" fill="#EA4335" />
                        </svg>
                        Continue with google
                    </button>
                </section>
            </div>
        </div>
    )
}