import { describe, expect, test } from "bun:test"
import { z } from "zod"
import { buildVideoQaRequest, MLX_VLM_MODEL, toPngDataUrl } from "./cli/mlx-vlm-client"
import { fleetReachable, MACBOOK_HOST } from "./roundtrip-helpers"

const PORT = 8096

const READY = await fleetReachable()

const ONE_BY_ONE_PNG = Uint8Array.from(
  atob(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMBAQDJ/pLvAAAAAElFTkSuQmCC"
  ),
  (c) => c.charCodeAt(0)
)

const CHAT_RESPONSE_SCHEMA = z.object({
  choices: z.array(z.object({ message: z.object({ content: z.string() }) })).min(1),
})

describe.skipIf(!READY)("mlx-vlm smoke", () => {
  test("answers a multi-image chat request with text via /v1/chat/completions", async () => {
    const dataUrl = toPngDataUrl(ONE_BY_ONE_PNG)
    const body = buildVideoQaRequest({
      model: MLX_VLM_MODEL,
      checklist: "Describe what you see across these frames in one sentence.",
      imageDataUrls: [dataUrl, dataUrl],
      maxTokens: 64,
    })
    const res = await fetch(`http://${MACBOOK_HOST}:${PORT}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer not-needed" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(420000),
    })
    if (!res.ok) throw new Error(`mlx-vlm ${res.status}: ${await res.text()}`)

    const { choices } = CHAT_RESPONSE_SCHEMA.parse(await res.json())
    const [first] = choices
    expect(first).toBeDefined()
    if (first === undefined) return
    expect(first.message.content.trim().length).toBeGreaterThan(0)
  }, 480000)
})
