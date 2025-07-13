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
import { usePathname } from 'next/navigation';

const components = [
  {
    title: "Latest Posts",
    href: "/blog",
    description: "Recently published blogs",
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
    title: "Photos",
    href: "/photos",
    description: "My random collection of photos",
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
    description: "Tech stack and behind-the-scenes details",
  },
  {
    title: "Projects",
    href: "/projects",
    description: "A showcase of my work and creations",
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
              "hover:bg-neutral-100 dark:hover:bg-neutral-700",
              "focus:bg-neutral-100 dark:focus:bg-neutral-700",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-neutral-500 dark:text-neutral-400">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname.startsWith("/dashboard");
  }
  if (href === "/about") {
    return pathname.startsWith("/about");
  }
  if (href === "/blog") {
    return pathname.startsWith("/blog");
  }
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href;
}

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-white/75 dark:bg-neutral-900 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-3xl font-ridemybike font-bold text-[#38A662] dark:text-[#7AC594]">
              Gole Codes
            </h1>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300",
                        isActive(pathname, "/blog") ? "text-[#38A662]" : ""
                      )}
                    >
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn("bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300",
                      isActive(pathname, "/about") ? "text-[#38A662]" : ""
                    )}
                  >
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white dark:bg-neutral-700">
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
                    className={cn("bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300",
                      isActive(pathname, "/dashboard") ? "text-[#38A662]" : ""
                    )}
                  >
                    Dashboard
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 bg-white dark:bg-neutral-700 md:w-[300px] md:grid-cols-2 lg:w-[400px]">
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
                        "bg-transparent dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300",
                        isActive(pathname, "/guestbook") ? "text-[#38A662]" : ""
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
                      )}
                    >
                      <button
                        className="cursor-pointer transition-all bg-[#38A662] text-white px-6 py-2 rounded-[4px] border-[#2D8A4D] w-full border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed"
                      >
                        Contact
                      </button>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-neutral-700 dark:text-neutral-200 "
          >
            <div className="flex items-center rounded-xl px-2 py-1">
              <span className="mr-2">Menu</span>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </div>
          </button>
        </div>

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
                <Link href="/" className={cn("px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md", isActive(pathname, "/") ? "text-[#38A662]" : "")}>
                  Home
                </Link>
                <Link href="/blog" className={cn("px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md", isActive(pathname, "/blogs") ? "text-[#38A662]" : "")}>
                  Blog
                </Link>
                <Link href="/about" className={cn("px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md", isActive(pathname, "/about") ? "text-[#38A662]" : "")}>
                  About
                </Link>
                <Link href="/guestbook" className={cn("px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md", isActive(pathname, "/about") ? "text-[#38A662]" : "")}>
                  Guestbook
                </Link>
                <Link href="/dashboard" className={cn("px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md", isActive(pathname, "/dashboard") ? "text-[#38A662]" : "")}>
                  Dashboard
                </Link>
                <Link href="/contact" className={cn("px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md", isActive(pathname, "/contact") ? "text-[#38A662]" : "")}>
                  <button
                    className="cursor-pointer transition-all bg-[#38A662] text-white px-6 py-2 rounded-[4px] border-[#2D8A4D] w-full border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed"
                  >
                    Contact
                  </button>
                </Link>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}