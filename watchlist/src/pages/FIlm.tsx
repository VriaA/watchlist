import { useLocation } from "react-router-dom"
import useFetch from "../hooks/useFetch"

export default function Film(): JSX.Element {
    const location = useLocation()
    const type: string = location.pathname.trim().split('/')[1]
    const id: string = location.pathname.trim().split('/')[2].split('+')[1]
    const url: string = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=credits%2Cvideos%2Csimilar&language=en-US`
    const { results, error, loading } = useFetch(url)

    return (
        <>
            {
                loading ? <h1>loading...</h1> :
                results ? <h1>{`${results}`}</h1> :
                <h1>{error}</h1>
            }
        </>
    )
}