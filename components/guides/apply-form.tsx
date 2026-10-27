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
  youthSafetyAck: z.boolean().optional(),
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
  mcJava: boolean
  mcBedrock: boolean
  mcUsername: string
  mcGamertag: string
  mcModded: boolean
  mcPacks: string
  mcRedstone: "none" | "basic" | "advanced"
  mcPortfolio: string
  youthSafetyAck: boolean
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
  mcJava: false,
  mcBedrock: false,
  mcUsername: "",
  mcGamertag: "",
  mcModded: false,
  mcPacks: "",
  mcRedstone: "none",
  mcPortfolio: "",
  youthSafetyAck: false,
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
    const wantsMinecraft = form.games.includes("minecraft")
    const parsed = applicationSchema.safeParse({
      ...form,
      youthSafetyAck: wantsMinecraft ? form.youthSafetyAck : true,
    })
    if (!parsed.success || (wantsMinecraft && !form.youthSafetyAck) || (wantsMinecraft && !form.mcJava && !form.mcBedrock)) {
      setErrors(parsed.success ? ["Complete the Minecraft section."] : parsed.error.issues.map((issue) => issue.message))
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

        {form.games.includes("minecraft") ? (
          <div className="space-y-4 rounded-xl border border-border/70 p-4">
            <p className="text-sm font-medium">Minecraft</p>
            <p className="text-xs text-muted-foreground">
              Approval is per edition and platform. Youth-cleared status needs extra review later — never send ID images
              here.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={form.mcJava}
                  onCheckedChange={(checked) => setForm({ ...form, mcJava: checked === true })}
                />
                Java Edition (PC)
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={form.mcBedrock}
                  onCheckedChange={(checked) => setForm({ ...form, mcBedrock: checked === true })}
                />
                Bedrock
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={form.mcModded}
                  onCheckedChange={(checked) => setForm({ ...form, mcModded: checked === true })}
                />
                Modded Java experience
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="mc-user">Java username</FieldLabel>
                <Input
                  id="mc-user"
                  value={form.mcUsername}
                  onChange={(event) => setForm({ ...form, mcUsername: event.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="mc-tag">Microsoft / Xbox Gamertag</FieldLabel>
                <Input
                  id="mc-tag"
                  value={form.mcGamertag}
                  onChange={(event) => setForm({ ...form, mcGamertag: event.target.value })}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="mc-packs">Packs you have played</FieldLabel>
              <Textarea
                id="mc-packs"
                value={form.mcPacks}
                onChange={(event) => setForm({ ...form, mcPacks: event.target.value })}
                placeholder="ATM10, Create: Above and Beyond…"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="mc-redstone">Redstone experience</FieldLabel>
              <select
                id="mc-redstone"
                className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
                value={form.mcRedstone}
                onChange={(event) =>
                  setForm({ ...form, mcRedstone: event.target.value as ApplicationForm["mcRedstone"] })
                }
              >
                <option value="none">None</option>
                <option value="basic">Basic</option>
                <option value="advanced">Advanced</option>
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="mc-portfolio">Build portfolio links</FieldLabel>
              <Textarea
                id="mc-portfolio"
                value={form.mcPortfolio}
                onChange={(event) => setForm({ ...form, mcPortfolio: event.target.value })}
                placeholder="Up to 8 screenshot links of your own builds"
              />
            </Field>
            <Field>
              <FieldLabel className="items-start">
                <Checkbox
                  checked={form.youthSafetyAck}
                  onCheckedChange={(checked) => setForm({ ...form, youthSafetyAck: checked === true })}
                />
                I acknowledge the Youth Safety Rules: 18+ only, Family Sessions are text-only, no friend requests or
                personal info beyond the session, and I will never ask for a login.
              </FieldLabel>
            </Field>
          </div>
        ) : null}

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
        <p className="text-sm text-destructive">
          Check name, handle, email, age confirmation, games, Minecraft section, proof and conduct.
        </p>
      ) : null}

      <Button type="submit" className="w-full sm:w-auto">
        Submit application
      </Button>
    </form>
  )
}
