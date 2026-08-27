import { describe, expect, test } from "bun:test"
import { readsPayload } from "../lib/payload.ts"

describe("which calls read a payload from stdin", () => {
  test("a call that only takes paths away reads none, so an open stdin cannot hang it", () => {
    expect(readsPayload(0, null, true)).toBe(false)
  })

  test("a call naming its input still reads it while taking paths away", () => {
    expect(readsPayload(0, "-", true)).toBe(true)
    expect(readsPayload(0, "/var/tmp/set.json", true)).toBe(true)
  })

  test("a call carrying neither pairs nor removals reads stdin, which is the default route in", () => {
    expect(readsPayload(0, null, false)).toBe(true)
  })

  test("a call carrying its bodies as pairs reads no stdin, whether or not it takes paths away", () => {
    expect(readsPayload(2, null, false)).toBe(false)
    expect(readsPayload(2, null, true)).toBe(false)
  })
})
