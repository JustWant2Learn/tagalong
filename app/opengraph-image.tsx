import { ImageResponse } from "next/og"

import { brand } from "@/lib/brand"

export const alt = "Tagalong — play with a real player"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12110F",
          color: "#F6F1E8",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase" }}>{brand.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1 }}>Play with a real player</div>
          <div style={{ fontSize: 28, color: "#C4A574" }}>No account sharing. Book in minutes.</div>
        </div>
      </div>
    ),
    size
  )
}
