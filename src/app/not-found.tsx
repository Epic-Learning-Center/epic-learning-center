import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex w-full max-w-xl flex-col items-start gap-4 px-4 sm:px-6">
        <p className="text-sm font-extrabold tracking-wider text-macaw uppercase">404</p>
        <h1 className="text-4xl font-black tracking-tight text-ink">
          That page wandered off.
        </h1>
        <p className="text-lg font-semibold text-body">
          The link may be old. The classes, calendar, and front gate are all still
          right here.
        </p>
        <Button nativeButton={false} render={<Link href="/" />}>
          Back to home
        </Button>
      </div>
    </section>
  )
}
