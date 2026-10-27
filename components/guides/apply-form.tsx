"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { games } from "@/lib/games"

const applicationSchema = z.object({
  name: z.string().min(2),
  handle: z.string().min(3).regex(/^[a-z0-9-]+$/),
  email: z.string().email(),
  country: z.string().min(2),
  timezone: z.string().min(2),
  languages: z.string().min(2),
  ageConfirmed: z.literal(true),
  games: z.array(z.string()).min(1),
  platforms: z.string().min(2),
  availability: z.string().min(8),
  voice: z.boolean(),
  payoutMethod: z.enum(["wise", "paypal", "gcash"]),
  proof: z.string().min(10),
  why: z.string().min(20),
  conduct: z.literal(true),
})

type ApplicationForm = {
  name: string
  handle: string
  email: string
  country: string
  timezone: string
  languages: string
  ageConfirmed: boolean
  games: string[]
  platforms: string
  availability: string
  voice: boolean
  payoutMethod: "wise" | "paypal" | "gcash"
  proof: string
  why: string
  conduct: boolean
}

const emptyForm: ApplicationForm = {
  name: "",
  handle: "",
  email: "",
  country: "",
  timezone: "Asia/Manila",
  languages: "en",
  ageConfirmed: false,
  games: [],
  platforms: "",
  availability: "",
  voice: true,
  payoutMethod: "gcash",
  proof: "",
  why: "",
  conduct: false,
}

export function ApplyForm() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<string[]>([])

  function toggleGame(slug: string, checked: boolean) {
    setForm((current) => ({
      ...current,
      games: checked ? [...current.games, slug] : current.games.filter((item) => item !== slug),
    }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsed = applicationSchema.safeParse(form)
    if (!parsed.success) {
      setErrors(parsed.error.issues.map((issue) => issue.message))
      toast.error("Please complete the required fields.")
      return
    }
    setErrors([])
    toast.success("Application saved locally. Admin review arrives with Phase 3.")
    setForm(emptyForm)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FieldGroup>
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </Field>
          <Field>
            <FieldLabel htmlFor="handle">Handle</FieldLabel>
            <Input
              id="handle"
              value={form.handle}
              onChange={(event) => setForm({ ...form, handle: event.target.value.toLowerCase() })}
              placeholder="lowercase-and-dashes"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              value={form.country}
              onChange={(event) => setForm({ ...form, country: event.target.value })}
              placeholder="PH"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
            <Input
              id="timezone"
              value={form.timezone}
              onChange={(event) => setForm({ ...form, timezone: event.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="languages">Languages</FieldLabel>
            <Input
              id="languages"
              value={form.languages}
              onChange={(event) => setForm({ ...form, languages: event.target.value })}
              placeholder="en, fil"
            />
          </Field>
        </div>

        <Field>
          <FieldLabel className="items-start">
            <Checkbox
              checked={form.ageConfirmed}
              onCheckedChange={(checked) => setForm({ ...form, ageConfirmed: checked === true })}
            />
            I confirm I am 18 or older
          </FieldLabel>
        </Field>

        <Field>
          <FieldLabel>Games you are applying for</FieldLabel>
          <FieldDescription>
            Approval is per game. For ARC Raiders include proof of PvP competence (clip or screenshots).
          </FieldDescription>
          <div className="mt-2 flex flex-col gap-2">
            {games.map((game) => (
              <label key={game.slug} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={form.games.includes(game.slug)}
                  onCheckedChange={(checked) => toggleGame(game.slug, checked === true)}
                />
                {game.name}
              </label>
            ))}
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="platforms">Platforms you own</FieldLabel>
          <Input
            id="platforms"
            value={form.platforms}
            onChange={(event) => setForm({ ...form, platforms: event.target.value })}
            placeholder="Steam, PS5…"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="proof">Per-game proof</FieldLabel>
          <Textarea
            id="proof"
            value={form.proof}
            onChange={(event) => setForm({ ...form, proof: event.target.value })}
            placeholder="Steam / Embark profile URLs, hours played, progression notes, PvP clip links"
            className="min-h-28"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="availability">Typical availability</FieldLabel>
          <Textarea
            id="availability"
            value={form.availability}
            onChange={(event) => setForm({ ...form, availability: event.target.value })}
            placeholder="Weeknights PHT, weekends afternoons…"
          />
        </Field>

        <Field>
          <FieldLabel className="items-start">
            <Checkbox checked={form.voice} onCheckedChange={(checked) => setForm({ ...form, voice: checked === true })} />
            I have a mic and can do voice if the customer prefers it
          </FieldLabel>
        </Field>

        <Field>
          <FieldLabel htmlFor="payout">Preferred payout</FieldLabel>
          <select
            id="payout"
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
            value={form.payoutMethod}
            onChange={(event) =>
              setForm({ ...form, payoutMethod: event.target.value as ApplicationForm["payoutMethod"] })
            }
          >
            <option value="gcash">GCash</option>
            <option value="wise">Wise</option>
            <option value="paypal">PayPal</option>
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="why">Why you</FieldLabel>
          <Textarea
            id="why"
            value={form.why}
            onChange={(event) => setForm({ ...form, why: event.target.value })}
            className="min-h-28"
          />
        </Field>

        <Field>
          <FieldLabel className="items-start">
            <Checkbox
              checked={form.conduct}
              onCheckedChange={(checked) => setForm({ ...form, conduct: checked === true })}
            />
            I agree to the Guide Code of Conduct, Guide Agreement, and that I will never ask for a customer password.
          </FieldLabel>
        </Field>
      </FieldGroup>

      {errors.length > 0 ? (
        <p className="text-sm text-destructive">Check name, handle, email, age confirmation, games, proof and conduct.</p>
      ) : null}

      <Button type="submit" className="w-full sm:w-auto">
        Submit application
      </Button>
    </form>
  )
}
