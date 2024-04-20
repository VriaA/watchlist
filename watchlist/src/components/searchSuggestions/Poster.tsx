import imageBaseUrl from "../../utils/imageBaseUrl.ts";

export default function Poster({poster, id, type}: {poster: string, id: number, type: string}) {

    return (
        <>
            { poster ? 
                <img className="w-16 h-20 flex-none rounded-md" src={`${imageBaseUrl}${poster}`} />
            :   <span className="grid place-content-center w-16 h-20 flex-none bg-zinc-900/40 rounded-md">
                    <span className="material-symbols-outlined text-2xl lg:text-3xl text-slate-100 font-thin">
                        broken_image
                    </span>
                </span>
        }
        </>
    )
}