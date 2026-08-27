import { describe, expect, test } from "bun:test"
import { z } from "zod"
import { fleetReachable, MACBOOK_HOST } from "./roundtrip-helpers"

const PORT = 8086
const MODEL = "Tongyi-MAI/Z-Image-Turbo"

const READY = await fleetReachable()

const IMAGE_RESPONSE_SCHEMA = z.object({
  data: z.array(z.object({ b64_json: z.string() })).min(1),
})

const PNG_MAGIC = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

describe.skipIf(!READY)("image-gen smoke", () => {
  test("generates a PNG via /v1/images/generations", async () => {
    const res = await fetch(`http://${MACBOOK_HOST}:${PORT}/v1/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer not-needed",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: "A red maple leaf on a white background, studio photo",
        size: "1024x1024",
      }),
      signal: AbortSignal.timeout(300000),
    })
    if (!res.ok) throw new Error(`image-gen ${res.status}: ${await res.text()}`)

    const { data } = IMAGE_RESPONSE_SCHEMA.parse(await res.json())
    const [first] = data
    expect(first).toBeDefined()
    if (first === undefined) return
    const bytes = Uint8Array.from(atob(first.b64_json), (c) => c.charCodeAt(0))
    expect(bytes.byteLength).toBeGreaterThan(1000)
    expect(bytes.slice(0, PNG_MAGIC.length)).toEqual(PNG_MAGIC)
  }, 360000)
})
