import { describe, expect, it } from "bun:test"

import {
  computeReExecJitterMs,
  DEFAULT_REEXEC_MAX_JITTER_MS,
  resolveMaxReExecJitterMs,
} from "../lib/supervisor-self-heal-jitter-decide.ts"

describe("computeReExecJitterMs", () => {
  it("returns 0 when the random float is 0", () => {
    expect(computeReExecJitterMs(0, 60_000)).toBe(0)
  })

  it("returns just under the max when the random float approaches 1", () => {
    expect(computeReExecJitterMs(0.999_99, 60_000)).toBe(59_999)
  })

  it("floors to whole milliseconds", () => {
    expect(computeReExecJitterMs(0.5, 1_001)).toBe(500)
  })

  it("scales monotonically with the random float", () => {
    const a = computeReExecJitterMs(0.25, 60_000)
    const b = computeReExecJitterMs(0.75, 60_000)
    expect(a).toBeLessThan(b)
  })

  it("never reaches the max (half-open interval)", () => {
    expect(computeReExecJitterMs(1 - Number.EPSILON, 60_000)).toBeLessThan(60_000)
  })

  it("clamps a max of 0 to an immediate (0 ms) fire", () => {
    expect(computeReExecJitterMs(0.9, 0)).toBe(0)
  })

  it("clamps a negative max to 0", () => {
    expect(computeReExecJitterMs(0.9, -5_000)).toBe(0)
  })

  it("clamps a non-finite max to 0", () => {
    expect(computeReExecJitterMs(0.9, Number.NaN)).toBe(0)
    expect(computeReExecJitterMs(0.9, Number.POSITIVE_INFINITY)).toBe(0)
  })

  it("treats a non-finite or negative random float as 0", () => {
    expect(computeReExecJitterMs(Number.NaN, 60_000)).toBe(0)
    expect(computeReExecJitterMs(-0.5, 60_000)).toBe(0)
  })

  it("clamps a random float >= 1 to the top of the window", () => {
    expect(computeReExecJitterMs(1, 60_000)).toBe(60_000)
  })
})

describe("resolveMaxReExecJitterMs", () => {
  it("falls back to the default when unset", () => {
    expect(resolveMaxReExecJitterMs(undefined)).toBe(DEFAULT_REEXEC_MAX_JITTER_MS)
  })

  it("falls back to the default on empty / whitespace", () => {
    expect(resolveMaxReExecJitterMs("")).toBe(DEFAULT_REEXEC_MAX_JITTER_MS)
    expect(resolveMaxReExecJitterMs("   ")).toBe(DEFAULT_REEXEC_MAX_JITTER_MS)
  })

  it("uses a valid non-negative integer override", () => {
    expect(resolveMaxReExecJitterMs("30000")).toBe(30_000)
  })

  it("honors a literal 0 (jitter disabled)", () => {
    expect(resolveMaxReExecJitterMs("0")).toBe(0)
  })

  it("floors a fractional override", () => {
    expect(resolveMaxReExecJitterMs("1500.9")).toBe(1_500)
  })

  it("falls back to the default on a malformed value", () => {
    expect(resolveMaxReExecJitterMs("abc")).toBe(DEFAULT_REEXEC_MAX_JITTER_MS)
  })

  it("falls back to the default on a negative value", () => {
    expect(resolveMaxReExecJitterMs("-1000")).toBe(DEFAULT_REEXEC_MAX_JITTER_MS)
  })
})
