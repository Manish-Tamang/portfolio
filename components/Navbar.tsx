'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-frost-effect dark:bg-frost-effect-dark backdrop-blur-lg" >
      <nav className="flex justify-between items-center py-4">
        <h1 className="text-xl font-medium">Gole Codes</h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className={`text-black dark:text-white ${pathname === '/' ? 'font-semibold' : ''}`}
          >
            home
          </Link>
          <Link
            href="/blogs"
            className={`text-black dark:text-white ${pathname === '/blogs' ? 'font-semibold' : ''}`}
          >
            blogs
          </Link>
          <Link
            href="/projects"
            className={`text-black dark:text-white ${pathname === '/projects' ? 'font-semibold' : ''}`}
          >
            projects
          </Link>
          <Link
            href="/uses"
            className={`text-black dark:text-white ${pathname === '/uses' ? 'font-semibold' : ''}`}
          >
            dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}