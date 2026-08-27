import { execFileSync } from "node:child_process"
import { describe, expect, test } from "bun:test"
import { AKASHA, resolveRoots, rootFor } from "../../../../../repo/roots/roots"
import { createGraph } from "../../graph.ts"
import type { Graph, Node } from "../../types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { CODE_REPO, INSTRUCTIONS_REPO } from "../../../../../repo/scope/scope.ts"
import { tsFileIdIn } from "./k8s-synth.edge.producer.ts"

const GIT_OUTPUT_CEILING = 64 * 1024 * 1024

const roots = resolveRoots()

const trackedTs = (root: string): ReadonlySet<string> =>
  new Set(
    execFileSync("git", ["-C", root, "ls-files", "-z"], {
      encoding: "utf-8",
      maxBuffer: GIT_OUTPUT_CEILING,
    })
      .split("\0")
      .filter((one) => one.endsWith(".ts") || one.endsWith(".tsx"))
  )

/**
 * The paths that stand under both repository labels.
 *
 * ONE TREE CARRIES BOTH LABELS now that akasha has absorbed `code` and `instructions`, so every
 * TypeScript file tracked here stands under both and the ambiguity `tsFileIdIn` settles is every
 * path's rather than a rare few. This took a root per label and intersected them; `rootFor` throws
 * on either name, so the whole file errored before a case ran.
 */
const collisions = [...trackedTs(rootFor(roots, AKASHA))].sort()

const idFor = (repo: string, key: string): string => `${TS_FILE_NODE_TYPE}:${repo}:${key}`

const tsNode = (repo: string, key: string): Node => ({
  type: TS_FILE_NODE_TYPE,
  repo,
  key,
  attrs: {},
  id: idFor(repo, key),
  derived: {},
})

const graphOf = (nodes: readonly Node[]): Graph => createGraph(nodes, [])

const NAMED = "a synth module"

const refusalFrom = (run: () => string): string => {
  try {
    run()
  } catch (error) {
    return (error as Error).message
  }
  return ""
}

describe("which file a synth module's path picks out", () => {
  test("the tree was read for some path, so a silence here is the instrument and not the case", () => {
    expect(collisions.length).toBeGreaterThan(0)
  })

  test("a path standing in both repos answers with the code-repo file, the repo it came from", () => {
    const path = collisions[0] as string
    const graph = graphOf([tsNode(CODE_REPO, path), tsNode(INSTRUCTIONS_REPO, path)])
    expect(tsFileIdIn(graph, CODE_REPO, path, NAMED)).toBe(idFor(CODE_REPO, path))
  })

  test("a path standing only in another repo is refused rather than answered with that repo's file", () => {
    const path = collisions[0] as string
    const graph = graphOf([tsNode(INSTRUCTIONS_REPO, path)])
    expect(refusalFrom(() => tsFileIdIn(graph, CODE_REPO, path, NAMED))).toContain(CODE_REPO)
  })

  test("a path standing in no repository is refused", () => {
    const path = collisions[0] as string
    expect(refusalFrom(() => tsFileIdIn(graphOf([]), CODE_REPO, path, NAMED))).toContain(
      "no TypeScript file node stands at that path in any repository"
    )
  })

  test("every refusal names the repository the reader must put the file in", () => {
    const path = collisions[0] as string
    const nowhere = refusalFrom(() => tsFileIdIn(graphOf([]), CODE_REPO, path, NAMED))
    const elsewhere = refusalFrom(() =>
      tsFileIdIn(graphOf([tsNode(INSTRUCTIONS_REPO, path)]), CODE_REPO, path, NAMED)
    )
    expect([nowhere, elsewhere].every((one) => one.includes(`add the file to ${CODE_REPO}`))).toBe(
      true
    )
  })

  test("a path standing only in the repo it came from answers with it", () => {
    const path = collisions[0] as string
    const graph = graphOf([tsNode(CODE_REPO, path)])
    expect(tsFileIdIn(graph, CODE_REPO, path, NAMED)).toBe(idFor(CODE_REPO, path))
  })
})
