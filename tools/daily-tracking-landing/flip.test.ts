import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { declaredFor, flippedTo, namesNoDay, namesSomeDay, unflipped } from "./flip.ts"

const FUNNEL = join(import.meta.dir, "..", "lib", "tracking", "day-place.ts")

const DAYS = ["2026-03-05", "2026-03-06", "2026-09-01"]

function funnel(): string {
  return readFileSync(FUNNEL, "utf8")
}

describe("the funnel as it stands today", () => {
  test("holds the empty declaration this landing turns, and names no day", () => {
    expect(namesNoDay(funnel())).toBe(true)
    expect(namesSomeDay(funnel())).toBe(false)
  })

  test("turning it names every day and turning it back is the file it was", () => {
    const was = funnel()
    const turned = flippedTo(was, DAYS)
    if ("refused" in turned) throw new Error(turned.refused)
    for (const day of DAYS) expect(turned.text).toContain(`"${day}"`)
    expect(namesSomeDay(turned.text)).toBe(true)
    expect(namesNoDay(turned.text)).toBe(false)
    const back = unflipped(turned.text, DAYS)
    if ("refused" in back) throw new Error(back.refused)
    expect(back.text).toBe(was)
  })
})

describe("what the turn refuses", () => {
  test("a funnel already naming days, which is a second landing over a first", () => {
    const turned = flippedTo(funnel(), DAYS)
    if ("refused" in turned) throw new Error(turned.refused)
    const again = flippedTo(turned.text, DAYS)
    expect(again).toHaveProperty("refused")
  })

  test("a funnel whose declaration has been edited, rather than guessing where the set is", () => {
    const edited = funnel().replace(
      "MIGRATED_DAYS: ReadonlySet<string> = new Set<string>()",
      "MIGRATED_DAYS: ReadonlySet<string> = movedDays()"
    )
    expect(flippedTo(edited, DAYS)).toHaveProperty("refused")
  })

  test("a day that is no calendar date, which no file name could ever match", () => {
    expect(flippedTo(funnel(), ["2026-03-05", "today"])).toHaveProperty("refused")
  })

  test("no day at all, because nothing turned is nothing to say has moved", () => {
    expect(flippedTo(funnel(), [])).toHaveProperty("refused")
  })

  test("taking back a declaration this landing did not write", () => {
    const turned = flippedTo(funnel(), DAYS)
    if ("refused" in turned) throw new Error(turned.refused)
    expect(unflipped(turned.text, ["2026-03-05"])).toHaveProperty("refused")
  })
})

describe("the declaration itself", () => {
  test("names each day once, in date order", () => {
    const said = declaredFor(["2026-03-06", "2026-03-05", "2026-03-06"])
    expect(said.match(/"2026-03-06"/g)).toHaveLength(1)
    expect(said.indexOf('"2026-03-05"')).toBeLessThan(said.indexOf('"2026-03-06"'))
  })
})
