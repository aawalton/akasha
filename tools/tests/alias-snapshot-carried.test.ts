
import { describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { shape } from "../lib/shape.ts"
import {
  type AliasEntry,
  nextAliasIndex,
  sortAliasEntries,
  syncAliasSnapshotFromPages,
  writeAliasSnapshot,
} from "../lib/alias-snapshot.ts"
import { aliasIndexesFromPages } from "../lib/oauth-page-state.ts"

const SNAPSHOT_SCHEMA = shape.array(shape.object({ account: shape.string(), aliasIndex: shape.number() }))

function rootStating(dir: string, stated: readonly (readonly [string, number])[]): string {
  const root = join(dir, "root")
  mkdirSync(join(root, "pages", "claude-account"), { recursive: true })
  for (const [account, index] of stated) {
    writeFileSync(
      join(root, "pages", "claude-account", `${account}.claude-account.md`),
      ["---", "page-type-slug: claude-account", `alias-index: ${index}`, "---", ""].join("\n")
    )
  }
  return root
}

describe("nextAliasIndex", () => {
  it("returns 1 when no page states an index", () => {
    expect(nextAliasIndex(new Map())).toBe(1)
  })

  it("returns one past the maximum index", () => {
    const stated = new Map([
      ["a", 1],
      ["b", 3],
      ["c", 2],
    ])
    expect(nextAliasIndex(stated)).toBe(4)
  })

  it("takes what the account pages state, off the reader that states it", () => {
    const dir = mkdtempSync(join("/var/tmp", "alias-next-from-pages-"))
    try {
      const root = rootStating(dir, [
        ["aine", 8],
        ["aawalton", 1],
      ])
      expect(nextAliasIndex(aliasIndexesFromPages(root))).toBe(9)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe("sortAliasEntries", () => {
  it("sorts ascending by aliasIndex without mutating the input", () => {
    const entries: AliasEntry[] = [
      { account: "c", aliasIndex: 3 },
      { account: "a", aliasIndex: 1 },
      { account: "b", aliasIndex: 2 },
    ]
    const sorted = sortAliasEntries(entries)
    expect(sorted.map((e) => e.aliasIndex)).toEqual([1, 2, 3])
    expect(entries[0]?.account).toBe("c")
  })
})

describe("writeAliasSnapshot", () => {
  it("writes a sorted JSON array round-trippable as AliasEntry[]", () => {
    const dir = mkdtempSync(join("/var/tmp", "alias-snapshot-carried-"))
    const path = join(dir, "account-aliases.json")
    const entries: AliasEntry[] = [
      { account: "b", aliasIndex: 2 },
      { account: "a", aliasIndex: 1 },
    ]
    try {
      writeAliasSnapshot(entries, path)
      const parsed = SNAPSHOT_SCHEMA.parse(JSON.parse(readFileSync(path, "utf-8")))
      expect(parsed).toEqual([
        { account: "a", aliasIndex: 1 },
        { account: "b", aliasIndex: 2 },
      ])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe("syncAliasSnapshotFromPages", () => {
  it("writes what the account pages state, in alias-index order", () => {
    const dir = mkdtempSync(join("/var/tmp", "alias-snapshot-from-pages-"))
    const root = rootStating(dir, [
      ["aine", 8],
      ["aawalton", 1],
    ])
    const path = join(dir, "account-aliases.json")
    const expected = [
      { account: "aawalton", aliasIndex: 1 },
      { account: "aine", aliasIndex: 8 },
    ]
    try {
      expect(syncAliasSnapshotFromPages(path, root)).toEqual(expected)
      expect(SNAPSHOT_SCHEMA.parse(JSON.parse(readFileSync(path, "utf-8")))).toEqual(expected)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("writes an empty snapshot off a root holding no account pages", () => {
    const dir = mkdtempSync(join("/var/tmp", "alias-snapshot-no-pages-"))
    const path = join(dir, "account-aliases.json")
    try {
      expect(syncAliasSnapshotFromPages(path, join(dir, "root"))).toEqual([])
      expect(JSON.parse(readFileSync(path, "utf-8"))).toEqual([])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
