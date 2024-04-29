export default function ErrorMessage({message}: {message: string}): JSX.Element {
    return (
        <div className="flex-1 h-full flex flex-col items-center justify-center text-center gap-2">
            <p className="text-base font-semibold tracking-wide">{message}</p>
            <span className="material-symbols-outlined text-5xl font-medium">error</span>
        </div>
    )
}