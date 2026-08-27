import { execFileSync } from "node:child_process"
import { describe, expect, test } from "bun:test"
import { assembleEngine } from "../lib/graph/snapshot.ts"
import { readRepos } from "../lib/graph/repos.ts"
import type { StepAttrs } from "../lib/graph/producers/pipeline/types.ts"
import type { Graph } from "../lib/graph/types.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

const BUILD_CEILING_MS = 300_000

const headCommit = (): string =>
  execFileSync("git", ["-C", rootFor(resolveRoots(), AKASHA), "rev-parse", "HEAD"], {
    encoding: "utf-8",
    timeout: 10_000,
  }).trim()

const snapshot = async (): Promise<Graph> => (await assembleEngine()).build(readRepos(headCommit()))

describe("every producer standing here builds into one graph", () => {
  test("the whole assembly builds, and each repository it covers stands in what it built", async () => {
    const graph = await snapshot()
    const repos = new Set(graph.nodes().map((node) => node.repo))
    console.log(
      `graph-snapshot: ${graph.nodes().length} node(s), ${graph.edges().length} edge(s), over ${repos.size} repositor(y/ies)`
    )
    expect(graph.nodes().length).toBeGreaterThan(0)
    expect(repos.has("code")).toBe(true)
    expect(repos.has("instructions")).toBe(true)
  }, BUILD_CEILING_MS)

  test("every check page stands as a step of the check workflow, and no other step does", async () => {
    const graph = await snapshot()
    const checks = graph.nodes("cluster-check")
    const steps = graph
      .nodes("step")
      .filter((node) => (node.attrs as StepAttrs).workflow === "check")
    console.log(`graph-snapshot: ${checks.length} check page(s), ${steps.length} check step(s)`)
    expect(checks.length).toBeGreaterThan(0)
    expect(steps.length).toBe(checks.length)
  }, BUILD_CEILING_MS)
})
