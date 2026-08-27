import { describe, expect, test } from "bun:test"
import { hashContent, shouldSkipSelfWrite } from "./self-write-guard"

describe("hashContent", () => {
  test("is deterministic for identical input", () => {
    const a = hashContent("temper saved variables\n")
    const b = hashContent("temper saved variables\n")
    expect(a).toBe(b)
  })

  test("differs for different content", () => {
    expect(hashContent("a")).not.toBe(hashContent("b"))
  })

  test("differs for whitespace-only changes (raw byte hash, not parsed-content hash)", () => {
    expect(hashContent("a\n")).not.toBe(hashContent("a\r\n"))
  })

  test("returns a non-empty string", () => {
    expect(hashContent("anything").length).toBeGreaterThan(0)
  })
})

describe("shouldSkipSelfWrite", () => {
  test("does not skip when no prior write-back was recorded", () => {
    expect(shouldSkipSelfWrite(hashContent("x"), null)).toBe(false)
  })

  test("skips when the current content hash matches the last write-back hash", () => {
    const h = hashContent("identical bytes")
    expect(shouldSkipSelfWrite(h, h)).toBe(true)
  })

  test("does not skip when the current hash differs from the last write-back hash", () => {
    expect(
      shouldSkipSelfWrite(hashContent("after-eso-write"), hashContent("after-server-write"))
    ).toBe(false)
  })
})
