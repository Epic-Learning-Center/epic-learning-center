import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-base font-semibold text-ink transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:font-semibold placeholder:text-slate-400 focus-visible:border-macaw focus-visible:ring-3 focus-visible:ring-macaw/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-cloud disabled:opacity-50 aria-invalid:border-coral aria-invalid:ring-3 aria-invalid:ring-coral/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
