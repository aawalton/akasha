import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { git } from "../../repo/git/git.ts"
import { forgetCommits } from "../lib/page-commit-queue.ts"
import { patchPage, removePage, writePage } from "../lib/page-write.ts"
import { splitValues } from "../lib/page-write-values.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/probe.page-type.md": page(["extends-slug: none"]),
  "pages/page-type/probe-child.page-type.md": page(["extends-slug: probe"]),
  "pages/page-property-definition/probe-moves.page-property-definition.md": page([
    "defined-on-slug: probe",
    "key: moves",
    "type: text",
    "attachment: pgn",
  ]),
  "pages/page-property-definition/probe-beat.page-property-definition.md": page([
    "defined-on-slug: probe",
    "key: beat",
    "type: instant",
    "uncommitted: true",
  ]),
  "pages/page-property-definition/probe-title.page-property-definition.md": page(["defined-on-slug: probe", "key: title", "type: text"]),
}

const root = mkdtempSync(join("/var/tmp", "page-large-write-"))

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

const named = (): readonly string[] =>
  git(root, ["show", "--name-only", "--format=", "HEAD"])
    .stdout.split("\n")
    .filter((one) => one !== "")

const MOVES = '[Event "Probe"]\n\n1. e4 e5 2. Nf3 Nc6 1/2-1/2\n'

beforeEach(() => {
  forgetCommits()
})

describe("the writer splits a large value out of frontmatter itself", () => {
  it("takes a large key off the values a page's frontmatter holds", () => {
    const split = splitValues(ROOTS, "probe", { title: "One", moves: MOVES, beat: "now" })
    expect(Object.keys(split.front)).toEqual(["title"])
    expect(Object.keys(split.uncommitted)).toEqual(["beat"])
    expect(split.attachments.moves).toEqual({ extension: "pgn", text: MOVES })
  })

  it("reads the key off the page type's `extends-slug` chain", () => {
    const split = splitValues(ROOTS, "probe-child", { moves: MOVES })
    expect(split.attachments.moves?.extension).toBe("pgn")
    expect(Object.keys(split.front)).toEqual([])
  })
})

describe("a write lands a large value beside its page", () => {
  it("stands the value in `<page>.<key>.attachment.<ext>` and never in frontmatter", () => {
    writePage(ROOTS, "probe", "one", { title: "One", moves: MOVES }, "tester")
    expect(read("pages/probe/one.probe.moves.attachment.pgn")).toBe(MOVES)
    expect(read("pages/probe/one.probe.md")).not.toContain("moves")
  })

  it("commits the large file with its page in one commit", () => {
    writePage(ROOTS, "probe", "two", { title: "Two", moves: MOVES }, "tester")
    expect([...named()].sort()).toEqual(["pages/probe/two.probe.md", "pages/probe/two.probe.moves.attachment.pgn"])
  })

  it("writes nothing on a second round trip of the same values", () => {
    writePage(ROOTS, "probe", "three", { title: "Three", moves: MOVES }, "tester")
    const before = git(root, ["rev-parse", "HEAD"]).stdout
    writePage(ROOTS, "probe", "three", { title: "Three", moves: MOVES }, "tester")
    expect(git(root, ["rev-parse", "HEAD"]).stdout).toBe(before)
    expect(git(root, ["status", "--porcelain"]).stdout.trim()).toBe("")
  })

  it("lands an empty large value as an empty file rather than no file", () => {
    writePage(ROOTS, "probe", "empty", { title: "Empty", moves: "" }, "tester")
    expect(existsSync(join(root, "pages/probe/empty.probe.moves.attachment.pgn"))).toBe(true)
    expect(read("pages/probe/empty.probe.moves.attachment.pgn")).toBe("")
  })
})

describe("a patch reaches the large file without disturbing the page", () => {
  it("replaces the large value and leaves the standing frontmatter", () => {
    writePage(ROOTS, "probe", "four", { title: "Four", moves: MOVES }, "tester")
    patchPage(ROOTS, "probe", "four", { moves: "1. d4 1-0\n" }, "tester")
    expect(read("pages/probe/four.probe.moves.attachment.pgn")).toBe("1. d4 1-0\n")
    expect(read("pages/probe/four.probe.md")).toContain("title: Four")
    expect(named()).toEqual(["pages/probe/four.probe.moves.attachment.pgn"])
  })

  it("takes a large key out of frontmatter a page already stated it in", () => {
    mkdirSync(join(root, "pages/probe"), { recursive: true })
    writeFileSync(
      join(root, "pages/probe/legacy.probe.md"),
      page(["page-type-slug: probe", "title: Legacy", 'moves: "1. e4 1-0"'])
    )
    patchPage(ROOTS, "probe", "legacy", { title: "Legacy again" }, "tester")
    expect(read("pages/probe/legacy.probe.md")).not.toContain("moves")
  })
})

describe("a large file goes when its page goes", () => {
  it("removes the large file and names it in the same commit", () => {
    writePage(ROOTS, "probe", "five", { title: "Five", moves: MOVES }, "tester")
    removePage(ROOTS, "probe", "five", "tester")
    expect(existsSync(join(root, "pages/probe/five.probe.moves.attachment.pgn"))).toBe(false)
    expect([...named()].sort()).toEqual(["pages/probe/five.probe.md", "pages/probe/five.probe.moves.attachment.pgn"])
  })
})
