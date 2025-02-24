'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { BlurFadeImage } from "./BlurFade";

const components = [
  {
    title: "Latest Posts",
    href: "/blogs",
    description: "Recently published articles and updates",
  },
  {
    title: "Categories",
    href: "/blogs/categories",
    description: "Browse articles by topic",
  },
  {
    title: "About Me",
    href: "/about",
    description: "Learn more about who I am",
  },
  {
    title: "My Journey",
    href: "/journey",
    description: "My development journey",
  },
  {
    title: "Uses",
    href: "/uses",
    description: "Tools and technologies I use",
  },
  {
    title: "Statistics",
    href: "/dashboard",
    description: "Insights and analytics",
  },
  {
    title: "Colophon",
    href: "/colophon",
    description: "Insights and analytics",
  },
  {
    title: "Projects",
    href: "/project",
    description: "Insights and analytics",
  },
]

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-[4px] p-3 leading-none no-underline outline-none transition-colors duration-300",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              "focus:bg-gray-100 dark:focus:bg-gray-800",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="bg-transparent dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    Blog
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white dark:bg-gray-950">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-[4px] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 no-underline outline-none focus:shadow-md transition-all duration-300"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                              Developer Blog
                            </div>
                            <p className="text-sm leading-tight text-gray-600 dark:text-gray-400">
                              Explore the latest in web development, coding tips, and tech insights.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/blogs/latest" title="Latest Posts">
                        Recently published articles and updates
                      </ListItem>
                      <ListItem href="/blogs/categories" title="Categories">
                        Browse articles by topic
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="bg-transparent dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white dark:bg-gray-950">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>

                          <BlurFadeImage
                            src="/IMG-20250217-WA0011.jpg"
                            alt="Manish Tamang in Sushma Godawari Collage"
                            delay={0.1}
                            className="object-cover w-full h-full"
                            width={800}
                            height={600}
                          />

                        </NavigationMenuLink>
                      </li> {components.slice(2, 4).map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="bg-transparent dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    Dashboard
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 bg-white dark:bg-gray-950 md:w-[300px] md:grid-cols-2 lg:w-[400px]">
                      {components.slice(4).map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/guestbook" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                      )}
                    >
                      Guestbook
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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