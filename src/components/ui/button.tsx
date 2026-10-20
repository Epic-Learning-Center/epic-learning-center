import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl text-center text-sm font-extrabold tracking-wider uppercase whitespace-nowrap no-underline transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-b-4 border-feather-depth bg-feather text-white hover:bg-feather-hover active:translate-y-1 active:border-b-0",
        secondary:
          "border-b-4 border-macaw-depth bg-macaw text-white hover:bg-macaw-hover active:translate-y-1 active:border-b-0",
        outline:
          "border-2 border-b-4 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:translate-y-0.5 active:border-b-2",
        ghost:
          "bg-transparent text-slate-700 hover:bg-slate-50",
        destructive:
          "border-b-4 border-[#D43636] bg-coral text-white hover:bg-[#FF5C5C] active:translate-y-1 active:border-b-0",
        link: "rounded-none bg-transparent px-0 py-0 text-macaw normal-case tracking-normal underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3.5",
        xs: "rounded-xl px-3 py-2 text-xs",
        sm: "px-4 py-2.5 text-xs",
        lg: "px-8 py-4 text-base",
        icon: "size-11 p-0",
        "icon-xs": "size-8 rounded-xl p-0",
        "icon-sm": "size-9 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
