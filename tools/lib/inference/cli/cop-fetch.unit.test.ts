import { describe, expect, test } from "bun:test"
import { buildCopFetchInit } from "./cop-fetch"

describe("buildCopFetchInit", () => {
  test("sets Bun's timeout:false so the hardcoded 300s client timeout cannot fire", () => {
    const init = buildCopFetchInit({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
      timeoutMs: 1_800_000,
    })
    expect(init.timeout).toBe(false)
  })

  test("still applies the --timeout budget as the real client ceiling via AbortSignal", () => {
    const init = buildCopFetchInit({
      method: "POST",
      headers: {},
      body: "{}",
      timeoutMs: 1_800_000,
    })
    expect(init.signal).toBeInstanceOf(AbortSignal)
    expect(init.signal?.aborted).toBe(false)
  })

  test("passes method, headers, and body through unchanged", () => {
    const headers = { "Content-Type": "application/json", "x-cop-priority": "high" }
    const init = buildCopFetchInit({
      method: "POST",
      headers,
      body: '{"input":"hi"}',
      timeoutMs: 300_000,
    })
    expect(init.method).toBe("POST")
    expect(init.headers).toEqual(headers)
    expect(init.body).toBe('{"input":"hi"}')
  })
})
