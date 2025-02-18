'use client';

import { useTheme } from 'next-themes';
import NowPlaying from './NowPlaying';

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="mt-32 pb-12">
      <NowPlaying />
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()} Manish Tamang.
        </p>
        <div className="bg-muted flex h-8 items-center rounded-md border p-1 transition-all duration-300">
          <button
            onClick={() => setTheme('light')}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/10 hover:text-primary size-6 transition-all duration-300 ${theme === 'light' ? 'bg-primary text-primary-foreground' : ''
              }`}
            aria-label="Toggle light theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sun size-4"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/10 hover:text-primary size-6 transition-all duration-300 ${theme === 'dark' ? 'bg-primary text-primary-foreground' : ''
              }`}
            aria-label="Toggle dark theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-moon size-4"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}