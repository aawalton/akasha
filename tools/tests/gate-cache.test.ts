import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { listDocuments } from "../lib/check.ts"
import { duringOneCall, onceInCall } from "../../during-call/during-call.ts"

const root = mkdtempSync(join("/var/tmp", "gate-cache-"))

mkdirSync(join(root, "pages/domain"), { recursive: true })
writeFileSync(
  join(root, "pages/domain/gauge.md"),
  "---\nslug: gauge\n---\n\n# Definition\n\n- **Gauge** — a measure.\n"
)

afterAll(() => rmSync(root, { recursive: true, force: true }))

const counted = (): { made: () => number; take: () => number } => {
  let n = 0
  return { made: () => (n += 1), take: () => n }
}

describe("work a call does once rather than once per file", () => {
  it("is done every time when no call is open, so nothing is held between commands", () => {
    const one = counted()
    onceInCall("k", one.made)
    onceInCall("k", one.made)
    expect(one.take()).toBe(2)
  })

  it("is done once inside one call, however many files ask for it", () => {
    const one = counted()
    duringOneCall(() => {
      for (let i = 0; i < 8; i += 1) onceInCall("k", one.made)
    })
    expect(one.take()).toBe(1)
  })

  it("keys the work, so two different pieces of work are not confused for one", () => {
    const one = counted()
    duringOneCall(() => {
      onceInCall("a", one.made)
      onceInCall("b", one.made)
    })
    expect(one.take()).toBe(2)
  })

  it("is done again on the next call, so no answer outlives the repo it was read from", () => {
    const one = counted()
    duringOneCall(() => onceInCall("k", one.made))
    duringOneCall(() => onceInCall("k", one.made))
    expect(one.take()).toBe(2)
  })

  it("holds one cache across a nested call rather than starting a second", () => {
    const one = counted()
    duringOneCall(() => {
      onceInCall("k", one.made)
      duringOneCall(() => onceInCall("k", one.made))
    })
    expect(one.take()).toBe(1)
  })

  it("hands the same answer back rather than an equal one, which is what makes it once", () => {
    const held = (): Record<string, never> => ({})
    const [first, second] = duringOneCall(() => [onceInCall("v", held), onceInCall("v", held)])
    expect(first).toBe(second!)
    expect(duringOneCall(() => listDocuments(root))).toEqual(listDocuments(root))
  })

  it("reads the tree afresh for a call that opens after it changed", () => {
    const before = duringOneCall(() => listDocuments(root))
    writeFileSync(join(root, "pages/domain/second.md"), "---\nslug: second\n---\n")
    const after = duringOneCall(() => listDocuments(root))
    expect(after.length).toBe(before.length + 1)
    rmSync(join(root, "pages/domain/second.md"))
  })
})
