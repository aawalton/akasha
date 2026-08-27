import { describe, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { codeRoot } from "../lib/code-root.ts"
import { readRepos } from "../lib/graph/repos.ts"

const headOfCode = (): string =>
  execFileSync("git", ["-C", codeRoot(), "rev-parse", "HEAD"], {
    encoding: "utf-8",
  }).trim()

describe("readRepos", () => {
  test("a snapshot is read from the two repositories the graph draws from", () => {
    const ctx = readRepos(headOfCode())
    expect([...ctx.repoFiles.keys()].toSorted()).toEqual(["code", "instructions"])
    expect([...ctx.repoRoots.keys()].toSorted()).toEqual(["code", "instructions"])
  })

  test("a snapshot names the commit it was read at", () => {
    const commit = headOfCode()
    expect(readRepos(commit).commit).toBe(commit)
  })

  test("every path a repository was read for stands inside it", () => {
    const ctx = readRepos(headOfCode())
    for (const [repo, files] of ctx.repoFiles) {
      expect(files.length, `${repo} was read for no files`).toBeGreaterThan(0)
      const outside = files.filter((path) => path === "" || path.startsWith("/"))
      expect(outside, `${repo} was read for paths standing outside it`).toEqual([])
    }
  })

  test("a commit no repository holds is refused rather than read as empty", () => {
    expect(() => readRepos("0000000000000000000000000000000000000000")).toThrow()
  })
})
