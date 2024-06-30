import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import Loader from '../loader/loader';
import { AppContext } from '../../contexts/AppContext';
import { TAppContext } from '../../types/appTypes';

export default function AuthRequired(): JSX.Element {
    const { isLoggedIn } = useContext(AppContext) as TAppContext

    return (
        <>
            {isLoggedIn === null ? <Loader /> : isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace={true} />}
        </>
    )
}