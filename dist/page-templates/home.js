
export default function getHomeHTML() {
    return `<div class="page-wrapper bg-homeImg bg-wrapperImgPosition md:bg-wrapperImgPositionMd">
                <div class="content-cntr flex justify-center">
                    <div class="w-full h-full flex flex-col justify-center items-center gap-4"> 
                        <header>
                            <h1 class="font-medium text-4xl px-2 text-center md:text-7xl uppercase mb-3 md:mb-9">
                                <a href="/">Find your film</a>
                            </h1>
                            <a class="nav-link" href="#/watchlist">My watchlist</a>
                        </header>

                        <main class="w-full flex justify-center">
                            <form id="search-bar" class="relative flex justify-end w-[68%] lg:w-[35%] h-10 bg-zinc-900/40 rounded-full overflow-hidden border border-stone-900/30">
                                <span id="search-icon" class="material-symbols-outlined absolute inset-0 my-auto w-fit h-fit left-2 z-50 self-center text-2xl md:text-3xl font-extralight">
                                    search
                                </span>
                                <input id="search-input" class="w-full h-full px-10 text-[10px] min-[375px]:text-sm md:text-base bg-transparent outline-none text-center border-none" type="text" aria-label="Search Bar" name="Movie Title" placeholder="Movie or TV show title" autocomplete="off">
                            </form>
                        </main> 
                    </div> 
                </div>
            </div>`
}