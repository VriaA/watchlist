import Header from '../header/Header'
import {Outlet} from 'react-router-dom'
export default function AppLayout(): JSX.Element {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}