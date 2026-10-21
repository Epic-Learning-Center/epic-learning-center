"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { navLinks } from "@/content/siteData"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { SignupButton } from "@/components/site/actions"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const apply = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${Math.round(bar.getBoundingClientRect().height) + 2}px`
      )
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b-2 border-slate-200 bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-2xl focus:bg-feather focus:px-4 focus:py-2 focus:font-extrabold focus:text-white"
      >
        Skip to content
      </a>
      <div
        ref={barRef}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6"
      >
        <Logo />
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-extrabold no-underline transition-colors",
                  active ? "bg-cloud text-ink" : "text-slate-500 hover:bg-cloud hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <SignupButton size="sm" className="hidden sm:inline-flex" />
          <Button
            variant="outline"
            size="icon"
            className="xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t-2 border-slate-200 bg-white px-4 py-4 xl:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                      "block rounded-2xl px-3 py-3 text-base font-extrabold no-underline",
                      active ? "bg-cloud text-ink" : "text-slate-600 hover:bg-cloud"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-3 sm:hidden">
              <SignupButton className="w-full" />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
