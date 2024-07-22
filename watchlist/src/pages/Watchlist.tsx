import Loader from "../components/loader/loader";
import WatchlistFilms from "../components/watchlist/WatchlistFilms";
import { AppContext } from "../contexts/AppContext";
import { TAppContext } from "../types/appTypes";
import { useContext } from "react";
import Header from "../components/watchlist/Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Watchlist(): JSX.Element {
  const { userWatchlist, loading, canAnimate } = useContext(AppContext) as TAppContext;

  useGSAP(() => {
    if (!canAnimate || !userWatchlist) return
    const tl = gsap.timeline()
    const heading = document.querySelector('.heading-gsap')
    const navs = document.querySelectorAll('.nav-gsap')
    const films = document.querySelectorAll('.film-gsap')
    tl.to(heading, { scale: 1, opacity: 1, duration: .2 })
    tl.to(navs, { opacity: 1, duration: .2, stagger: .1 }, "<")
    tl.to(films, { y: 0, opacity: 1, duration: .2, stagger: .1 })
  }, { dependencies: [canAnimate, userWatchlist] })

  return (
    <>
      {loading && <Loader style="absolute left-0 top-0 flex-1 z-[9999]" />}
      {userWatchlist && (
        <>
          <Header />
          <WatchlistFilms />
        </>
      )}
    </>
  );
}
