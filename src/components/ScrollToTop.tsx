import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — resets scroll position to top on every route change.
 * Skips reset when returning to /sostanze with a saved scroll position (for scroll restoration).
 */
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // If navigating to /sostanze and there's a saved scroll position, skip scrolling to top
        if (pathname === '/sostanze' && sessionStorage.getItem('sostanze_scroll')) {
            return; // Let Sostanze.tsx handle its own scroll restore
        }

        const scrollContainer = document.querySelector('[data-scroll-container]');
        if (scrollContainer) {
            scrollContainer.scrollTo(0, 0);
        }
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
