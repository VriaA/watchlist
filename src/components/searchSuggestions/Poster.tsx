import imageBaseUrl from "../../utils/imageBaseUrl.ts";

export default function Poster({ poster }: { poster: string }) {
  return (
    <>
      {poster ? (
        <img
          className="w-16 h-20 flex-none rounded-md"
          src={`${imageBaseUrl}${poster}`}
        />
      ) : (
        <span className="grid place-content-center w-16 h-20 flex-none bg-zinc-900/40 rounded-md">
          <svg
            className="absolute inset-0 m-auto w-6 h-6 lg:w-[30px] lg:h-[30px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#f1f5f9"
          >
            <path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62ZM240-428.54l160-160 160 160 160-160 40 40v-186.84q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H224.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v266.84l40 40ZM224.62-200h510.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-267.07l-40-40-160 160-160-160-160 160-40-40v187.07q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92ZM200-200v-291.69 40V-760v560Z" />
          </svg>
        </span>
      )}
    </>
  );
}
