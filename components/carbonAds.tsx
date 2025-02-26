"use client"
import clsx from 'clsx';
import { useRouter } from 'next/navigation'; 
import * as React from 'react';
import { X } from 'lucide-react';  

interface CarbonAdsProps {
    className?: string;
}

export default function CarbonAds({ className }: CarbonAdsProps) {
    const router = useRouter();
    const [showing, setShowing] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const [isMinimized, setIsMinimized] = React.useState(false);

    React.useEffect(() => {
        const carbonContainer = document.getElementById('carbon-container');
        const existingAd = document.getElementById('_carbonads_js');

        if (existingAd || !carbonContainer) return;

        const script = document.createElement('script');
        script.src =
            'https://cdn.carbonads.com/carbon.js?serve=CW7I6K7U&placement=wwwmanishtamangcom&format=cover';
        script.id = '_carbonads_js';
        script.async = true;
        script.defer = true;

        carbonContainer.appendChild(script);

        script.addEventListener('load', () => {
            setShowing(true);
        });

        return () => {
            script.removeEventListener('load', () => setShowing(true));
        };
    }, [router]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={clsx(
                'fixed bottom-4 right-4 z-50 max-w-xs transition-all duration-300 ease-in-out',
                isMinimized ? 'w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md cursor-pointer' : 'rounded-xl w-64 bg-gray-100/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg',
                className,
            )}
        >
            {isMinimized ? (
                <div 
                    className="w-full h-full flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={toggleMinimize}
                >
                    <span className="text-xs font-medium">Ad</span>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center p-2">
                        <button
                            onClick={toggleMinimize}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            Minimize
                        </button>
                        <button
                            onClick={handleClose}
                            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            aria-label="Close ad"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                    
                    <div id="carbon-container" className="w-full flex justify-center"></div>
                    
                    {showing && (
                        <div className="px-2 pb-2">
                            <span className="block text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                                ♥ Supports this site
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}