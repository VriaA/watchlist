import { FormEvent, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import app from "../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import Loader from "../assets/images/loader.svg"
import { useNavigate } from "react-router-dom"

type newUser = {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Authentication():JSX.Element {
    const auth = getAuth(app)
    const location = useLocation()
    const isSignIn = location.pathname === '/sign-in'
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [newUser, setNewUser] = useState<newUser>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const formRef = useRef<HTMLFormElement | null>(null)
    const emailInputRef = useRef<HTMLInputElement | null>(null)
    const passwordInputRef = useRef<HTMLInputElement | null>(null)
    const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null)
    const authErrorMessageRef = useRef<HTMLSpanElement | null>(null)
    const isBothFilled: boolean = (newUser.password.trim().split('').length > 0) && (newUser.confirmPassword.trim().split('').length > 0)
    const isMatch: boolean = newUser.password === newUser.confirmPassword
    const PASSWORD_INPUT_BORDER_CLASS = isBothFilled && isMatch ? 'border-green-600' : isBothFilled && !isMatch ? 'border-red-700' : 'border-zinc-300'
    
    useEffect(()=>{
        if(!formRef.current) return
        const form = formRef.current
        clearUserDetails(form)
    }, [location.pathname])

    function updateUserDataOnChange(e: FormEvent): void {
        const input = e.target as HTMLFormElement
        const key: string = input.name
        const value: string = input.value
    
        setNewUser(prevUser=> ({...prevUser, [key]: value}))
    }
    
    function authenticateOnSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const { email, password, confirmPassword } = newUser
        
        if(!isSignIn && password !== confirmPassword) {
            showErrorMessage(`Passwords do not match.`)
        } else {
            setLoading(true)
            isSignIn ? signIn(email, password, form) : createAccount(email, password, form)
        }
    }

    function signIn(email: string, password: string, form: HTMLFormElement) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials)=> {
            const user = userCredentials.user
            if(user) {
                clearUserDetails(form)
                navigate('/watchlist', {replace: true})
            }
        })
        .catch((error)=> showErrorMessage(error.message))
        .finally(()=> {setLoading(false)})
    }

    function createAccount(email: string, password: string, form: HTMLFormElement) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials)=> {
            const user = userCredentials.user
            if(user) {
                clearUserDetails(form)
                navigate('/watchlist', {replace: true})
            }
        })
        .catch((error)=> showErrorMessage(error.message))
        .finally(()=> setLoading(false))
    }

    function clearUserDetails(form: HTMLFormElement): void {
        setNewUser((prevUser): newUser=> {
            prevUser = { email: '', password: '', confirmPassword: '' }
            return prevUser 
        })
        form.reset()
    }
    
    function showErrorMessage(message: string) {
        if(!authErrorMessageRef.current) return
        authErrorMessageRef.current.textContent = message
        authErrorMessageRef.current.parentElement?.parentElement?.classList.remove('hidden')
        setTimeout(()=> authErrorMessageRef.current?.parentElement?.parentElement?.classList.add('hidden'), 6000) 
    }
    
    return (
        <div className="w-screen min-h-screen bg-authBg bg-cover bg-center bg-red-800 bg-blend-overlay">
            <div className="flex justify-center items-center w-screen min-h-screen backdrop-blur-sm overflow-y-auto">
                <section className="flex flex-col w-[80%] md:w-[30%] rounded-lg bg-zinc-900 px-8 py-8">
                    <h1 className="self-center font-robotoCondensed text-4xl text-slate-50 font-semibold leading-none">Welcome{isSignIn && ' back'}!</h1>
                    <p className="self-center font-inter mt-2 mb-8 text-base text-zinc-400">{isSignIn ? 'Sign in to access your watchlist.' : 'Sign up to add movies to your watchlist.'}</p>
                    <form onSubmit={authenticateOnSubmit} ref={formRef}>
                        <fieldset className="relative flex flex-col gap-6">
                            <input  className="box-border h-10 leading-none p-2 text-zinc-300 font-inter bg-transparent outline-none border border-zinc-300 rounded-lg"
                                    type="text" 
                                    placeholder="Email address" 
                                    name="email" 
                                    onChange={updateUserDataOnChange}
                                    ref={emailInputRef}
                                    required
                                    autoComplete="off"
                            />
                            <input  className={`${PASSWORD_INPUT_BORDER_CLASS} box-border h-10 leading-none p-2 text-zinc-300 font-inter bg-transparent outline-none border rounded-lg`} 
                                    type="password" 
                                    placeholder="Password" 
                                    name="password"
                                    onChange={updateUserDataOnChange}
                                    ref={passwordInputRef}
                                    required 
                            />
                            {!isSignIn && 
                                <input  className={`${PASSWORD_INPUT_BORDER_CLASS} box-border h-10 leading-none p-2 text-zinc-300 font-inter bg-transparent outline-none border rounded-lg`}
                                    type="password" 
                                    placeholder="Confirm password" 
                                    name="confirmPassword"
                                    onChange={updateUserDataOnChange}
                                    ref={confirmPasswordInputRef}
                                    required
                                />
                            }
                            
                            <p className="absolute hidden z-10 self-center top-[110%] px-2 py-1 text-sm text-zinc-950 font-semibold bg-slate-100 rounded-lg">
                                <span className="relative flex items-center gap-1 before:absolute before:top-[-22px] before:left-0 before:block before:border-x-transparent before:border-x-[10px] before:border-t-transparent before:border-t-[10px] before:border-b-[12px] before:border-b-slate-100 before:z-[9]">
                                    <span className="material-symbols-outlined text-red-600">error</span>
                                    <span ref={authErrorMessageRef}></span>
                                </span>
                            </p>
                        </fieldset>
                        <button className="grid place-content-center box-border h-12 leading-none w-full mt-10 py-2 bg-red-800 hover:bg-red-900 text-slate-50 font-inter font-semibold rounded-lg transition-all active:translate-y-1">
                            {loading ? <img className="w-8 h-8" src={Loader} alt="Loading..." /> : isSignIn ? 'Sign in' : 'Create account'}
                        </button>
                    </form>
                    <p className="text-sm font-light font-inter mt-8 self-center text-slate-50">
                        {isSignIn ? 'New here?' : 'Already have an account?'}&nbsp;
                        <Link to={`${isSignIn ? '/sign-up' : '/sign-in'}`} replace={true} className="text-red-700 text-base font-semibold hover:underline hover:underline-offset-2">{isSignIn ? 'Sign up': 'Sign in'}</Link>
                    </p>
                </section>
            </div>
        </div>
    )
}