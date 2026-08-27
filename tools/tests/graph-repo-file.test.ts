import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Repo } from "../../page/document/types.ts"
import { readRepoFile } from "../lib/graph/repos.ts"
import type { BuildContext } from "../lib/graph/types.ts"

const AT_COMMIT = "what the commit holds\n"
const AS_IT_STANDS = "what the working tree holds\n"

let root = ""
let commit = ""

beforeAll(() => {
  root = mkdtempSync("/var/tmp/graph-repo-file-")
  const git = (...args: readonly string[]): string =>
    execFileSync("git", ["-C", root, ...args], { encoding: "utf-8" })
  git("init", "-q")
  git("config", "user.email", "seat@example.com")
  git("config", "user.name", "Seat")
  writeFileSync(join(root, "held.txt"), AT_COMMIT)
  git("add", "held.txt")
  git("commit", "-q", "-m", "first")
  commit = git("rev-parse", "HEAD").trim()
  writeFileSync(join(root, "held.txt"), AS_IT_STANDS)
})

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

const contextFor = (repo: Repo): BuildContext => ({
  repoRoots: new Map([[repo, root]]),
  repoFiles: new Map(),
  commit,
})

describe("readRepoFile", () => {
  test("the code repository is read at the commit rather than as it stands", () => {
    expect(readRepoFile(contextFor("code"), "code", "held.txt")).toBe(AT_COMMIT)
  })

  test("every other repository is read as it stands rather than at a commit", () => {
    expect(readRepoFile(contextFor("memory"), "memory", "held.txt")).toBe(AS_IT_STANDS)
  })

  test("a file a repository does not hold is read as nothing", () => {
    expect(readRepoFile(contextFor("code"), "code", "absent.txt")).toBeNull()
    expect(readRepoFile(contextFor("memory"), "memory", "absent.txt")).toBeNull()
  })

  test("a repository the snapshot never read is read as nothing", () => {
    expect(readRepoFile(contextFor("code"), "books", "held.txt")).toBeNull()
  })
})
