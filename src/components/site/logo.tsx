import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/content/siteData"

export function Logo({
  className,
  size = "header",
}: {
  className?: string
  size?: "header" | "footer"
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 rounded-2xl", className)}
    >
      <Image
        src="/images/logo.png"
        alt={siteConfig.name}
        width={960}
        height={645}
        priority={size === "header"}
        className={cn(
          "w-auto",
          size === "header" ? "h-16 sm:h-20" : "h-20"
        )}
      />
    </Link>
  )
}
