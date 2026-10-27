import type { Thing, WithContext } from "schema-dts"

import { JsonLd } from "@/components/marketing/json-ld"

export function PageJsonLd({ data }: { data: WithContext<Thing> | WithContext<Thing>[] }) {
  return <JsonLd data={data as unknown as Record<string, unknown>} />
}
