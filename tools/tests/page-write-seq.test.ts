import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { git } from "../../repo/git/git.ts"
import { deferCommits, drainCommits, forgetCommits } from "../lib/page-commit-queue.ts"
import { writePage } from "../lib/page-write.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/probe.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/probe-title.page-property-definition.md": page(["defined-on-slug: probe", "key: title", "type: text"]),
}

const root = mkdtempSync(join("/var/tmp", "page-write-seq-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}
mkdirSync(join(root, "pages/probe"), { recursive: true })
writeFileSync(join(root, ".gitignore"), "*.uncommitted.yaml\n*.lock/\n")

git(root, ["init", "--initial-branch", "main"])
git(root, ["config", "user.email", "probe@example.invalid"])
git(root, ["config", "user.name", "Probe"])
git(root, ["add", "-A"])
git(root, ["commit", "-m", "the tree these tests start from"])

afterAll(() => {
  forgetCommits()
  rmSync(root, { recursive: true, force: true })
})

const ROOTS: Roots = {
  akasha: root,
}

const read = (relPath: string): string => readFileSync(join(root, relPath), "utf8")

beforeEach(() => {
  forgetCommits()
  deferCommits()
})

describe("a page type stating no `next-seq`", () => {
  it("is written with no seq at all, so no page type pays for a seq it never asked for", () => {
    writePage(ROOTS, "probe", "plain", { title: "Plain" }, "tester")
    drainCommits()
    expect(read("pages/probe/plain.probe.md")).not.toContain("seq:")
  })
})

describe("a seq the write itself states", () => {
  it("is the one written", () => {
    writePage(ROOTS, "probe", "stated", { seq: 7, title: "Stated" }, "tester")
    drainCommits()
    expect(read("pages/probe/stated.probe.md")).toContain("seq: 7")
  })
})

describe("a seq the standing file already states", () => {
  it("survives a write that replaces the whole file and states none", () => {
    writePage(ROOTS, "probe", "standing", { seq: 12, title: "First" }, "tester")
    writePage(ROOTS, "probe", "standing", { title: "Second" }, "tester")
    drainCommits()
    const text = read("pages/probe/standing.probe.md")
    expect(text).toContain("seq: 12")
    expect(text).toContain("title: Second")
  })
})
