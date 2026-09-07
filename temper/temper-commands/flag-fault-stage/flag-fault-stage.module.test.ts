import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdtempSync, realpathSync, rmSync } from "node:fs"
import { join } from "node:path"
import { saidFor, saidShort, stagingAt } from "./flag-fault-stage.module.code.ts"

const SCRATCH_PARENT = "/var/tmp"

const PREFIX = "flag-fault-stage-test-"

const MADE: string[] = []

afterAll(() => {
  for (const one of MADE) rmSync(one, { recursive: true, force: true })
})

test("a flag's value is the word said after that flag", () => {
  expect(saidFor(["--eso-root", "here", "--stage", "there"], "--stage")).toBe("there")
})

test("a flag said more than once answers with the first value said after that flag", () => {
  expect(saidFor(["--stage", "first", "--stage", "second"], "--stage")).toBe("first")
})

test("a flag no word follows answers nothing", () => {
  expect(saidFor(["--eso-root", "here", "--stage"], "--stage")).toBeUndefined()
})

test("a flag the call does not carry answers nothing", () => {
  expect(saidFor(["--eso-root", "here"], "--stage")).toBeUndefined()
})

test("a fault is said in one line, every run of blank space made one space", () => {
  expect(saidShort(new Error("  broke\n\n   off   here \n"))).toBe("broke off here")
})

test("a thrown thing that is no error is said as the text of that thrown thing", () => {
  expect(saidShort("plain\nsaying")).toBe("plain saying")
})

test("a staged folder nothing named is a fresh folder under the scratch parent", () => {
  const made = stagingAt(undefined, PREFIX)
  MADE.push(made)
  expect(existsSync(made)).toBe(true)
  expect(made.startsWith(join(realpathSync(SCRATCH_PARENT), PREFIX))).toBe(true)
})

test("a staged folder the caller named is made and answered as the real path of that folder", () => {
  const parent = mkdtempSync(join(realpathSync(SCRATCH_PARENT), PREFIX))
  MADE.push(parent)
  const named = join(parent, "under", "here")
  expect(stagingAt(named, PREFIX)).toBe(realpathSync(named))
  expect(existsSync(named)).toBe(true)
})
