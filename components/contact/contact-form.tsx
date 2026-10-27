"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { brand } from "@/lib/brand"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  topic: z.string().min(2),
  message: z.string().min(12),
})

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: "booking", message: "" })

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsed = schema.safeParse(form)
    if (!parsed.success) {
      toast.error("Add a name, a valid email, and a short message.")
      return
    }
    toast.success(`Saved. For now, email ${brand.supportEmail} if this is urgent.`)
    setForm({ name: "", email: "", topic: "booking", message: "" })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="contact-name">Name</FieldLabel>
          <Input id="contact-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-email">Email</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-topic">Topic</FieldLabel>
          <select
            id="contact-topic"
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
            value={form.topic}
            onChange={(event) => setForm({ ...form, topic: event.target.value })}
          >
            <option value="booking">Booking</option>
            <option value="session">A session that already ran</option>
            <option value="guide">Becoming a Guide</option>
            <option value="other">Something else</option>
          </select>
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            className="min-h-32"
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
          />
        </Field>
      </FieldGroup>
      <Button type="submit">Send</Button>
    </form>
  )
}
