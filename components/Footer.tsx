'use client';

import { useTheme } from 'next-themes';
import NowPlaying from './NowPlaying';
import { ThemeSwitcher } from './ui/theme-switcher';
import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookSquare,
  FaGithub,
  FaLinkedin,
  FaRegEnvelope
} from 'react-icons/fa';
import {
  HiOutlineInformationCircle,
  HiOutlinePhotograph,
  HiOutlineBookOpen,
  HiOutlineDesktopComputer,
  HiOutlineBriefcase
} from 'react-icons/hi';

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 pb-8 rounded-t-3xl pt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <NowPlaying />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <HiOutlineInformationCircle className="mr-2" /> About
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <HiOutlineDesktopComputer className="mr-2" /> Dashboard
                </Link>
              </li>
              <li>
                <Link href="/colophon" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <HiOutlineBookOpen className="mr-2" /> Colophon
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className='space-y-3'>
              <li>
                <Link href="/guestbook" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <HiOutlineBookOpen className="mr-2" /> Guestbook
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <FaRegEnvelope className="mr-2" /> Contact
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <HiOutlineBookOpen className="mr-2" /> Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className='space-y-3'>
              <li>
                <Link href="/uses" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <HiOutlineDesktopComputer className="mr-2" /> Uses
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <HiOutlineBriefcase className="mr-2" /> Projects
                </Link>
              </li>
              <li>
                <Link href="/photos" className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200">
                  <HiOutlinePhotograph className="mr-2" /> Photos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaInstagram className="mr-2 text-lg" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaFacebookSquare className="mr-2 text-lg" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaGithub className="mr-2 text-lg" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaLinkedin className="mr-2 text-lg" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Manish Tamang. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}