import { useEffect } from 'react';

export default function useIntersectionObserver(selector: string, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, [selector, callback, options]);
};
