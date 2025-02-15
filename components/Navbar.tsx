'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

interface DropdownItem {
  title: string;
  description: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  dropdownContent?: DropdownItem[];
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, dropdownContent }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === href;
  const dropdownRef = useRef<HTMLDivElement>(null);


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <div
      className="relative"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <Link
        href={href}
        className={`px-4 py-2 rounded-md transition-all duration-200 group
          ${isActive ? 'font-semibold' : ''}`}
      >
        <div className="flex items-center gap-1">
          <span className="relative">
            {children}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-800 dark:bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </span>
          {dropdownContent && <ChevronDown className="w-4 h-4 ml-1" />}
        </div>
      </Link>

      {dropdownContent && showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute top-[calc(100%+4px)] left-1/2 transform -translate-x-1/2 w-80 transition-opacity duration-200 ${showDropdown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-gray-100 dark:bg-gray-900 "></div>
          <div className="relative w-full rounded-xl bg-gray-100 dark:bg-gray-900 shadow-lg overflow-hidden">
            <div className="py-2">
              {dropdownContent.map((item, index) => (
                <Link
                  key={index}
                  href={`/blogs/category/${item.title.toLowerCase().replace(/\s+/g, '-')}`} // Example link, adjust as needed
                  className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const homeDropdown = [
    { title: 'Dashboard', description: 'Overview of your activity' },
    { title: 'Analytics', description: 'Detailed metrics and insights' }
  ];

  const blogsDropdown = [
    { title: 'Latest Posts', description: 'Recently published articles' },
    { title: 'Categories', description: 'Browse by topic' }
  ];

  const projectsDropdown = [
    { title: 'Featured', description: 'Highlighted projects' },
    { title: 'Archive', description: 'Past work and experiments' }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center h-20 px-2">
          {/* Logo */}
          <h1 className="text-2xl font-medium pl-0">
            Gole Codes
          </h1>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-4 pr-2">
            <NavLink href="/" dropdownContent={homeDropdown}>
              Home
            </NavLink>
            <NavLink href="/blogs" dropdownContent={blogsDropdown}>
              Blogs
            </NavLink>
            <NavLink href="/projects" dropdownContent={projectsDropdown}>
              Projects
            </NavLink>
            <NavLink href="/uses">
              Dashboard
            </NavLink>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Blogs
              </Link>
              <Link
                href="/projects"
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Projects
              </Link>
              <Link
                href="/uses"
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}