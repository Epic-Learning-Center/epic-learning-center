"use client"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/content/siteData"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex w-full max-w-xl flex-col items-start gap-4 px-4 sm:px-6">
        <h1 className="text-4xl font-black tracking-tight text-ink">
          Something went sideways.
        </h1>
        <p className="text-lg font-semibold text-body">
          Try that again. If it keeps happening, WhatsApp {siteConfig.whatsapp} and
          we&apos;ll help you from there.
        </p>
        <Button type="button" onClick={reset}>
          Try again
        </Button>
      </div>
    </section>
  )
}
