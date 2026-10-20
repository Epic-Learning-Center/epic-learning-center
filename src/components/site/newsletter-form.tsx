"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { siteConfig } from "@/content/siteData"

type Status = "idle" | "submitting" | "success" | "error"

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [email, setEmail] = useState("")
  const [invalid, setInvalid] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = email.trim()
    const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    if (!looksValid) {
      setInvalid(true)
      return
    }

    setInvalid(false)
    setStatus("submitting")

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "newsletter",
          email: value,
          "bot-field": "",
        }).toString(),
      })

      if (response.ok || response.status === 404 || response.status === 405) {
        setStatus("success")
        return
      }
      setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-3xl border-2 border-b-4 border-feather-depth bg-[#F3FCE8] p-6"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-feather text-white">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <p className="text-xl font-black tracking-tight text-ink">You&apos;re on the list.</p>
        <p className="font-semibold text-body">
          We&apos;ll send the next monthly calendar and class updates to {email}.
        </p>
      </div>
    )
  }

  return (
    <form
      name="newsletter"
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <p hidden>
        <label>
          Don’t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>
      <FieldGroup>
        <Field data-invalid={invalid || undefined}>
          <FieldLabel htmlFor="newsletter-email">Email address</FieldLabel>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@email.com"
            value={email}
            aria-invalid={invalid || undefined}
            onChange={(event) => {
              setEmail(event.target.value)
              if (invalid) setInvalid(false)
            }}
          />
          <FieldDescription>
            No spam — just the monthly calendar and special event news.
          </FieldDescription>
          {invalid ? (
            <FieldError>Please enter a valid email address.</FieldError>
          ) : null}
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send me the calendar"}
      </Button>
      {status === "error" ? (
        <FieldError>
          We couldn&apos;t save that just yet. Email {siteConfig.email} or WhatsApp{" "}
          {siteConfig.whatsapp} and we&apos;ll add you by hand.
        </FieldError>
      ) : null}
    </form>
  )
}
