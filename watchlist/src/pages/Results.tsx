import FilmResults from "../components/results/FilmResults"
import ResultsContextProvider from "../contexts/ResultsContext"
import Header from "../components/results/Header"

export default function Results(): JSX.Element {
    
    return (
        <>
            <ResultsContextProvider>
                <Header />
                <FilmResults />
            </ResultsContextProvider>
        </>
    )
}