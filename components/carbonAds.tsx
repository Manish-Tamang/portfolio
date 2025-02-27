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

    React.useEffect(() => {
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

        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, [router, isMinimized]);

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
        // First, make sure we remove any existing Carbon ads
        const existingScript = document.getElementById('_carbonads_js');
        if (existingScript && existingScript.parentNode) {
            existingScript.parentNode.removeChild(existingScript);
        }

        // Also remove any existing carbon ads div
        const existingAd = document.querySelector('#carbonads');
        if (existingAd && existingAd.parentNode) {
            existingAd.parentNode.removeChild(existingAd);
        }

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
                box-shadow: 0 1px 3px hsla(0, 0%, 0%, .05);
                background-color: hsl(0, 0%, 98%);
                font-size: 13px;
                line-height: 1.5;
            }
            
            #carbonads a {
                text-decoration: none;
                color: inherit;
            }
            
            #carbonads.carbon-dark {
                color: #e8e8e8;
                background-color: hsl(0, 0%, 10%); // Black
            }
            
            #carbonads.carbon-light {
                color: #333333;
                background-color: hsl(0, 0%, 98%); // White
            }
            
            #carbonads span {
                position: relative;
                display: block;
                overflow: hidden;
            }
            
            .carbon-dark .carbon-img,
            .carbon-dark .carbon-text,
            .carbon-dark .carbon-poweredby {
                color: #e8e8e8;
            }
            
            .carbon-light .carbon-img,
            .carbon-light .carbon-text,
            .carbon-light .carbon-poweredby {
                color: #333333;
            }
            
            .carbon-img {
                display: block;
                margin: 0 auto;
                line-height: 1;
            }
            
            .carbon-text {
                display: block;
                padding: 8px;
                line-height: 1.4;
            }
            
            .carbon-poweredby {
                display: block;
                padding: 8px;
                background: rgba(128, 128, 128, .15);
                text-align: center;
                font-size: 4px;
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

        // Create new script
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
                // Only reload ad if there's no ad currently showing
                const existingAd = document.querySelector('#carbonads');
                if (!existingAd) {
                    loadAd();
                } else {
                    // If ad exists, just apply theme
                    applyCarbonTheme();
                }
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
                    : 'rounded-[4px] w-full sm:w-64 max-w-[90vw] bg-white dark:bg-gray-800 backdrop-blur-sm shadow-md',
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
                    <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
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
                        <div className="px-2 pb-2 pt-1">
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