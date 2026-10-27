import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import { brand } from "@/lib/brand"
import { affiliationDisclaimer, footerColumns } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 md:grid-cols-5">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{brand.description}</p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-medium">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {column.links.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {brand.legalName}. All rights reserved.
          </p>
          <p className="max-w-2xl md:text-right">{affiliationDisclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
