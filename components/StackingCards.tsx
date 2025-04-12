"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Eye } from "lucide-react"

import { cn } from "@/lib/utils"
import StackingCards, { StackingCardItem } from "./ui/stacking-cards"

export type ProjectCard = {
  bgColor: string
  title: string
  description: string
  image: string
  slug: string
  projectUrl?: string
}

interface StackingCardsProps {
  projects: ProjectCard[]
  showHeader?: boolean
  showFooter?: boolean
  headerText?: string
  footerText?: string
}

const cardColors = [
  "bg-[#FFE4E1] dark:bg-neutral-800",
  "bg-[#E0FFFF] dark:bg-neutral-800",
  "bg-[#F0FFF0] dark:bg-neutral-800",
  "bg-[#FFF0F5] dark:bg-neutral-800",
  "bg-[#F5F5DC] dark:bg-neutral-800",
  "bg-[#E6E6FA] dark:bg-neutral-800",
  "bg-[#F0F8FF] dark:bg-neutral-800",
  "bg-[#FFE4B5] dark:bg-neutral-800",
]

export default function StackingProjectCards({
  projects,
  showHeader = true,
  showFooter = true,
  headerText = "Scroll down ↓",
  footerText = "Projects",
}: StackingCardsProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  return (
    <div
      className="h-[640px] bg-white dark:bg-neutral-900 overflow-auto text-black dark:text-white"
      ref={(node) => setContainer(node)}
    >
      <StackingCards
        totalCards={projects.length}
        scrollOptons={{ container: { current: container } }}
      >
        {showHeader && (
          <div className="relative font-calendas h-[620px] w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center text-[#39A662] whitespace-pre">
            {headerText}
          </div>
        )}

        {projects.map(({ description, image, title, slug, projectUrl }, index) => {
          return (
            <StackingCardItem key={index} index={index} className="h-[620px]">
              <Link href={`/projects/${slug}`} className="group block h-full">
                <div
                  className={cn(
                    cardColors[index % cardColors.length],
                    "h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video p-6 sm:p-8 flex w-11/12 rounded-2xl mx-auto relative overflow-hidden group"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="flex-1 flex flex-col justify-center pr-0 sm:pr-6 relative z-20">
                    <h3 className="font-bold text-xl sm:text-2xl mb-3 sm:mb-4 text-neutral-800 dark:text-neutral-100">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-5">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      <div
                        className="flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-800 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-800 rounded-[4px] text-sm font-medium transition-all duration-200 hover:scale-[1.03] hover:bg-neutral-700 dark:hover:bg-neutral-200 shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </div>

                      {projectUrl && (
                        <a
                          href={projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-neutral-700 dark:border-neutral-400 text-neutral-700 dark:text-neutral-200 rounded-[4px] text-sm font-medium transition-all duration-200 hover:scale-[1.03] hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Preview</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 rounded-[4px] mt-4 sm:mt-0 aspect-video relative overflow-hidden z-10">
                    <Image
                      src={image}
                      alt={title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                    />
                  </div>
                </div>
              </Link>
            </StackingCardItem>
          )
        })}

        {showFooter && (
          <div className="w-full h-80 relative overflow-hidden">
            <h2 className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-[#39A662] font-calendas">
              {footerText}
            </h2>
          </div>
        )}
      </StackingCards>
    </div>
  )
}
