import imageBaseUrl from "../utils/imageBaseUrl.js";

export default function Suggestion(suggestions) {
    return suggestions.map(suggestion=> {
        if(suggestion) {
            const {id, media_type, title, name, first_air_date, release_date, poster_path} = suggestion
            const date = first_air_date || release_date
            const filmTitle = title || name
            return `<li class="max-w-[90%] flex gap-2 text-xs md:text-sm"
                        title="Suggestion" data-id="${id} data-type="${media_type}">
                        ${getSuggestionPoster(poster_path, id, media_type)}
                        <div class="flex flex-col gap-1 justify-center items-start">
                        <h3 class="font-normal hover:underline cursor-pointer" data-id="${id}" data-type="${media_type}">${filmTitle} ${date ? `(${date.split('-')[0]})` : ''}</h3>
                        <p class="px-2 py-1 text-[10px] md:text-xs font-light bg-zinc-900/40 border rounded-md">
                            ${media_type === 'movie' ? 'Movie' : 'Series'}
                        </p>
                        </div>
                    </li>`
        }
    }).join('')
}

function getSuggestionPoster(poster, id, type) {
    if(poster) {
        return `<img class="w-16 h-20 flex-none rounded-md" src="${imageBaseUrl}${poster}"
                        data-id="${id}" data-type="${type}">`
    } else {
        return `<span class="grid place-content-center w-16 h-20 flex-none bg-zinc-900/40 rounded-md"
                        data-id="${id}" data-type="${type}">
                    <span class="material-symbols-outlined text-2xl lg:text-3xl
                                text-slate-100 font-thin"
                                data-id="${id}" data-type="${type}">
                        broken_image
                    </span>
                </span>`
    }
}