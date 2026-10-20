"use client"

import { useState } from "react"
import Image from "next/image"
import { BookOpen, TreePalm, UserRound, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

const tones = {
  feather: "bg-[#E9F8D8] text-[#3F8F00]",
  macaw: "bg-[#DDF4FE] text-[#0C7AAD]",
  bee: "bg-[#FFF4CC] text-[#8A6A00]",
  coral: "bg-[#FFE4E4] text-[#C62828]",
  beetle: "bg-[#F6E8FF] text-[#7A3EAD]",
} as const

const icons = {
  project: Wrench,
  outdoor: TreePalm,
  library: BookOpen,
  person: UserRound,
} as const

export function PhotoFrame({
  src,
  alt,
  caption,
  tone = "feather",
  icon = "project",
  priority = false,
  className,
}: {
  src: string
  alt: string
  caption: string
  tone?: keyof typeof tones
  icon?: keyof typeof icons
  priority?: boolean
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const Icon = icons[icon]

  return (
    <figure
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border-2 border-b-4 border-slate-200 bg-white",
        className
      )}
    >
      <div className={cn("relative aspect-[4/3]", tones[tone])}>
        {failed ? (
          <div className="flex size-full flex-col items-center justify-center gap-3 px-6 text-center">
            <Icon className="size-10" aria-hidden="true" />
            <span className="text-sm font-extrabold">Photo coming soon</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            priority={priority}
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="px-4 py-3 text-sm font-extrabold text-slate-500">
        {caption}
      </figcaption>
    </figure>
  )
}
