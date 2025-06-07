"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  HiOutlineInformationCircle,
  HiOutlinePhotograph,
  HiOutlineBookOpen,
  HiOutlineDesktopComputer,
  HiOutlineBriefcase,
  HiOutlineMail,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineCog,
} from "react-icons/hi";

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet/mobile breakpoint
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

export default function ContextMenuWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  // If on mobile, just render children without context menu
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-full w-full">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 rounded-[4px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <ContextMenuLabel className="text-neutral-500 dark:text-neutral-400">
          Navigation
        </ContextMenuLabel>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/about" className="w-full flex items-center">
            <HiOutlineInformationCircle className="mr-2 h-4 w-4" />
            About Me
          </Link>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/projects" className="w-full flex items-center">
            <HiOutlineBriefcase className="mr-2 h-4 w-4" />
            Projects
          </Link>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/blog" className="w-full flex items-center">
            <HiOutlineBookOpen className="mr-2 h-4 w-4" />
            Blog
          </Link>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/photos" className="w-full flex items-center">
            <HiOutlinePhotograph className="mr-2 h-4 w-4" />
            Photos
          </Link>
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-neutral-200 dark:bg-neutral-800" />
        <ContextMenuLabel className="text-neutral-500 dark:text-neutral-400">
          Connect
        </ContextMenuLabel>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/contact" className="w-full flex items-center">
            <HiOutlineMail className="mr-2 h-4 w-4" />
            Contact
          </Link>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/guestbook" className="w-full flex items-center">
            <HiOutlineUserGroup className="mr-2 h-4 w-4" />
            Guestbook
          </Link>
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-neutral-200 dark:bg-neutral-800" />
        <ContextMenuSub>
          <ContextMenuSubTrigger
            inset
            className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <HiOutlineCog className="mr-2 h-4 w-4" />
            Settings
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
              <ContextMenuLabel
                inset
                className="text-neutral-500 dark:text-neutral-400"
              >
                Theme
              </ContextMenuLabel>
              <ContextMenuRadioItem
                value="light"
                className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Light
              </ContextMenuRadioItem>
              <ContextMenuRadioItem
                value="dark"
                className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Dark
              </ContextMenuRadioItem>
              <ContextMenuRadioItem
                value="system"
                className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                System
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator className="bg-neutral-200 dark:bg-neutral-800" />
        <ContextMenuLabel className="text-neutral-500 dark:text-neutral-400">
          Resources
        </ContextMenuLabel>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/uses" className="w-full flex items-center">
            <HiOutlineDesktopComputer className="mr-2 h-4 w-4" />
            Uses
          </Link>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/manifest" className="w-full flex items-center">
            <HiOutlineDocumentText className="mr-2 h-4 w-4" />
            Manifest
          </Link>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Link href="/colophon" className="w-full flex items-center">
            <HiOutlineBookOpen className="mr-2 h-4 w-4" />
            Colophon
          </Link>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
