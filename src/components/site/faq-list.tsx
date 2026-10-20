import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/content/siteData"

export function FaqList() {
  return (
    <Accordion
      keepMounted
      defaultValue={[faqs[0]?.id ?? "drop-off"]}
      className="gap-3"
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="rounded-3xl border-2 border-b-4 border-slate-200 bg-white px-5 sm:px-6"
        >
          <AccordionTrigger className="py-5 text-base font-extrabold text-ink hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-base leading-relaxed font-semibold text-body">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
