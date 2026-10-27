"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { Logo } from "@/components/layout/logo"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { brand } from "@/lib/brand"
import { gameNav, marketingNav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
            {gameNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }))}>
            Log in
          </Link>
          <Link href="/app/book" className={cn(buttonVariants())}>
            Book a session
          </Link>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>{brand.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4 text-base">
                {gameNav.map((item) => (
                  <Link key={item.href} href={item.href} className="py-1">
                    {item.label}
                  </Link>
                ))}
                {marketingNav.map((item) => (
                  <Link key={item.href} href={item.href} className="py-1">
                    {item.label}
                  </Link>
                ))}
                <Link href="/guides/apply" className="py-1">
                  Become a Guide
                </Link>
                <Link href="/login" className="py-1">
                  Log in
                </Link>
                <Link href="/app/book" className={cn(buttonVariants(), "mt-2 justify-center")}>
                  Book a session
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
