import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">404</p>
      <h1 className="mt-3 font-display text-4xl">That page isn’t in this world</h1>
      <p className="mt-3 text-muted-foreground">Try the home page, or pick a game and book a Guide.</p>
      <Link href="/" className={cn(buttonVariants(), "mt-6")}>
        Back home
      </Link>
    </div>
  )
}
