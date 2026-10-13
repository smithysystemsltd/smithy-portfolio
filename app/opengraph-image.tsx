import { ImageResponse } from "next/og"

export const alt = "Smithy Systems — Websites, apps and business systems for global businesses"
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
          padding: "72px",
          backgroundColor: "#101010",
          color: "#f5f4f1",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: "12px", height: "48px", backgroundColor: "#ed1c24" }} />
          <span style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "2px" }}>
            SMITHY SYSTEMS
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "62px", lineHeight: 1.08, fontWeight: 700, maxWidth: "940px" }}>
            Websites, apps and business systems for growing companies worldwide.
          </div>
          <div style={{ color: "#ed1c24", fontSize: "24px", letterSpacing: "3px" }}>
            TECHNOLOGY PARTNER / NAIROBI, KENYA
          </div>
        </div>
        <div style={{ width: "140px", height: "8px", backgroundColor: "#ed1c24" }} />
      </div>
    ),
    { ...size },
  )
}
