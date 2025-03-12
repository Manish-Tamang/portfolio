'use client';

import NowPlaying from './NowPlaying';
import { ThemeSwitcher } from './ui/theme-switcher';
import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookSquare,
  FaGithub,
  FaLinkedin,
  FaRegEnvelope,
  FaRegStar
} from 'react-icons/fa';
import {
  HiOutlineInformationCircle,
  HiOutlinePhotograph,
  HiOutlineBookOpen,
  HiOutlineDesktopComputer,
  HiOutlineBriefcase,
} from 'react-icons/hi';
import { FeedbackFish } from '@feedback-fish/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-4 pb-8 rounded-t-3xl pt-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <NowPlaying />
        </div>
        <div className="grid grid-cols-2 gap-8 mb-10 md:grid-cols-4">
          <nav aria-label="Footer navigation - About">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <HiOutlineInformationCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <HiOutlineDesktopComputer className="mr-2 h-5 w-5" aria-hidden="true" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/colophon"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <HiOutlineBookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                  Colophon
                </Link>
              </li>
              <li>
                <Link
                  href="/manifest"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaRegStar className="mr-2 h-5 w-5" aria-hidden="true" />
                  Manifest
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Footer navigation - Community">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/guestbook"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <HiOutlineBookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                  Guestbook
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaRegEnvelope className="mr-2 h-5 w-5" aria-hidden="true" />
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <HiOutlineBookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/uses"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <HiOutlineDesktopComputer className="mr-2 h-5 w-5" aria-hidden="true" />
                  Uses
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Footer navigation - Content">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <HiOutlineBriefcase className="mr-2 h-5 w-5" aria-hidden="true" />
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/photos"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <HiOutlinePhotograph className="mr-2 h-5 w-5" aria-hidden="true" />
                  Photos
                </Link>
              </li>
              <li>
                <FeedbackFish projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_ID || 'e60dbe6f6bf435'}>
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200 w-full text-left"
                  >
                    <HiOutlineInformationCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                    Feedback
                  </button>
                </FeedbackFish>
              </li>
            </ul>
          </nav>
          <nav aria-label="Social media links">
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaInstagram className="mr-2 h-5 w-5" aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaFacebookSquare className="mr-2 h-5 w-5" aria-hidden="true" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaGithub className="mr-2 h-5 w-5" aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                >
                  <FaLinkedin className="mr-2 h-5 w-5" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 sm:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            © {currentYear} Manish Tamang. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}