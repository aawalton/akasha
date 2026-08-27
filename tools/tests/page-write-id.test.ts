import { describe, expect, test } from "bun:test"
import { landingTextFor } from "../lib/page-write-compose.ts"
import { resolveRoots } from "../../repo/roots/roots"

const roots = resolveRoots()

const TYPE = "branch"

const DERIVED = "a2c669c6-a204-5fe8-b66c-50d94aa96388"

describe("a page landed through the chokepoint states an id", () => {
  test("a page that does not stand yet is written with the id it resolves to", () => {
    const landed = landingTextFor(roots, TYPE, "zz-probe", { status: "working" }, "write")
    expect(landed).not.toBeNull()
    expect(landed?.at.relPath).toBe("pages/branch/zz-probe.branch.md")
    expect(landed?.text).toBe(`---\npage-type-slug: ${TYPE}\nid: ${DERIVED}\nstatus: working\n---\n`)
  })

  test("the same page patched rather than written states that same id", () => {
    const landed = landingTextFor(roots, TYPE, "zz-probe", { status: "working" }, "patch")
    expect(landed?.text).toBe(`---\npage-type-slug: ${TYPE}\nid: ${DERIVED}\nstatus: working\n---\n`)
  })

  test("an id the caller states is the one written, not the derivation", () => {
    const stated = "019ffc7b-4548-7003-bb59-10d047bdc78c"
    const landed = landingTextFor(roots, TYPE, "zz-probe", { id: stated, status: "working" }, "write")
    expect(landed?.text).toBe(`---\npage-type-slug: ${TYPE}\nid: ${stated}\nstatus: working\n---\n`)
  })
})
