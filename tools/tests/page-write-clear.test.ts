import { describe, expect, test } from "bun:test"
import { patchedText, splitValues, type Where } from "../lib/page-write.ts"
import { MEMORY, resolveRoots, rootFor } from "../../repo/roots/roots"

const roots = resolveRoots()

const TYPE = "branch"

const RELPATH = "pages/branch/zz-probe.md"

const AT: Where = {
  root: rootFor(roots, MEMORY),
  repo: "memory",
  relPath: RELPATH,
  path: `${rootFor(roots, MEMORY)}/${RELPATH}`,
}

const STANDING =
  "---\npage-type-slug: branch\nid: edc111c1-5f5a-5d7d-ab4c-24654bc181dc\nseat-slug: zz-probe\nstatus: checking\npassed-commit: 461b8e3\n---\n"

function landed(values: Record<string, string>, clear: readonly string[]): string {
  return patchedText(roots, TYPE, STANDING, splitValues(roots, TYPE, values), AT, clear)
}

describe("patchedText — a cleared key leaves the page and nothing else does", () => {
  test("a cleared key is gone and every other key stands", () => {
    expect(landed({ status: "working" }, ["passed-commit"])).toBe(
      "---\npage-type-slug: branch\nid: edc111c1-5f5a-5d7d-ab4c-24654bc181dc\nseat-slug: zz-probe\nstatus: working\n---\n"
    )
  })

  test("the same write clearing nothing keeps that key, so the clear is what removed it", () => {
    expect(landed({ status: "working" }, [])).toBe(
      "---\npage-type-slug: branch\nid: edc111c1-5f5a-5d7d-ab4c-24654bc181dc\nseat-slug: zz-probe\nstatus: working\npassed-commit: 461b8e3\n---\n"
    )
  })

  test("clearing a key the page does not state leaves the page byte for byte", () => {
    expect(landed({}, ["live-commit"])).toBe(STANDING)
  })

  test("clearing one key of two takes only the one named", () => {
    expect(landed({}, ["seat-slug"])).toBe(
      "---\npage-type-slug: branch\nid: edc111c1-5f5a-5d7d-ab4c-24654bc181dc\nstatus: checking\npassed-commit: 461b8e3\n---\n"
    )
  })
})
