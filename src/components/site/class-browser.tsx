"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import type { ClassOffering } from "@/content/siteData"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { WhatsAppButton } from "@/components/site/actions"
import { ClassCard } from "@/components/site/class-card"

export function ClassBrowser({ classes }: { classes: ClassOffering[] }) {
  const categories = categoriesInOrder(classes)
  const [filter, setFilter] = useState("All")
  const selected = filter === "All" || categories.includes(filter) ? filter : "All"
  const visible =
    selected === "All" ? classes : classes.filter((item) => item.category === selected)

  return (
    <div className="flex flex-col gap-6">
      <ToggleGroup
        value={[selected]}
        onValueChange={(next) => {
          const nextFilter = next[0]
          if (nextFilter) setFilter(nextFilter)
        }}
        spacing={2}
        className="w-full flex-wrap gap-2"
        aria-label="Filter classes by category"
      >
        {["All", ...categories].map((item) => (
          <ToggleGroupItem key={item} value={item} variant="outline">
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {visible.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3">
          {visible.map((item) => (
            <ClassCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <Empty className="rounded-3xl border-2 border-dashed border-slate-200 bg-white">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Sparkles />
            </EmptyMedia>
            <EmptyTitle className="font-extrabold text-ink">
              {selected === "All"
                ? "No classes posted right now"
                : `No ${selected} classes this round`}
            </EmptyTitle>
            <EmptyDescription>
              Mentors rotate through the year. Tell us what your child wants to
              try and we&apos;ll keep you posted when a class opens.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <WhatsAppButton size="sm">Ask about a class</WhatsAppButton>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}

function categoriesInOrder(classes: ClassOffering[]) {
  const categories: string[] = []
  for (const item of classes) {
    if (!item.category || categories.includes(item.category)) continue
    categories.push(item.category)
  }
  return categories
}
