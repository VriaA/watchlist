export default function EmptyPoster() {
    return (
        <span className="card relative min-h-[245px] lg:w-[242px] lg:h-[350px] no-poster" data-id="${id}" data-type="${media_type || type}">
            <span className="absolute inset-0 m-auto h-fit w-fit material-symbols-outlined text-5xl lg:text-7xl text-white font-thin" data-id="${id}" data-type="${media_type || type}">
                broken_image
            </span>
            <p className="text-xs lg:text-sm capitalise font-normal p-2" data-result-id="${id}" data-result-type="${media_type || type}">
                {/* ${(name || original_name) || (title || original_title)} */}
            </p>
        </span>
    )
}