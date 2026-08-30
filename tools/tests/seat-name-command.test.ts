
import { describe, expect, test } from "bun:test"
import { resolveRoots, targetRoot } from "../../repo/roots/roots"
import { BadPayload, readPayload } from "../seat-name.ts"

const root = targetRoot(resolveRoots())

function answer(payload: unknown): { root: string; readings: readonly Record<string, unknown>[] } {
  return JSON.parse(readPayload(payload, root))
}

describe("readPayload", () => {
  test("it divides against the live name vocabulary, so a declared persona reads as one", () => {
    const { readings } = answer({ names: ["amy"] })
    expect(readings[0]).toEqual({
      name: "amy",
      reading: { persona: "amy", domain: null, role: null, flex: null },
    })
  })

  test("every name in comes back out, in the order it arrived", () => {
    const names = ["amy", "garbage-nonsense-xyz", "athena"]
    const { readings } = answer({ names })
    expect(readings.map((r) => r["name"])).toEqual(names)
  })

  test("a name the rule cannot settle is an answer rather than an omission", () => {
    const { readings } = answer({ names: ["garbage-nonsense-xyz"] })
    expect(readings[0]).toHaveProperty("unreadable")
    expect(readings[0]).not.toHaveProperty("reading")
  })

  test("an unreadable name carries both repairs, so a caller can tell them apart", () => {
    const { readings } = answer({ names: ["garbage-nonsense-xyz"] })
    expect(readings[0]).toHaveProperty("unplaceable")
    expect(readings[0]?.["unplaceable"]).toContain("garbage")
  })

  test("a payload that is not an object is refused", () => {
    expect(() => readPayload(null, root)).toThrow(BadPayload)
    expect(() => readPayload("names", root)).toThrow(BadPayload)
  })

  test("`names` missing or not an array is refused", () => {
    expect(() => readPayload({}, root)).toThrow(BadPayload)
    expect(() => readPayload({ names: "amy" }, root)).toThrow(BadPayload)
  })

  test("a non-string entry is refused, and the refusal names which one", () => {
    expect(() => readPayload({ names: ["amy", null] }, root)).toThrow(/names\[1\]/)
  })
})
