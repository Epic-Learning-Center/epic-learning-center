"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import type { Review } from "@/content/siteData"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const autoAdvanceMs = 9000

/**
 * Parent reviews as a slideshow. One review shows at a time. Visitors can
 * use the arrows, the dots, a swipe, or the keyboard arrows. It moves on by
 * itself every few seconds unless the visitor is reading (hover or focus),
 * has interacted, or prefers reduced motion. A single review shows on its
 * own with no controls.
 */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(false)
  const touchStart = useRef<number | null>(null)
  const count = reviews.length
  const current = Math.min(index, count - 1)

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  )

  const goByVisitor = (next: number) => {
    setStopped(true)
    go(next)
  }

  useEffect(() => {
    if (count < 2 || paused || stopped) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setTimeout(() => go(current + 1), autoAdvanceMs)
    return () => window.clearTimeout(timer)
  }, [count, paused, stopped, current, go])

  if (count === 0) return null
  const review = reviews[current]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="What families say"
      className="relative overflow-hidden rounded-3xl border-2 border-b-4 border-bee bg-[#FFFBEA] p-6 sm:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (count < 2) return
        if (event.key === "ArrowLeft") goByVisitor(current - 1)
        if (event.key === "ArrowRight") goByVisitor(current + 1)
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current
        touchStart.current = null
        if (start === null || count < 2) return
        const delta = (event.changedTouches[0]?.clientX ?? start) - start
        if (Math.abs(delta) < 40) return
        goByVisitor(delta < 0 ? current + 1 : current - 1)
      }}
    >
      <Quote
        className="absolute top-5 right-5 size-16 text-bee/40 sm:size-20"
        aria-hidden="true"
      />
      <p className="text-sm font-extrabold tracking-wider text-[#8A6A00] uppercase">
        What families say
      </p>

      <figure
        key={current}
        role="group"
        aria-roledescription="slide"
        aria-label={`${current + 1} of ${count}`}
        aria-live={stopped || paused ? "polite" : "off"}
        className="mt-4 max-w-3xl motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
      >
        <blockquote className="text-lg leading-relaxed font-extrabold text-ink sm:text-xl">
          “{review.text}”
        </blockquote>
        <figcaption className="mt-4 text-base font-extrabold text-slate-500">
          {review.attribution}
        </figcaption>
      </figure>

      {count > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {reviews.map((item, dot) => (
              <button
                key={`${dot}-${item.attribution}`}
                type="button"
                onClick={() => goByVisitor(dot)}
                aria-label={`Show review ${dot + 1} of ${count}`}
                aria-current={dot === current ? "true" : undefined}
                className={cn(
                  "h-3 rounded-full transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                  dot === current ? "w-8 bg-bee" : "w-3 bg-slate-300 hover:bg-slate-400"
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goByVisitor(current - 1)}
              aria-label="Previous review"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goByVisitor(current + 1)}
              aria-label="Next review"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
