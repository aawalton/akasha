import { describe, expect, test } from "bun:test"
import { bunTestArgs } from "../lib/run-selected-suites.ts"

describe("bunTestArgs — sweep-only --timeout threading", () => {
  const suites = ["a.database.test.ts", "b.cli.test.ts"]

  test("omitting timeoutMs yields no --timeout (gate keeps bun's 5s default)", () => {
    const args = bunTestArgs(suites)
    expect(args).toEqual(["test", "a.database.test.ts", "b.cli.test.ts"])
    expect(args).not.toContain("--timeout")
  })

  test("timeoutMs inserts --timeout <ms> BEFORE the suite paths", () => {
    const args = bunTestArgs(suites, 30_000)
    expect(args).toEqual(["test", "--timeout", "30000", "a.database.test.ts", "b.cli.test.ts"])
    expect(args.indexOf("--timeout")).toBeLessThan(args.indexOf("a.database.test.ts"))
  })

  test("empty suite set still round-trips the flag", () => {
    expect(bunTestArgs([], 30_000)).toEqual(["test", "--timeout", "30000"])
    expect(bunTestArgs([])).toEqual(["test"])
  })
})
