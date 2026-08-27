import { execFileSync } from "node:child_process"
import { describe, expect, test } from "bun:test"
import { CODE, resolveRoots, rootFor } from "../../../../../repo/roots/roots"
import { readAt } from "../../held-snapshot.ts"
import { discoverTsFiles, readWorkspaces } from "../file/ts-file/discover.ts"
import { CODE_REPO } from "./constants.ts"
import { curatedWorkspaces } from "./curation.ts"

const codeRoot = process.env.WORKSPACE ?? rootFor(resolveRoots(), CODE)

const treeSha = execFileSync("git", ["-C", codeRoot, "rev-parse", "HEAD^{tree}"], {
  encoding: "utf-8",
}).trim()

const ctx = readAt(treeSha).ctx

const curated: ReadonlySet<string> = new Set(Object.keys(curatedWorkspaces(ctx) ?? {}))

const workspaces = readWorkspaces(ctx, CODE_REPO)

const uncurated: ReadonlySet<string> = new Set(
  workspaces.map((one) => one.root).filter((root) => !curated.has(root))
)

const files = discoverTsFiles(ctx)

describe("what the curation names, and what it does not", () => {
  test("the reading is not empty, so a silence here is the tree and not the instrument", () => {
    expect({
      workspaces: workspaces.length > 0,
      curated: curated.size > 0,
      files: files.length > 0,
    }).toEqual({ workspaces: true, curated: true, files: true })
  })

  test("some declared workspace stands outside the curation, so the next case is not vacuous", () => {
    expect(uncurated.size).toBeGreaterThan(0)
  })

  test("a workspace the curation does not name still contributes ts-file nodes", () => {
    const standing = files.filter((one) => uncurated.has(one.workspaceRoot))
    expect(standing.length).toBeGreaterThan(0)
  })
})
