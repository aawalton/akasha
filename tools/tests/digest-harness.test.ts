
import { describe, expect, it } from "bun:test"
import { DegradeError, UncarriedError, canonical, decided, digestOf, hold } from "../lib/digest-harness.ts"

describe("decided", () => {
  it("hands back the value where the arm reached its implementation", () => {
    expect(decided("ported", { value: { restart: true }, notice: null })).toEqual({ restart: true })
  })

  it("throws where the arm degraded, naming the arm and carrying the notice", () => {
    const degraded = { value: false, notice: "supervisor-decide could not decide `idleRule`: no such root" }
    expect(() => decided("standing", degraded)).toThrow(DegradeError)
    expect(() => decided("standing", degraded)).toThrow(/standing arm degraded/)
    expect(() => decided("standing", degraded)).toThrow(/no such root/)
  })

  it("throws on a degrade whose safe value equals what the other arm decided", () => {
    expect(() => decided("ported", { value: true, notice: "unreachable" })).toThrow(DegradeError)
  })
})

describe("canonical", () => {
  it("spells two field orders the same way", () => {
    expect(canonical({ b: 1, a: 2 })).toBe(canonical({ a: 2, b: 1 }))
  })

  it("drops an undefined field, as the wire between the two arms does", () => {
    expect(canonical({ a: 1, b: undefined })).toBe(canonical({ a: 1 }))
  })

  it("keeps array order, which is part of an answer", () => {
    expect(canonical([1, 2])).not.toBe(canonical([2, 1]))
  })

  it("separates a null from a missing field", () => {
    expect(canonical({ a: null })).not.toBe(canonical({}))
  })

  it("refuses a non-finite number, which crosses a wire as null", () => {
    expect(() => canonical({ waitMs: Number.NaN })).toThrow(UncarriedError)
    expect(() => canonical({ waitMs: Number.POSITIVE_INFINITY })).toThrow(UncarriedError)
  })

  it("refuses a Date, which two different ones would both spell as `{}`", () => {
    expect(() => canonical({ at: new Date(0) })).toThrow(UncarriedError)
  })

  it("refuses a Map and a Set for the same reason", () => {
    expect(() => canonical({ seats: new Map([["a", 1]]) })).toThrow(UncarriedError)
    expect(() => canonical({ seats: new Set([1]) })).toThrow(UncarriedError)
  })

  it("refuses an object carrying a prototype of its own", () => {
    expect(() => canonical(Object.create({ n: 1 }))).toThrow(UncarriedError)
  })

  it("refuses a function, which is not something a decision answers with", () => {
    expect(() => canonical(() => 1)).toThrow(UncarriedError)
  })

  it("carries a nested plain object through, sorted at every depth", () => {
    expect(canonical({ b: { d: 1, c: 2 }, a: [true, null] })).toBe('{"a":[true,null],"b":{"c":2,"d":1}}')
  })
})

describe("digestOf", () => {
  it("agrees for two answers that differ only in field order", () => {
    expect(digestOf({ restart: true, reason: "idle" })).toBe(digestOf({ reason: "idle", restart: true }))
  })

  it("differs for two answers that differ", () => {
    expect(digestOf({ restart: true })).not.toBe(digestOf({ restart: false }))
  })
})

describe("hold", () => {
  it("matches where the two arms decided the same thing in different field orders", () => {
    const verdict = hold("idleRule", { busy: false, why: "unread" }, { why: "unread", busy: false })
    expect(verdict.matches).toBe(true)
    expect(verdict.standing).toBe(verdict.ported)
    expect(verdict.decision).toBe("idleRule")
  })

  it("does not match where they differ, and reports both digests", () => {
    const verdict = hold("idleRule", { busy: false }, { busy: true })
    expect(verdict.matches).toBe(false)
    expect(verdict.standing).not.toBe(verdict.ported)
  })
})
