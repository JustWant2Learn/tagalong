import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"

import { PageJsonLd } from "@/components/seo/page-json-ld"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { brand } from "@/lib/brand"
import { pageTitle } from "@/lib/seo/metadata"
import { organizationSchema, websiteSchema } from "@/lib/seo/schema"
import { siteUrl } from "@/lib/seo/site-url"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const homeTitle = pageTitle("Play co-op with a real player")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: homeTitle,
    template: `%s | ${brand.name}`,
  },
  description:
    "Book skilled players to squad up in ARC Raiders, Valheim, Enshrouded and Minecraft. No account sharing. Real players. Book in minutes.",
  alternates: { canonical: siteUrl() },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    title: homeTitle,
    description: brand.description,
    url: siteUrl(),
    siteName: brand.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: brand.description,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <ThemeProvider>
          <TooltipProvider>
            <PageJsonLd data={[organizationSchema(), websiteSchema()]} />
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
