import { cn } from "@/lib/utils"

const tones = {
  white: "bg-white",
  cloud: "bg-cloud",
  green: "bg-[#F3FCE8]",
  blue: "bg-[#E8F7FE]",
} as const

export function Section({
  id,
  tone = "white",
  className,
  children,
}: {
  id?: string
  tone?: keyof typeof tones
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", tones[tone], className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6">
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-3">
      {eyebrow ? (
        <p className="text-sm font-extrabold tracking-wider text-macaw uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <p className="text-base leading-relaxed font-semibold text-body sm:text-lg">
          {children}
        </p>
      ) : null}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: React.ReactNode
  title: string
  children?: React.ReactNode
}) {
  return (
    <section className="bg-white pt-10 pb-4 sm:pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 sm:px-6">
        {eyebrow ? (
          <p className="text-sm font-extrabold tracking-wider text-macaw uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {children ? (
          <p className="max-w-3xl text-lg leading-relaxed font-semibold text-body">
            {children}
          </p>
        ) : null}
      </div>
    </section>
  )
}
