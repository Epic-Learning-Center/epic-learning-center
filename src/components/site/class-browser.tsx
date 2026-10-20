"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { classCategories, classes } from "@/content/siteData"
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

const filters = ["All", ...classCategories] as const
type Filter = (typeof filters)[number]

export function ClassBrowser() {
  const [filter, setFilter] = useState<Filter>("All")
  const visible =
    filter === "All" ? classes : classes.filter((item) => item.category === filter)

  return (
    <div className="flex flex-col gap-6">
      <ToggleGroup
        value={[filter]}
        onValueChange={(next) => {
          const selected = next[0] as Filter | undefined
          if (selected) setFilter(selected)
        }}
        spacing={2}
        className="w-full flex-wrap gap-2"
        aria-label="Filter classes by category"
      >
        {filters.map((item) => (
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
              No {filter} classes this round
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
