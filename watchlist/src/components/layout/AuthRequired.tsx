import {Outlet, Navigate} from 'react-router-dom'
import app from '../../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import Loader from '../loader/loader';
 
export default function AuthRequired(): JSX.Element {
    const auth = getAuth(app)
    const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(null)

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => 
                setisLoggedIn(user ? true : false) );
    }, [])

    return (
        <div className="w-screen h-screen page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
            <div className=" w-screen h-screen grid place-content-center">
                <div className="content-cntr overflow-y-auto lg:overflow-hidden">  
                    <div className="flex-1 flex flex-col justify-center items-center">
                        {isLoggedIn === null ? <Loader /> : isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace={true} />}
                    </div>
                </div>
            </div>
        </div>
    )
}