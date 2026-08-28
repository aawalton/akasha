import { afterAll, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { git } from "../../repo/git/git.ts"
import { forgetCommits } from "./page-commit-queue.ts"
import { whereRowsStand, writeRow } from "./page-rows-write.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/keeper.page-type.md": page(["extends-slug: none"]),
  "pages/page-type/keeper-seat.page-type.md": page(["extends-slug: keeper"]),
  "pages/page-type/keeper-day.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/keeper-days.page-property-definition.md": page([
    "defined-on-slug: keeper",
    "key: days",
    "type: pages",
    "target-slug: keeper-day",
    "rows: jsonl",
  ]),
}

const root = mkdtempSync(join("/var/tmp", "page-rows-subtype-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}
mkdirSync(join(root, "pages/keeper"), { recursive: true })
mkdirSync(join(root, "pages/keeper-seat"), { recursive: true })
writeFileSync(
  join(root, "pages/keeper/ada.keeper.md"),
  page(["page-type-slug: keeper", "title: Ada"])
)
writeFileSync(
  join(root, "pages/keeper-seat/bess.keeper-seat.md"),
  page(["page-type-slug: keeper-seat", "title: Bess"])
)
writeFileSync(join(root, ".gitignore"), "*.uncommitted.yaml\n*.lock/\n")

git(root, ["init", "--initial-branch", "main"])
git(root, ["config", "user.email", "keeper@example.invalid"])
git(root, ["config", "user.name", "Keeper"])
git(root, ["add", "-A"])
git(root, ["commit", "-m", "the tree these tests start from"])

afterAll(() => {
  forgetCommits()
  rmSync(root, { recursive: true, force: true })
})

const ROOTS = rootsNamed({ akasha: root })

describe("rows whose property is declared on a page type another one extends", () => {
  it("stands beside the page that holds them, rather than under the type declaring the property", () => {
    const at = whereRowsStand(ROOTS, "keeper-day", "bess")
    expect(at?.relPath).toBe("pages/keeper-seat/bess.keeper-seat.days.jsonl")
  })

  it("lands a row beside the extending page", () => {
    writeRow(ROOTS, "keeper-day", "bess", { slug: "bess-one" }, "watcher")
    expect(existsSync(join(root, "pages/keeper-seat/bess.keeper-seat.days.jsonl"))).toBe(true)
  })

  it("leaves a page of the declaring type standing where it always did", () => {
    const at = whereRowsStand(ROOTS, "keeper-day", "ada")
    expect(at?.relPath).toBe("pages/keeper/ada.keeper.days.jsonl")
  })

  it("refuses a name no page of either type carries", () => {
    const written = writeRow(ROOTS, "keeper-day", "no-such-keeper", { slug: "x" }, "watcher")
    expect(written?.absent).toContain("no-such-keeper")
  })
})
