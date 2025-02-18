"use client"
import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="relative flex h-9 items-center justify-center rounded-2xl border border-gray-200 p-1 dark:border-gray-800">
            <button
                onClick={() => setTheme("light")}
                className={`relative inline-flex h-7 w-7 items-center justify-center rounded transition-all ${theme === "light" ? "text-black" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                aria-label="Light theme"
            >
                <Sun className="h-4 w-4" />
                {theme === "light" && (
                    <span className="absolute inset-0 rounded-xl ring-1 ring-black/10 dark:ring-white/10" />
                )}
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`relative inline-flex h-7 w-7 items-center justify-center rounded transition-all ${theme === "dark" ? "text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                aria-label="Dark theme"
            >
                <Moon className="h-4 w-4" />
                {theme === "dark" && (
                    <span className="absolute inset-0 rounded-xl ring-1 ring-black/10 dark:ring-white/10" />
                )}
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`relative inline-flex h-7 w-7 items-center justify-center rounded transition-all ${theme === "system" ? "text-black dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                aria-label="System theme"
            >
                <Monitor className="h-4 w-4" />
                {theme === "system" && (
                    <span className="absolute inset-0 rounded-xl ring-1 ring-black/10 dark:ring-white/10" />
                )}
            </button>
        </div>
    )
}