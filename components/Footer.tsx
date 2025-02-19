'use client';

import { useTheme } from 'next-themes';
import NowPlaying from './NowPlaying';
import { ThemeSwitcher } from './ui/theme-switcher';


export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="mt-10 pb-12">
      <NowPlaying />
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()} Manish Tamang.
        </p>
        
        <ThemeSwitcher />
       
      </div>
    </footer>
  );
}