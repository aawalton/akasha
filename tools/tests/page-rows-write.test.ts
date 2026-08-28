import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { rowsPartsOf, PART_CEILING_BYTES } from "../../page/rows-file.ts"
import { git } from "../../repo/git/git.ts"
import { deferCommits, drainCommits, forgetCommits, standing } from "../lib/page-commit-queue.ts"
import {
  patchRow,
  patchRows,
  removeRow,
  rowAppender,
  type RowAppender,
  whereRowsStand,
  writeRow,
  writeRows,
} from "../lib/page-rows-write.ts"
import { rowsPagesIn } from "../lib/page-rows.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/keeper.page-type.md": page(["extends-slug: none"]),
  "pages/page-type/keeper-day.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/keeper-days.page-property-definition.md": page([
    "defined-on-slug: keeper",
    "key: days",
    "type: pages",
    "target-slug: keeper-day",
    "rows: jsonl",
  ]),
  "pages/page-type/keeper-note.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/keeper-notes.page-property-definition.md": page([
    "defined-on-slug: keeper",
    "key: notes",
    "type: pages",
    "target-slug: keeper-note",
    "rows: jsonl",
    "uncommitted: true",
    "append-only: true",
  ]),
  "pages/page-property-definition/keeper-note-at.page-property-definition.md": page([
    "defined-on-slug: keeper-note",
    "key: at",
    "type: instant",
  ]),
}

const root = mkdtempSync(join("/var/tmp", "page-data-write-"))

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

const SIDECAR = "pages/keeper/ada.keeper.days.jsonl"

const commits = (): number => Number(git(root, ["rev-list", "--count", "HEAD"]).stdout)

const rows = (): readonly Record<string, unknown>[] => {
  const parts = rowsPartsOf(join(root, SIDECAR))
  const held: Record<string, unknown>[] = []
  for (const path of parts.length === 0 ? [join(root, SIDECAR)] : parts) {
    for (const line of readFileSync(path, "utf8").split("\n")) {
      if (line.trim() !== "") held.push(JSON.parse(line) as Record<string, unknown>)
    }
  }
  return held
}

beforeEach(() => {
  forgetCommits()
  for (const path of rowsPartsOf(join(root, SIDECAR))) rmSync(path, { force: true })
  rmSync(join(root, SIDECAR), { force: true })
  deferCommits()
})

describe("a page type another page holds in its rows", () => {
  it("stands in one sidecar beside its parent rather than in a file of its own", () => {
    const at = whereRowsStand(ROOTS, "keeper-day", "ada")
    expect(at?.relPath).toBe(SIDECAR)
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-2026-08-19", mood: "bright" }, "watcher")
    expect(existsSync(join(root, "pages/keeper/ada-2026-08-19.keeper-day.md"))).toBe(false)
    expect(rows().map((one) => one["slug"])).toEqual(["ada-2026-08-19"])
  })

  it("says nothing for a page type no other page holds, rather than inventing a home", () => {
    expect(whereRowsStand(ROOTS, "keeper", "ada")).toBeNull()
  })

  it("refuses a row under a parent page that does not stand, rather than landing it unread", () => {
    const written = writeRow(ROOTS, "keeper-day", "no-such-keeper", { slug: "x" }, "watcher")
    expect(written?.absent).toContain("keeper")
    expect(written?.absent).toContain("no-such-keeper")
    expect(existsSync(join(root, "pages/keeper/no-such-keeper.keeper.days.jsonl"))).toBe(false)
  })

  it("is read back by the same reader that answers a query over it", () => {
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-one", mood: "bright" }, "watcher")
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-two", mood: "low" }, "watcher")
    const read = rowsPagesIn(ROOTS, `akasha:pages/keeper/ada.keeper.md`, "ada", "keeper", "days", false, () => {})
    expect(read.map((one) => one.named)).toEqual(["ada-one", "ada-two"])
    expect(read[0]?.values["keeper-slug"]).toBe("ada")
  })
})

describe("a row written twice", () => {
  it("is upserted by its own name rather than appended a second time", () => {
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-one", mood: "bright" }, "watcher")
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-one", mood: "low" }, "watcher")
    expect(rows().map((one) => [one["slug"], one["mood"]])).toEqual([["ada-one", "low"]])
  })

  it("keeps what a patch does not name, and drops what a write does not", () => {
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-one", mood: "bright", steps: 10 }, "watcher")
    patchRow(ROOTS, "keeper-day", "ada", { slug: "ada-one", mood: "low" }, "watcher")
    expect(rows().map((one) => [one["slug"], one["mood"], one["steps"]])).toEqual([
      ["ada-one", "low", 10],
    ])
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-one", mood: "low" }, "watcher")
    expect(rows().map((one) => [one["slug"], one["mood"], one["steps"]])).toEqual([
      ["ada-one", "low", undefined],
    ])
  })

  it("costs no commit where it changes nothing", () => {
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-one", mood: "bright" }, "watcher")
    drainCommits()
    const was = commits()
    writeRow(ROOTS, "keeper-day", "ada", { slug: "ada-one", mood: "bright" }, "watcher")
    expect(standing().pending).toBe(0)
    drainCommits()
    expect(commits()).toBe(was)
  })
})

describe("a batch of rows", () => {
  it("adds, replaces and leaves alone in one pass", () => {
    writeRow(ROOTS, "keeper-day", "ada", { slug: "one", mood: "bright" }, "watcher")
    writeRow(ROOTS, "keeper-day", "ada", { slug: "two", mood: "low" }, "watcher")
    patchRows(
      ROOTS,
      "keeper-day",
      "ada",
      [
        { slug: "one", steps: 10 },
        { slug: "two", mood: "low" },
        { slug: "three", mood: "flat" },
      ],
      "watcher"
    )
    expect(rows().map((one) => [one["slug"], one["mood"], one["steps"]])).toEqual([
      ["one", "bright", 10],
      ["two", "low", undefined],
      ["three", "flat", undefined],
    ])
  })

  it("takes a row named twice in one batch as one row", () => {
    writeRows(
      ROOTS,
      "keeper-day",
      "ada",
      [
        { slug: "one", mood: "bright" },
        { slug: "one", mood: "low" },
      ],
      "watcher"
    )
    expect(rows().map((one) => [one["slug"], one["mood"]])).toEqual([["one", "low"]])
  })

  it("costs no commit where no row of the batch changes anything", () => {
    patchRows(ROOTS, "keeper-day", "ada", [{ slug: "one", mood: "bright" }], "watcher")
    drainCommits()
    const was = commits()
    patchRows(ROOTS, "keeper-day", "ada", [{ slug: "one", mood: "bright" }], "watcher")
    expect(standing().pending).toBe(0)
    drainCommits()
    expect(commits()).toBe(was)
  })
})

describe("a row nothing names", () => {
  it("is appended, because no name says which standing row it would replace", () => {
    writeRow(ROOTS, "keeper-day", "ada", { mood: "bright" }, "watcher")
    writeRow(ROOTS, "keeper-day", "ada", { mood: "bright" }, "watcher")
    expect(rows().length).toBe(2)
  })
})

describe("a row taken away", () => {
  it("goes by name, leaving every other row where it stood", () => {
    for (const slug of ["one", "two", "three"]) {
      writeRow(ROOTS, "keeper-day", "ada", { slug, mood: slug }, "watcher")
    }
    removeRow(ROOTS, "keeper-day", "ada", "two", "sweeper")
    expect(rows().map((one) => one["slug"])).toEqual(["one", "three"])
  })

  it("queues no commit where the row it would take away is not there", () => {
    writeRow(ROOTS, "keeper-day", "ada", { slug: "one" }, "watcher")
    drainCommits()
    removeRow(ROOTS, "keeper-day", "ada", "never-was", "sweeper")
    expect(standing().pending).toBe(0)
  })
})

describe("the id a row is stamped with", () => {
  it("is never handed to a second row, whatever stood in that place before", () => {
    writeRow(ROOTS, "keeper-day", "ada", { slug: "one", mood: "a" }, "watcher")
    writeRow(ROOTS, "keeper-day", "ada", { slug: "two", mood: "b" }, "watcher")
    removeRow(ROOTS, "keeper-day", "ada", "one", "watcher")
    writeRow(ROOTS, "keeper-day", "ada", { slug: "three", mood: "c" }, "watcher")
    const ids = rows().map((one) => one["id"])
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe("a rows property whose rows pass one file's bound", () => {
  it("carries them on into a numbered part, and reads every part as one run", () => {
    const wide = "x".repeat(200_000)
    for (let n = 0; n < 60; n += 1) {
      writeRow(ROOTS, "keeper-day", "ada", { slug: `wide-${n}`, mood: wide }, "watcher")
    }
    const parts = rowsPartsOf(join(root, SIDECAR))
    expect(parts.length).toBeGreaterThan(1)
    for (const path of parts) {
      expect(statSync(path).size).toBeLessThanOrEqual(PART_CEILING_BYTES + 200_100)
    }
    expect(rows().length).toBe(60)
    const read = rowsPagesIn(ROOTS, `akasha:pages/keeper/ada.keeper.md`, "ada", "keeper", "days", false, () => {})
    expect(read.length).toBe(60)
    expect(read.map((one) => one.named)).toContain("wide-59")
  })

  it("upserts a row where it stands rather than moving it to the last part", () => {
    const wide = "x".repeat(200_000)
    for (let n = 0; n < 60; n += 1) {
      writeRow(ROOTS, "keeper-day", "ada", { slug: `wide-${n}`, mood: wide }, "watcher")
    }
    const before = rowsPartsOf(join(root, SIDECAR)).length
    patchRow(ROOTS, "keeper-day", "ada", { slug: "wide-0", steps: 3 }, "watcher")
    expect(rowsPartsOf(join(root, SIDECAR)).length).toBe(before)
    const held = rows().filter((one) => one["slug"] === "wide-0")
    expect(held.length).toBe(1)
    expect(held[0]?.["steps"]).toBe(3)
  })
})

describe("many writers appending to one sidecar", () => {
  it("folds every row into ONE commit rather than one commit per row", () => {
    drainCommits()
    const was = commits()
    for (let n = 0; n < 40; n += 1) {
      writeRow(ROOTS, "keeper-day", "ada", { slug: `day-${n}`, mood: "bright" }, `worker-${n % 8}`)
    }
    expect(commits()).toBe(was)
    drainCommits()
    expect(commits()).toBe(was + 1)
    expect(rows().length).toBe(40)
  })
})

const NOTES = "pages/keeper/ada.keeper.notes.uncommitted.jsonl"

const notes = (): readonly Record<string, unknown>[] => {
  if (!existsSync(join(root, NOTES))) return []
  return readFileSync(join(root, NOTES), "utf8")
    .split("\n")
    .filter((one) => one.trim() !== "")
    .map((one) => JSON.parse(one) as Record<string, unknown>)
}

const appenderOnAda = (): RowAppender => {
  const made = rowAppender(ROOTS, "keeper-note", "ada", "notes")
  if (made === null) throw new Error("no appender stands for `keeper-note` under `ada`")
  return made
}

describe("an appender writing straight into an append-only sidecar", () => {
  beforeEach(() => {
    rmSync(join(root, NOTES), { recursive: true, force: true })
  })

  it("judges every row it is handed rather than only the first", () => {
    const one = appenderOnAda()
    one.append({ at: "2026-08-27T00:00:00.000Z" })
    expect(one.refused()).toBeNull()
    one.append({ at: "2026-08-27T00:00:01.000Z", mood: "a key this page type never declares" })
    expect(one.refused()).not.toBeNull()
    expect(notes().length).toBe(1)
  })

  it("names the file and the failure where an append cannot land, rather than swallowing it", () => {
    mkdirSync(join(root, NOTES), { recursive: true })
    const one = appenderOnAda()
    one.append({ at: "2026-08-27T00:00:00.000Z" })
    const said = one.refused() ?? ""
    expect(said).toContain(NOTES)
    expect(said).toContain("keeper-note")
  })
})
