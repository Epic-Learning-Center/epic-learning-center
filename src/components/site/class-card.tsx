import type { VariantProps } from "class-variance-authority"
import { Badge, badgeVariants } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignupButton } from "@/components/site/actions"
import type { ClassOffering } from "@/content/siteData"

const categoryVariant: Record<
  ClassOffering["category"],
  NonNullable<VariantProps<typeof badgeVariants>["variant"]>
> = {
  Arts: "arts",
  "STEM/Mechanics": "stem",
  History: "history",
  "Dance & Fitness": "dance",
  Culture: "culture",
  Sports: "sports",
}

export function ClassCard({ item }: { item: ClassOffering }) {
  return (
    <Card id={item.id} className="scroll-mt-28 motion-safe:transition-transform motion-safe:hover:-translate-y-1">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge variant={categoryVariant[item.category]}>{item.category}</Badge>
          <Badge variant="age">{item.ages}</Badge>
        </div>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.schedule}</CardDescription>
      </CardHeader>
      <CardContent>
        {item.description ? (
          <p className="leading-relaxed font-semibold text-body">{item.description}</p>
        ) : null}
        {item.price ? (
          <p className="text-lg font-black tracking-tight text-ink">{item.price}</p>
        ) : null}
      </CardContent>
      <CardFooter>
        <SignupButton className="w-full sm:w-auto">Sign Up for This Class</SignupButton>
      </CardFooter>
    </Card>
  )
}
