import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolveMappedLibc } from "akasha/utils/process/libc-mapping/libc-mapping.module.code.ts"

const MAPS = "/proc/self/maps"

test("the C library named is an object this very process has mapped", () => {
  expect(readFileSync(MAPS, "utf8")).toContain(resolveMappedLibc())
})

test("the C library is named by a path from the root", () => {
  expect(resolveMappedLibc().startsWith("/")).toBe(true)
})

test("what the loader wrote after a deleted mapping's path is off the name", () => {
  expect(resolveMappedLibc()).not.toContain(" (deleted)")
})

test("the object named is the C library rather than whichever object mapped first", () => {
  const base = resolveMappedLibc().split("/").at(-1) ?? ""
  expect(base.startsWith("libc") || base.startsWith("ld-musl-")).toBe(true)
})
