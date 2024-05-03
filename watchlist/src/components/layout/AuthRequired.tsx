import {Outlet, Navigate} from 'react-router-dom'

export default function AuthRequired(): JSX.Element {
    const isLoggedIn: boolean = false
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />
    )
}