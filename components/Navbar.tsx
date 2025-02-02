'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center mb-16">
      <h1 className="text-xl font-medium">Gole Codes</h1>
      <div className="flex gap-4">
        <Link
          href="/"
          className={`text-black dark:text-white ${pathname === '/'}`}
        >
          home
        </Link>
        <Link
          href="/blogs"
          className={`text-black dark:text-white ${pathname === '/notes'}`}
        >
          blogs
        </Link>
        <Link
          href="/projects"
          className={`text-black dark:text-white ${pathname === '/projects'}`}
        >
          projects
        </Link>
        <Link
          href="/uses"
          className={`text-black dark:text-white ${pathname === '/uses'}`}
        >
          dashboard
        </Link>
      </div>
    </nav>
  );
}