import type { Metadata } from "next"
import Link from "next/link"
import { FaqList } from "@/components/site/faq-list"
import { PageHero, Section } from "@/components/site/section"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/site/actions"

export const metadata: Metadata = {
  title: "F.A.Q.",
  description:
    "Drop-off, payment, what to pack, tours, refunds, and medical waivers at EPIC Learning Center in Jinja.",
}

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="F.A.Q." title="Questions families ask us.">
        Straight answers about drop-off, payment, what to pack, and how a visit
        works. Still wondering? Send a WhatsApp — a real person will reply.
      </PageHero>
      <Section>
        <FaqList />
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton>Ask us on WhatsApp</WhatsAppButton>
          <Button variant="outline" nativeButton={false} render={<Link href="/join-us" />}>
            Contact the center
          </Button>
        </div>
      </Section>
    </>
  )
}
