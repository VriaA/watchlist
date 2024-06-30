import WatchlistFilms from "../components/watchlist/WatchlistFilms"

export default function Watchlist(): JSX.Element {

    return (
        <div className="w-screen h-screen page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
            <div className="w-screen h-screen grid place-content-center">
                <div className="content-cntr overflow-y-auto">
                    <WatchlistFilms />
                </div>
            </div>
        </div>
    )
}