export default function EmptyWatchlistMessage(): JSX.Element {
    return (
        <div className="absolute w-fit h-fit inset-0 m-auto flex flex-col items-center gap-2">
            <p className="text-base font-semibold">Nothing to see here...</p>
            <span className="material-symbols-outlined text-5xl font-medium">
                sentiment_dissatisfied
            </span>
        </div>
    )
}