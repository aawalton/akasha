import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { addonPath, addonSource, examined, type Subject } from "../lib/temper-addon-lua.ts"

const REF = "packages/temper/somewhere/src/subject.ts"

const SUBJECT: Subject = { ref: REF, holds: ["theThingExamined"] }

let root = ""
let was: string | undefined

function stands(text: string): void {
  mkdirSync(`${root}/packages/temper/somewhere/src`, { recursive: true })
  writeFileSync(`${root}/${REF}`, text, "utf8")
}

beforeEach(() => {
  root = mkdtempSync("/var/tmp/temper-addon-lua-guard-")
  was = process.env.CODE_ROOT
  process.env.CODE_ROOT = root
})

afterEach(() => {
  if (was === undefined) delete process.env.CODE_ROOT
  else process.env.CODE_ROOT = was
  rmSync(root, { recursive: true, force: true })
})

describe("a subject that cannot be looked at refuses rather than passing", () => {
  it("a source that stands nowhere names the root it was looked for under", () => {
    expect(() => addonSource(REF)).toThrow(root)
  })

  it("a source that stands nowhere says it looked at nothing, not that it found nothing", () => {
    expect(() => addonPath(REF)).toThrow("looked at nothing rather than finding nothing wrong")
  })

  it("an emptied source refuses, rather than examining a file with nothing in it", () => {
    stands("\n  \n")
    expect(() => addonSource(REF, SUBJECT.holds)).toThrow("is empty")
  })

  it("a source that no longer names what is examined refuses, naming what went", () => {
    stands("export function somethingElse(): void {}\n")
    expect(() => addonSource(REF, SUBJECT.holds)).toThrow("theThingExamined")
  })

  it("that refusal says a pass would have certified a subject never read", () => {
    stands("export function somethingElse(): void {}\n")
    expect(() => addonSource(REF, SUBJECT.holds)).toThrow(
      "certify a subject that was never read"
    )
  })

  it("examined refuses on the population where any one subject cannot be looked at", () => {
    expect(() => examined([SUBJECT])).toThrow(REF)
  })
})

describe("a subject that is there stays quiet", () => {
  it("a source holding what is examined comes back whole", () => {
    stands("export function theThingExamined(): void {}\n")
    expect(addonSource(REF, SUBJECT.holds)).toContain("theThingExamined")
  })

  it("examined answers the population size where every subject stands", () => {
    stands("export function theThingExamined(): void {}\n")
    expect(examined([SUBJECT])).toBe(1)
  })
})
