"use client";
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

interface CarbonAdsProps {
    className?: string;
}

export default function CarbonAds({ className }: CarbonAdsProps) {
    const router = useRouter();
    const [showing, setShowing] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [fadeOut, setFadeOut] = React.useState(false);

    // Track if ad has been loaded already
    const adLoadedRef = React.useRef(false);

    // Create a ref to track route changes
    const routeRef = React.useRef("");

    // Completely clean up any existing Carbon ads on the page
    const cleanupAllAds = () => {
        // Remove all Carbon ad scripts
        const scripts = document.querySelectorAll('script[src*="carbonads"]');
        scripts.forEach(script => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        });

        // Remove all Carbon ad divs
        const ads = document.querySelectorAll('#carbonads');
        ads.forEach(ad => {
            if (ad.parentNode) {
                ad.parentNode.removeChild(ad);
            }
        });

        // Remove the Carbon styles
        const styles = document.getElementById('carbon-styles');
        if (styles && styles.parentNode) {
            styles.parentNode.removeChild(styles);
        }
    };

    // Standard cleanup for our specific container
    const cleanupAd = () => {
        const existingScript = document.getElementById('_carbonads_js');
        if (existingScript && existingScript.parentNode) {
            existingScript.parentNode.removeChild(existingScript);
        }

        const existingAd = document.querySelector('#carbon-container #carbonads');
        if (existingAd && existingAd.parentNode) {
            existingAd.parentNode.removeChild(existingAd);
        }
    };

    React.useEffect(() => {
        // Clean up all existing ads on the page when the component first mounts
        cleanupAllAds();

        // Only load ad if it hasn't been loaded yet or if we're reopening
        if (!adLoadedRef.current && !isMinimized) {
            loadAd();
        }

        // Add theme change listener to handle dark mode changes
        const handleThemeChange = () => {
            if (!isMinimized) {
                applyCarbonTheme();
            }
        };

        // Listen for theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleThemeChange);

        // Also apply theme on first load
        applyCarbonTheme();

        // Track the current route to detect navigation
        if (typeof window !== 'undefined') {
            routeRef.current = window.location.pathname;
        }

        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
            cleanupAd(); // Clean up on unmount
        };
    }, [router, isMinimized]);

    // Add a check for route changes
    React.useEffect(() => {
        const checkRouteChange = () => {
            const currentRoute = window.location.pathname;

            // If route has changed, reload the ad
            if (routeRef.current !== currentRoute) {
                routeRef.current = currentRoute;

                // Clean up old ads and load new one if not minimized
                if (!isMinimized) {
                    cleanupAllAds();
                    loadAd();
                }
            }
        };

        // Check for route changes
        window.addEventListener('popstate', checkRouteChange);

        return () => {
            window.removeEventListener('popstate', checkRouteChange);
        };
    }, [isMinimized]);

    // Apply theming to Carbon Ads based on current mode
    const applyCarbonTheme = () => {
        setTimeout(() => {
            const carbonAd = document.querySelector('#carbonads');
            if (carbonAd) {
                // First remove any existing theme classes
                carbonAd.classList.remove('carbon-dark', 'carbon-light');

                // Then add the appropriate one
                const isDarkMode =
                    document.documentElement.classList.contains('dark') ||
                    window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (isDarkMode) {
                    carbonAd.classList.add('carbon-dark');
                } else {
                    carbonAd.classList.add('carbon-light');
                }
            }
        }, 100);
    };

    const loadAd = () => {
        // First clean up any existing ads
        cleanupAd();

        const carbonContainer = document.getElementById('carbon-container');
        if (!carbonContainer) return;

        // Clear container to be safe
        carbonContainer.innerHTML = '';

        // Add style for Carbon Ads
        const style = document.createElement('style');
        style.id = 'carbon-styles';
        style.textContent = `
            #carbonads {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif;
                display: block;
                overflow: hidden;
                margin-bottom: 0;
                max-width: 100%;
                border-radius: 4px;
                box-shadow: 0 1px 2px hsla(0, 0%, 0%, .05);
                background-color: hsl(0, 0%, 98%);
                font-size: 12px;
                line-height: 1.4;
            }

            #carbonads a {
                text-decoration: none;
                color: inherit;
            }

            #carbonads.carbon-dark {
                color: #e8e8e8;
                background-color: hsl(0, 0%, 10%);
            }

            #carbonads.carbon-light {
                color: #333333;
                background-color: hsl(0, 0%, 98%);
            }

            #carbonads span {
                position: relative;
                display: block;
                overflow: hidden;
            }

            .carbon-img {
                display: block;
                margin: 0 auto;
                line-height: 1;
            }

            .carbon-text {
                display: block;
                padding: 6px; /* Reduced padding */
                line-height: 1.2; /* Reduced line height */
            }

            .carbon-poweredby {
                display: block;
                padding: 4px; /* Reduced padding */
                background: rgba(128, 128, 128, .15);
                text-align: center;
                font-size: 8px;  /* Reduced font size */
                letter-spacing: .5px;
            }

            .carbon-dark .carbon-poweredby {
                background: rgba(200, 200, 200, .15);
            }

            .carbon-light .carbon-poweredby {
                background: rgba(128, 128, 128, .15);
            }
        `;

        if (!document.getElementById('carbon-styles')) {
            document.head.appendChild(style);
        }

        // Create new script with a unique ID to avoid conflicts
        const script = document.createElement('script');
        script.src =
            'https://cdn.carbonads.com/carbon.js?serve=CW7I6K7U&placement=wwwmanishtamangcom&format=cover';
        script.id = '_carbonads_js';
        script.async = true;
        script.defer = true;

        carbonContainer.appendChild(script);

        script.addEventListener('load', () => {
            setShowing(true);
            adLoadedRef.current = true;
            // Apply theme after ad loads
            applyCarbonTheme();
        });
    };

    const handleClose = () => {
        setFadeOut(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    const toggleMinimize = () => {
        if (isMinimized) {
            // When expanding, first update state
            setIsMinimized(false);

            // Wait for component to render expanded state before reloading ad
            setTimeout(() => {
                // Clean up any existing ads and load a new one
                cleanupAllAds();
                loadAd();
            }, 100);
        } else {
            // When minimizing, just update the state
            setIsMinimized(true);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={clsx(
                'fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out',
                isMinimized
                    ? 'w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md cursor-pointer'
                    : 'rounded-[4px] w-full sm:w-52 max-w-[90vw] bg-white dark:bg-gray-800 backdrop-blur-sm shadow-md', // Adjusted width here
                fadeOut ? 'opacity-0' : 'opacity-100',
                className
            )}
        >
            {isMinimized ? (
                <div
                    className="w-full h-full flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={toggleMinimize}
                    aria-label="Expand ad"
                >
                    <Maximize2 className="h-4 w-4" />
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center p-1 border-b border-gray-200 dark:border-gray-700"> {/* Reduced padding here */}
                        <button
                            onClick={toggleMinimize}
                            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            aria-label="Minimize ad"
                        >
                            <Minimize2 className="h-3 w-3" />
                        </button>
                        <button
                            onClick={handleClose}
                            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            aria-label="Close ad"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>

                    <div id="carbon-container" className="w-full flex justify-center"></div>

                    {showing && (
                        <div className="px-1 pb-1 pt-0.5"> {/* Reduced padding here */}
                            <span className="block text-center text-xs text-gray-500 dark:text-gray-400">
                                ♥ Supports this site
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}