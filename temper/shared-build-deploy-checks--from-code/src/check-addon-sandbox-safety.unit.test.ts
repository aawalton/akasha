import { describe, expect, test } from "bun:test"
import { join } from "node:path"
import { main } from "./check-addon-sandbox-safety"

const FIXTURES = join(import.meta.dir, "..", "__fixtures__", "addon-sandbox")

describe("check-addon-sandbox-safety — --file population", () => {
  test("a path that is not there refuses rather than certifying a clean scan", () => {
    const missing = join(FIXTURES, "no-such-bundle-18399.lua")
    expect(main(["--file", missing])).toBe(2)
  })

  test("a readable clean bundle still passes", () => {
    expect(main(["--file", join(FIXTURES, "clean.lua")])).toBe(0)
  })

  test("a readable bundle carrying a banned symbol still fails as a violation", () => {
    expect(main(["--file", join(FIXTURES, "banned-debug-getinfo.lua")])).toBe(1)
  })
})
