import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterAll, describe, expect, test } from "bun:test"
import type { Repo } from "../../page/document/types.ts"
import { identityKey, identityOf } from "../lib/graph/identity.ts"
import { GRAPH_REPOS, readRepos } from "../lib/graph/repos.ts"
import type { BuildContext } from "../lib/graph/types.ts"

const planted: string[] = []

const plant = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), "graph-identity-"))
  planted.push(root)
  for (const [rel, body] of Object.entries(files)) {
    const path = join(root, rel)
    mkdirSync(join(path, ".."), { recursive: true })
    writeFileSync(path, body)
  }
  return root
}

afterAll(() => {
  for (const root of planted) rmSync(root, { recursive: true, force: true })
})

const over = (root: string, files: readonly string[]): BuildContext => ({
  repoRoots: new Map<Repo, string>([["instructions", root]]),
  repoFiles: new Map<Repo, readonly string[]>([["instructions", files]]),
  commit: "abc1234",
})

describe("a snapshot's identity covers what it read and nothing else", () => {
  test("the code repository stands as the commit it was read at", () => {
    const ctx: BuildContext = {
      repoRoots: new Map<Repo, string>([["code", "/var/tmp/absent"]]),
      repoFiles: new Map<Repo, readonly string[]>([["code", ["a.ts"]]]),
      commit: "abc1234",
    }
    expect(identityOf(ctx).repos.code).toBe("abc1234")
  })

  test("a repository no producer reads is nowhere in the identity", () => {
    const identity = identityOf(readRepos("HEAD"))
    expect(Object.keys(identity.repos).sort()).toEqual([...GRAPH_REPOS].sort())
    expect(identity.repos.memory).toBeUndefined()
  })

  test("editing a file the snapshot read moves the identity", () => {
    const root = plant({ "one.md": "one\n", "two.md": "two\n" })
    const before = identityKey(identityOf(over(root, ["one.md", "two.md"])))
    writeFileSync(join(root, "two.md"), "two, longer\n")
    expect(identityKey(identityOf(over(root, ["one.md", "two.md"])))).not.toBe(before)
  })

  test("a file the snapshot never read moves nothing, however it changes", () => {
    const root = plant({ "one.md": "one\n", "unread.md": "unread\n" })
    const before = identityKey(identityOf(over(root, ["one.md"])))
    writeFileSync(join(root, "unread.md"), "rewritten entirely\n")
    expect(identityKey(identityOf(over(root, ["one.md"])))).toBe(before)
  })

  test("reading the same tree twice gives the same identity", () => {
    const root = plant({ "one.md": "one\n" })
    expect(identityKey(identityOf(over(root, ["one.md"])))).toBe(
      identityKey(identityOf(over(root, ["one.md"])))
    )
  })

  test("a file rewritten to the same length still moves the identity", () => {
    const root = plant({ "one.md": "aaa\n" })
    const before = identityKey(identityOf(over(root, ["one.md"])))
    const later = new Date(Date.now() + 5_000)
    writeFileSync(join(root, "one.md"), "bbb\n")
    utimesSync(join(root, "one.md"), later, later)
    expect(identityKey(identityOf(over(root, ["one.md"])))).not.toBe(before)
  })
})
