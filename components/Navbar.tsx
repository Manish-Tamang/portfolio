'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white/75 dark:bg-gray-950/75 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Gole Codes
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Menu setActive={setActive}>
              <Link href="/guestbook" className="flex-shrink-0">
                <h1 className=" text-gray-900 dark:text-white">
                  Guestbook
                </h1>
              </Link>

              <MenuItem setActive={setActive} active={active} item="Blog">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <ProductItem
                    title="Latest Posts"
                    href="/blogs/latest"
                    src="/IMG-20250217-WA0011.jpg"
                    description="Recently published articles and updates"
                  />
                  <ProductItem
                    title="Categories"
                    href="/blogs/categories"
                    src="/IMG-20250217-WA0011.jpg"
                    description="Browse articles by topic"
                  />
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="About">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <ProductItem
                    title="About Me"
                    href="/about"
                    src="/IMG-20250217-WA0011.jpg"
                    description="Learn more about who I am"
                  />
                  <ProductItem
                    title="My Journey"
                    href="/journey"
                    src="/IMG-20250217-WA0011.jpg"
                    description="My development journey"
                  />
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Dashboard">
                <div className="flex flex-col space-y-4 text-sm p-6">
                  <HoveredLink href="/uses">Uses</HoveredLink>
                  <HoveredLink href="/stats">Statistics</HoveredLink>
                  <HoveredLink href="/activity">Activity</HoveredLink>
                  <HoveredLink href="/settings">Settings</HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Contact">
                <div className="flex flex-col space-y-4 text-sm p-6">
                  <HoveredLink href="/contact">Get in Touch</HoveredLink>
                  <HoveredLink href="/social">Social Media</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.nav
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col space-y-2 py-4"
              >
                <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Home
                </Link>
                <Link href="/blog" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Blog
                </Link>
                <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  About
                </Link>
                <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Dashboard
                </Link>
                <Link href="/contact" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Contact
                </Link>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}