import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function SavedFilmPoster({
  film,
}: {
  film: DocumentData;
}): JSX.Element {
  const { poster, name, filmType, filmId } = film;

  return (
    <>
      {poster ? (
        <Link
          to={`/${filmType}/${name}+${filmId}`}
          className="grid grid-cols-1 grid-rows-1 min-h-[200px] max-h-[280px]"
        >
          <img
            className="col-start-1 row-start-1 z-[8] w-full h-full object-cover object-center rounded-t-md cursor-pointer"
            src={poster}
            alt={name}
            title={name}
            loading="lazy"
          ></img>
          <span className="block col-start-1 row-start-1 z-[7] w-full h-full bg-zinc-900/40 animate-pulse"></span>
        </Link>
      ) : (
        <Link
          to={`/${filmType}/${name}+${filmId}`}
          className="flex items-center justify-center min-h-[200px] max-h-[280px] bg-zinc-800/40 cursor-pointer"
        >
          <svg
            className="w-12 h-12 lg:w-[72px] lg:h-[72px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#ffffff "
          >
            <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62ZM240-428.54l160-160 160 160 160-160 40 40v-186.84q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H224.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v266.84l40 40ZM224.62-200h510.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-267.07l-40-40-160 160-160-160-160 160-40-40v187.07q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92ZM200-200v-291.69 40V-760v560Z" />
          </svg>
        </Link>
      )}
    </>
  );
}
