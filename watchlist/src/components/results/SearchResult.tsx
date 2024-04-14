import Posters from "./Posters"
export default function SearchResult(results: string[]) {
    return (
        <>
            {results && results.length > 0 ? <Films {...results} /> : <NoResult /> } 
        </>
    )
}

function Films(results: string[]): JSX.Element {
    return (
        <>
        <div id="back-btn" className="cursor-pointer">
            <span id="results-left-arrow" className="left-arrow material-symbols-outlined hidden lg:inline-block text-5xl md:text-7xl font-light" data-arrow="results">
                keyboard_arrow_left
            </span>
        </div>

        <div id="gallery-results" className="grid z-20 gallery min-w-full h-full lg:pl-2 lg:min-w-[248px] lg:max-w-[66%] rounded-md overflow-x-scroll overflow-y-auto lg:overflow-y-hidden" data-gallery="results">
            <div className="films cards-cntr w-full h-full grid grid-cols-2 md:grid-cols-3 lg:flex ${results.length > 2 ? 'justify-center' : ''} lg:justify-start gap-2 md:gap-5 md:mb-5 lg:mb-0 lg:py-5">
                <Posters />
            </div>
        </div>

        <div id="results-right-arrow" className="cursor-pointer">
            <span className=" right-arrow hidden lg:inline-block material-symbols-outlined text-5xl md:text-7xl font-light" data-arrow="results">
                keyboard_arrow_right
            </span>
        </div>
    </>
    )
}

function NoResult():JSX.Element {
    return (
        <div className="absolute inset-0 w-2/3 h-fit m-auto flex flex-col items-center text-center gap-2">
            <p className="text-base font-semibold">Unable to find what you&apos;re looking for.</p>
            <span className="material-symbols-outlined text-5xl font-medium">error</span>
        </div>
    )
}