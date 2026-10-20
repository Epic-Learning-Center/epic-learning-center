import Link from "next/link"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/content/siteData"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 rounded-2xl no-underline", className)}
    >
      <span className="flex size-11 items-center justify-center rounded-2xl border-b-4 border-feather-depth bg-feather text-xl font-black text-white">
        E
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tight text-ink">
          {siteConfig.shortName}
        </span>
        <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
          Learning Center
        </span>
      </span>
    </Link>
  )
}
