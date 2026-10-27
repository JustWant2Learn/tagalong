"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { brand } from "@/lib/brand"

const emailSchema = z.string().email()

export function AuthForm({
  mode,
}: {
  mode: "login" | "signup" | "reset"
}) {
  const [email, setEmail] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsed = emailSchema.safeParse(email)
    if (!parsed.success) {
      toast.error("Enter a valid email.")
      return
    }
    toast.success("Auth is UI-ready. Magic links connect in Phase 2 with Supabase.")
  }

  const title =
    mode === "login" ? "Log in" : mode === "signup" ? "Create an account" : "Reset your password"
  const description =
    mode === "reset"
      ? "We’ll email a reset link when auth is wired."
      : `Use a magic link, Discord or Google. ${brand.name} never asks for a game password.`

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
      <h1 className="font-display text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="auth-email">Email</FieldLabel>
            <Input
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <FieldDescription>Magic link. No game credentials. Ever.</FieldDescription>
          </Field>
        </FieldGroup>
        <Button type="submit" className="w-full">
          {mode === "reset" ? "Send reset link" : "Continue with email"}
        </Button>
      </form>
      {mode !== "reset" ? (
        <div className="mt-3 grid gap-2">
          <Button variant="outline" className="w-full" type="button" onClick={() => toast.message("Discord OAuth lands in Phase 2.")}>
            Continue with Discord
          </Button>
          <Button variant="outline" className="w-full" type="button" onClick={() => toast.message("Google OAuth lands in Phase 2.")}>
            Continue with Google
          </Button>
        </div>
      ) : null}
      <p className="mt-6 text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            New here? <Link href="/signup">Sign up</Link>
            {" · "}
            <Link href="/reset-password">Forgot password</Link>
          </>
        ) : null}
        {mode === "signup" ? (
          <>
            Already have an account? <Link href="/login">Log in</Link>
          </>
        ) : null}
        {mode === "reset" ? (
          <>
            Remembered it? <Link href="/login">Log in</Link>
          </>
        ) : null}
      </p>
    </div>
  )
}
