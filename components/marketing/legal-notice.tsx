import { cn } from "@/lib/utils"

export function LegalNotice({
  notice,
  className,
}: {
  notice: string
  className?: string
}) {
  return (
    <p className={cn("text-center text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground", className)}>
      {notice}
    </p>
  )
}
