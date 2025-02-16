'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className={cn("fixed top-2 inset-x-0 max-w-2xl mx-auto z-50")}>
        <div className="relative">
          <div className="hidden md:block">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Home">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <ProductItem
                    title="Dashboard"
                    href="/dashboard"
                    src="/chill-guy.png"
                    description="Overview of your activity and metrics"
                  />
                  <ProductItem
                    title="Analytics"
                    href="/analytics"
                    src="/api/placeholder/400/320"
                    description="Detailed insights and statistics"
                  />
                </div>
              </MenuItem>

              {/* Blogs Section */}
              <MenuItem setActive={setActive} active={active} item="Blogs">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <ProductItem
                    title="Latest Posts"
                    href="/blogs/latest"
                    src="/api/placeholder/400/320"
                    description="Recently published articles and updates"
                  />
                  <ProductItem
                    title="Categories"
                    href="/blogs/categories"
                    src="/api/placeholder/400/320"
                    description="Browse articles by topic"
                  />
                  <ProductItem
                    title="Featured"
                    href="/blogs/featured"
                    src="/api/placeholder/400/320"
                    description="Most popular and noteworthy content"
                  />
                  <ProductItem
                    title="Archives"
                    href="/blogs/archives"
                    src="/api/placeholder/400/320"
                    description="Browse our collection of past articles"
                  />
                </div>
              </MenuItem>

              {/* Projects Section */}
              <MenuItem setActive={setActive} active={active} item="Projects">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <ProductItem
                    title="Featured Projects"
                    href="/projects/featured"
                    src="/api/placeholder/400/320"
                    description="Highlighted work and experiments"
                  />
                  <ProductItem
                    title="Case Studies"
                    href="/projects/case-studies"
                    src="/api/placeholder/400/320"
                    description="In-depth analysis of selected projects"
                  />
                  <ProductItem
                    title="Open Source"
                    href="/projects/open-source"
                    src="/api/placeholder/400/320"
                    description="Public contributions and tools"
                  />
                  <ProductItem
                    title="Archive"
                    href="/projects/archive"
                    src="/api/placeholder/400/320"
                    description="Past work and experiments"
                  />
                </div>
              </MenuItem>

              {/* Uses/Dashboard Section */}
              <MenuItem setActive={setActive} active={active} item="Dashboard">
                <div className="flex flex-col space-y-4 text-sm p-6">
                  <HoveredLink href="/uses">Uses</HoveredLink>
                  <HoveredLink href="/stats">Statistics</HoveredLink>
                  <HoveredLink href="/activity">Activity</HoveredLink>
                  <HoveredLink href="/settings">Settings</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden fixed top-4 right-4 p-3 backdrop-blur-lg rounded-full border border-gray-200 dark:border-gray-800"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-0 top-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800"
          >
            <nav className="flex flex-col space-y-4 p-4">
              <a href="/" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Home
              </a>
              <a href="/blogs" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Blogs
              </a>
              <a href="/projects" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Projects
              </a>
              <a href="/dashboard" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Dashboard
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
