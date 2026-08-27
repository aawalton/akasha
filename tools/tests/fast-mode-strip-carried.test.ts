
import { describe, expect, test } from "bun:test"
import {
  hasFastModeBeta,
  isFastModeBody,
  requestsFastMode,
  stripFastMode,
  stripFastModeBeta,
  stripSpeedFromBody,
} from "../lib/model-gateway/fast-mode-strip.ts"
import { shape } from "../lib/shape.ts"
import { type Infer } from "../lib/shape-core"

function toBuffer(value: unknown): ArrayBuffer {
  const encoded = new TextEncoder().encode(JSON.stringify(value))
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}

const DecodedBodySchema = shape.looseObject({
  speed: shape.string().optional(),
  model: shape.string().optional(),
  max_tokens: shape.number().optional(),
})

function fromBuffer(buffer: ArrayBuffer): Infer<typeof DecodedBodySchema> {
  return DecodedBodySchema.parse(JSON.parse(new TextDecoder().decode(buffer)))
}

const FAST_BODY = {
  model: "claude-opus-5",
  max_tokens: 4096,
  speed: "fast",
  messages: [{ role: "user", content: "hi" }],
}

describe("detection", () => {
  test("a body with speed:fast is a fast-mode body", () => {
    expect(isFastModeBody(toBuffer(FAST_BODY))).toBe(true)
  })

  test("a body without speed is not", () => {
    expect(isFastModeBody(toBuffer({ model: "claude-opus-5" }))).toBe(false)
  })

  test("a null body is not", () => {
    expect(isFastModeBody(null)).toBe(false)
  })

  test("a beta header carrying the fast-mode token is detected", () => {
    expect(hasFastModeBeta("oauth-2025-04-20,fast-mode-2026-02-01")).toBe(true)
  })

  test("a beta header without it is not", () => {
    expect(hasFastModeBeta("oauth-2025-04-20,files-api-2025-04-14")).toBe(false)
  })

  test("either half alone counts as requesting fast mode", () => {
    expect(requestsFastMode(toBuffer(FAST_BODY), null)).toBe(true)
    expect(requestsFastMode(null, "fast-mode-2026-02-01")).toBe(true)
    expect(requestsFastMode(toBuffer({ model: "m" }), "oauth-2025-04-20")).toBe(false)
  })
})

describe("body strip", () => {
  test("drops speed and preserves every sibling field", () => {
    const stripped = stripSpeedFromBody(toBuffer(FAST_BODY))
    if (stripped == null) throw new Error("expected a rewritten body")
    const body = fromBuffer(stripped)
    expect(body.speed).toBeUndefined()
    expect(body.model).toBe("claude-opus-5")
    expect(body.max_tokens).toBe(4096)
    expect(body["messages"]).toEqual([{ role: "user", content: "hi" }])
  })

  test("returns null when there is no speed field", () => {
    expect(stripSpeedFromBody(toBuffer({ model: "claude-opus-5" }))).toBe(null)
  })

  test("returns null on an unparseable body", () => {
    const encoded = new TextEncoder().encode("not json")
    const buffer = new ArrayBuffer(encoded.byteLength)
    new Uint8Array(buffer).set(encoded)
    expect(stripSpeedFromBody(buffer)).toBe(null)
  })
})

describe("beta header strip", () => {
  test("removes the fast-mode token and keeps the others in order", () => {
    expect(stripFastModeBeta("oauth-2025-04-20,fast-mode-2026-02-01,files-api-2025-04-14")).toBe(
      "oauth-2025-04-20,files-api-2025-04-14"
    )
  })

  test("yields the empty string when fast mode was the only token", () => {
    expect(stripFastModeBeta("fast-mode-2026-02-01")).toBe("")
  })

  test("returns null when no fast-mode token is present", () => {
    expect(stripFastModeBeta("oauth-2025-04-20")).toBe(null)
  })

  test("returns null for an absent header", () => {
    expect(stripFastModeBeta(null)).toBe(null)
  })

  test("tolerates surrounding whitespace", () => {
    expect(stripFastModeBeta("oauth-2025-04-20, fast-mode-2026-02-01 ")).toBe("oauth-2025-04-20")
  })
})

describe("combined strip", () => {
  test("removes both halves and leaves unrelated headers alone", () => {
    const headers = new Headers({
      "anthropic-beta": "oauth-2025-04-20,fast-mode-2026-02-01",
      "content-type": "application/json",
      "x-app": "cli",
    })
    const result = stripFastMode({ bodyBuffer: toBuffer(FAST_BODY), headers })
    if (result == null) throw new Error("expected a strip")
    expect(result.headers.get("anthropic-beta")).toBe("oauth-2025-04-20")
    expect(result.headers.get("content-type")).toBe("application/json")
    expect(result.headers.get("x-app")).toBe("cli")
    if (result.body == null) throw new Error("expected a body")
    expect(fromBuffer(result.body).speed).toBeUndefined()
  })

  test("deletes the beta header entirely when fast mode was its only token", () => {
    const headers = new Headers({ "anthropic-beta": "fast-mode-2026-02-01" })
    const result = stripFastMode({ bodyBuffer: toBuffer(FAST_BODY), headers })
    if (result == null) throw new Error("expected a strip")
    expect(result.headers.has("anthropic-beta")).toBe(false)
  })

  test("does not mutate the caller's headers", () => {
    const headers = new Headers({ "anthropic-beta": "oauth-2025-04-20,fast-mode-2026-02-01" })
    stripFastMode({ bodyBuffer: toBuffer(FAST_BODY), headers })
    expect(headers.get("anthropic-beta")).toBe("oauth-2025-04-20,fast-mode-2026-02-01")
  })

  test("returns null when neither half is present, so the caller does not replay", () => {
    const headers = new Headers({ "anthropic-beta": "oauth-2025-04-20" })
    expect(stripFastMode({ bodyBuffer: toBuffer({ model: "m" }), headers })).toBe(null)
  })

  test("strips the header half even when the body carries no speed", () => {
    const headers = new Headers({ "anthropic-beta": "fast-mode-2026-02-01" })
    const result = stripFastMode({ bodyBuffer: toBuffer({ model: "m" }), headers })
    if (result == null) throw new Error("expected a strip")
    expect(result.headers.has("anthropic-beta")).toBe(false)
  })
})
