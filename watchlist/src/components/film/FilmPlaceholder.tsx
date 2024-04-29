export default function FilmPlaceholder(): JSX.Element {
    return (
        <div className="min-h-[100%] flex flex-col gap-12 md:gap-0 justify-end md:flex-row md:justify-between md:items-center mt-5 p-[4%] pb-[10%] md:p-[2%]">
            <div className="flex flex-col gap-2 md:gap-4 md:w-[50%]">
                <div className="w-[40%] h-6 md:h-8 bg-zinc-600/50 animate-pulse rounded-md"></div>

                <div className="flex flex-wrap gap-3 items-center">
                    <div className="w-[15%] h-2 md:h-4 bg-zinc-500/40 animate-pulse rounded-md"></div>
                    <span className="text-zinc-500/40 animate-pulse rounded-md">&#9679;</span>
                    <div className="w-[15%] h-2 md:h-4 bg-zinc-500/40 animate-pulse rounded-md"></div>
                    <span className="text-zinc-500/40 animate-pulse rounded-md">&#9679;</span>
                    <div className="w-[15%] h-2 md:h-4 bg-zinc-500/40 animate-pulse rounded-md"></div>
                </div>

                <div className="flex flex-col gap-4"> 
                    <div className="w-full h-3 md:h-5 bg-zinc-500/40 animate-pulse rounded-md"></div>
                    <div className="w-full h-3 md:h-5 bg-zinc-500/40 animate-pulse rounded-md"></div>
                    <div className="w-full h-3 md:h-5 bg-zinc-500/40 animate-pulse rounded-md"></div>
                </div>

                <div className="flex flex-wrap gap-3 items-center text-sm md:text-base">
                    <div className="w-[15%] h-2 md:h-4 bg-zinc-500/40 animate-pulse rounded-md"></div>
                    <span className="text-zinc-500/40 animate-pulse rounded-md">&#9679;</span>
                    <div className="w-[15%] h-2 md:h-4 bg-zinc-500/40 animate-pulse rounded-md"></div>
                    <div className="text-zinc-500/40 animate-pulse rounded-md">&#9679;</div>
                    <div className="w-[15%] h-2 md:h-4 bg-zinc-500/40 animate-pulse rounded-md"></div>
                </div>
            </div>

            <div className="md:w-[45%]">
                <div className="flex justify-end md:justify-center items-center gap-2">
                    <div className="h-16 md:h-24 w-16 md:w-24 bg-zinc-600/40 animate-pulse rounded-full"></div>
                    <div className="w-[25%] h-3 md:h-5 bg-zinc-500/40 animate-pulse rounded-md"></div>
                </div>
            </div>
        </div>
    )
}