import { useEffect, useState } from "react"

export default function useCanAnimate(): { canAnimate: boolean } {
    const [canAnimate, setCanAnimate] = useState<boolean>(false)

    useEffect(() => {
        const setCanAnimateToTrue = () => setCanAnimate(() => true)
        const onLoad = () => window.requestAnimationFrame(setCanAnimateToTrue)

        if (document.readyState === "complete") {
            setCanAnimateToTrue()
        } else {
            window.addEventListener('load', onLoad)
            return () => window.removeEventListener('load', onLoad)
        }
    }, [])

    return { canAnimate }
}