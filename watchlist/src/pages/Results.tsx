import FilmResults from "../components/results/FilmResults"
import ResultsContextProvider from "../contexts/ResultsContext"

export default function Results(): JSX.Element {
    
    return (
        <main className="gallery-cntr flex-1 relative z-20 flex items-center justify-center w-full pt-4 md:pt-0 min-h-[300px] lg:mt-[2%]">
            <ResultsContextProvider>
                <FilmResults />
            </ResultsContextProvider>
        </main>
    )
}