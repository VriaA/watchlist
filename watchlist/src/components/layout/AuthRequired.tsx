import {Outlet, Navigate} from 'react-router-dom'

export default function AuthRequired(): JSX.Element {
    const isLoggedIn: boolean = true
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/auth" />
    )
}