import FilmResults from "../components/results/FilmResults";
import ResultsContextProvider from "../contexts/ResultsContext";
import Header from "../components/results/Header";

export default function Results(): JSX.Element {
  return (
    <>
      <div className="w-screen h-screen page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
        <div className=" w-screen h-screen grid place-content-center">
          <div
            id="root"
            className="content-cntr overflow-y-auto lg:overflow-hidden"
          >
            <ResultsContextProvider>
              <Header />
              <FilmResults />
            </ResultsContextProvider>
          </div>
        </div>
      </div>
    </>
  );
}
