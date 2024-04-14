import SearchResult from "../components/results/SearchResult"

export default function Results(): JSX.Element {
    return (
        <main className="gallery-cntr relative z-20 flex items-center justify-center w-full min-h-[300px] pt-4 lg:mt-[2%]">
            <SearchResult />
        </main>
    )
}