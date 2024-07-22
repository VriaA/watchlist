import { useLocation, useSearchParams } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import getSearchResults from "../utils/getSearchResults";
import { TResults } from "../types/resultTypes";
import { TChildren } from "../types/appTypes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AppContext } from "../contexts/AppContext";
import { TAppContext } from "../types/appTypes";

export type TResultsContext = {
  results: string | TResults | [],
  gsapTl: gsap.core.Timeline | null
}
export const ResultsContext = createContext<TResultsContext | null>(null);

export default function ResultsContextProvider({
  children,
}: TChildren): JSX.Element {
  const [results, setResults] = useState<TResults | [] | string>([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { canAnimate } = useContext(AppContext) as TAppContext
  const [gsapTl, setGsapTl] = useState<gsap.core.Timeline | null>(null)

  useGSAP(() => {
    if (!canAnimate) return
    const tl = gsap.timeline()
    setGsapTl(() => tl)
  }, [canAnimate])

  useEffect((): void => {
    setResults([]);

    const title: string | null = searchParams.get("title");

    async function getResults() {
      const results = (await getSearchResults(title)) as TResults;
      setResults(results);
    }

    title ? getResults() : setResults("Please enter a valid title to search.");
  }, [location.search]);

  return (
    <ResultsContext.Provider value={{ results, gsapTl }}>
      {children}
    </ResultsContext.Provider>
  );
}
