import { Check } from "lucide-react"

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-feather text-white">
            <Check className="size-3.5" aria-hidden="true" />
          </span>
          <span className="leading-relaxed font-semibold text-body">{item}</span>
        </li>
      ))}
    </ul>
  )
}
