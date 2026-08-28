import { afterAll, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { git } from "../../repo/git/git.ts"
import { forgetCommits } from "../lib/page-commit-queue.ts"
import { pageOfSidecar } from "../../page/sidecar/sidecar.ts"
import { rowsPagesIn } from "../lib/page-rows.ts"
import { removeRow, whereRowsStand, writeRow } from "../lib/page-rows-write.ts"
import { rowsFileOf, rowsPartOf, rowsPartsOf } from "../../page/rows-file.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/keeper.page-type.md": page(["extends-slug: none"]),
  "pages/page-type/keeper-read.page-type.md": page(["extends-slug: none"]),
  "pages/page-type/keeper-day.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/keeper-reads.page-property-definition.md": page([
    "defined-on-slug: keeper",
    "key: reads",
    "type: pages",
    "target-slug: keeper-read",
    "rows: jsonl",
    "uncommitted: true",
  ]),
  "pages/page-property-definition/keeper-days.page-property-definition.md": page([
    "defined-on-slug: keeper",
    "key: days",
    "type: pages",
    "target-slug: keeper-day",
    "rows: jsonl",
  ]),
}

const root = mkdtempSync(join("/var/tmp", "rows-uncommitted-"))
for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}
mkdirSync(join(root, "pages/keeper"), { recursive: true })
writeFileSync(join(root, "pages/keeper/ada.keeper.md"), page(["page-type-slug: keeper", "title: Ada"]))
writeFileSync(join(root, ".gitignore"), "*.uncommitted.yaml\n*.uncommitted.jsonl\n*.lock/\n")
git(root, ["init", "--initial-branch", "main"])
git(root, ["config", "user.email", "keeper@example.invalid"])
git(root, ["config", "user.name", "Keeper"])
git(root, ["add", "-A"])
git(root, ["commit", "-m", "the tree these tests start from"])

afterAll(() => {
  forgetCommits()
  rmSync(root, { recursive: true, force: true })
})

const ROOTS: Roots = { akasha: root }

const tracked = (): readonly string[] =>
  git(root, ["ls-files"]).stdout.split("\n").filter((one) => one !== "")

describe("where an uncommitted rows property stands", () => {
  it("takes the `.uncommitted.jsonl` suffix, which a repo can name in one glob", () => {
    expect(rowsFileOf("pages/keeper/ada.md", "reads", true)).toBe(
      "pages/keeper/ada.reads.uncommitted.jsonl"
    )
  })

  it("keeps that suffix last on a part, so the same glob catches every one", () => {
    expect(rowsPartOf("pages/keeper/ada.reads.uncommitted.jsonl", 2)).toBe(
      "pages/keeper/ada.reads.part2.uncommitted.jsonl"
    )
  })

  it("leaves a committed rows property where it stood", () => {
    expect(rowsFileOf("pages/keeper/ada.md", "days")).toBe("pages/keeper/ada.days.jsonl")
    expect(rowsPartOf("pages/keeper/ada.days.jsonl", 2)).toBe("pages/keeper/ada.days.part2.jsonl")
  })

  it("is the path the writer resolves for it", () => {
    expect(whereRowsStand(ROOTS, "keeper-read", "ada")?.relPath).toBe(
      "pages/keeper/ada.keeper.reads.uncommitted.jsonl"
    )
  })
})

describe("a page's own files go with it", () => {
  it("names the parent page an uncommitted rows file stands beside", () => {
    expect(pageOfSidecar("pages/keeper/ada.reads.uncommitted.jsonl")).toBe("pages/keeper/ada.md")
  })

  it("names it for a numbered part too, which a page removal would otherwise strand", () => {
    expect(pageOfSidecar("pages/keeper/ada.reads.part2.uncommitted.jsonl")).toBe(
      "pages/keeper/ada.md"
    )
  })

  it("still names it for a committed rows file", () => {
    expect(pageOfSidecar("pages/keeper/ada.days.jsonl")).toBe("pages/keeper/ada.md")
    expect(pageOfSidecar("pages/keeper/ada.days.part2.jsonl")).toBe("pages/keeper/ada.md")
  })
})

describe("what a write to an uncommitted rows property does", () => {
  it("lands the row and commits nothing, the repo ignoring the file", () => {
    const wrote = writeRow(ROOTS, "keeper-read", "ada", { slug: "one", at: 1 })
    expect(wrote?.refused ?? null).toBeNull()
    expect(wrote?.commitError ?? null).toBeNull()
    expect(existsSync(join(root, "pages/keeper/ada.keeper.reads.uncommitted.jsonl"))).toBe(true)
    expect(tracked()).not.toContain("pages/keeper/ada.keeper.reads.uncommitted.jsonl")
  })

  it("reads the row back, a row being read as a page wherever a page is read", () => {
    writeRow(ROOTS, "keeper-read", "ada", { slug: "two", at: 2 })
    const read = rowsPagesIn(ROOTS, "akasha:pages/keeper/ada.keeper.md", "ada", "keeper", "reads", true, () => {})
    expect(read.map((one) => one.values.slug).sort()).toEqual(["one", "two"])
  })

  it("takes a row away without committing either, the repo ignoring the file", () => {
    writeRow(ROOTS, "keeper-read", "ada", { slug: "three", at: 3 })
    const took = removeRow(ROOTS, "keeper-read", "ada", "three")
    expect(took?.absent ?? null).toBeNull()
    expect(took?.commitError ?? null).toBeNull()
    expect(tracked()).not.toContain("pages/keeper/ada.keeper.reads.uncommitted.jsonl")
  })

  it("finds its parts under the same suffix", () => {
    const base = join(root, "pages/keeper/ada.keeper.reads.uncommitted.jsonl")
    writeFileSync(join(root, "pages/keeper/ada.keeper.reads.part2.uncommitted.jsonl"), "")
    expect(rowsPartsOf(base).map((one) => one.slice(root.length + 1))).toEqual([
      "pages/keeper/ada.keeper.reads.uncommitted.jsonl",
      "pages/keeper/ada.keeper.reads.part2.uncommitted.jsonl",
    ])
  })
})
