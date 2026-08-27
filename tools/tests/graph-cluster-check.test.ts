import { describe, expect, test } from "bun:test"
import {
  CHECK_WORKFLOW_SOURCE,
  readComposition,
} from "../lib/graph/producers/cluster-check/composition.ts"
import {
  type PageTree,
  readClusterCheckPages,
} from "../lib/graph/producers/cluster-check/discover.ts"
import { buildClusterCheckNodes } from "../lib/graph/producers/cluster-check/cluster-check.node.producer.ts"
import type { ClusterCheckAttrs } from "../lib/graph/producers/cluster-check/types.ts"
import type { StepAttrs } from "../lib/graph/producers/pipeline/types.ts"
import type { SourceTree } from "../lib/graph/producers/pipeline/workflow-modules.ts"

const page = (front: string): string => `---\n${front}---\n\n# Definition\n\n- **A** — a line.\n`

const SHELLCHECK = page(
  [
    `page-type-slug: cluster-check`,
    `title: "Shellcheck check"`,
    `runner-name: shellcheck`,
    `script: infra/cluster-checks/src/checks/check-shellcheck.ts`,
    `dispatch-node-types:`,
    `  - kind: sh-file`,
    `image: "debian:trixie"`,
    `slug: cluster-check-shellcheck`,
  ].join("\n") + "\n"
)

const GRAPH = page(
  [
    `page-type-slug: cluster-check`,
    `title: "CI workflow graph check"`,
    `runner-name: ci-workflow-graph`,
    `script: packages/infra/checks/src/checks/check-ci-workflow-graph.ts`,
    `tree-sha: true`,
    `always-run: false`,
    `depends-on:`,
    `  - shellcheck`,
    `dispatch-node-types:`,
    `  - kind: workflow`,
    `  - kind: ts-file`,
    `    under: packages/infra/ci/worker/src/pure`,
    `slug: cluster-check-ci-workflow-graph`,
  ].join("\n") + "\n"
)

const NAMELESS = page(
  [
    `page-type-slug: cluster-check`,
    `title: "Nameless"`,
    `runner-name: nameless`,
    `slug: cluster-check-nameless`,
  ].join("\n") + "\n"
)

const plant = (files: Record<string, string>): PageTree => ({
  files: Object.keys(files),
  read: (path) => files[path] ?? null,
})

const PAGES = plant({
  "pages/cluster-check/cluster-check-shellcheck.cluster-check.md": SHELLCHECK,
  "pages/cluster-check/cluster-check-ci-workflow-graph.cluster-check.md": GRAPH,
  "pages/domain/check.domain.md": page(`slug: check\n`),
})

const WORKFLOW_SOURCE = [
  `const STEP_PREFIX = "check-"`,
  `const IMAGES = { BUN: "debian:bookworm-slim" }`,
  `function makeCheckStep(config) {`,
  `  const image = config.image ?? IMAGES.BUN`,
  `  return { name: \`\${STEP_PREFIX}\${config.name}\`, image }`,
  `}`,
].join("\n")

const sourceTree = (body: string | null): SourceTree => ({
  files: body === null ? [] : [CHECK_WORKFLOW_SOURCE],
  read: (path) => (path === CHECK_WORKFLOW_SOURCE ? body : null),
})

describe("the graph reads a cluster check off its page", () => {
  test("every page under the cluster check folder stands as a check, and nothing else does", () => {
    const checks = readClusterCheckPages(PAGES)
    expect(checks.map((c) => c.name)).toEqual(["ci-workflow-graph", "shellcheck"])
  })

  test("a dispatch target narrowed to a directory keeps both of the keys it states", () => {
    const graph = readClusterCheckPages(PAGES).find((c) => c.name === "ci-workflow-graph")
    expect(graph?.dispatchNodeTypes).toEqual([
      { kind: "workflow" },
      { kind: "ts-file", under: "packages/infra/ci/worker/src/pure" },
    ])
  })

  test("a page's booleans and lists arrive as booleans and lists rather than as their spelling", () => {
    const byName = new Map(readClusterCheckPages(PAGES).map((c) => [c.name, c]))
    expect(byName.get("ci-workflow-graph")?.treeSha).toBe(true)
    expect(byName.get("ci-workflow-graph")?.alwaysRun).toBe(false)
    expect(byName.get("ci-workflow-graph")?.dependsOn).toEqual(["shellcheck"])
    expect(byName.get("shellcheck")?.treeSha).toBeUndefined()
  })

  test("a page naming no script is refused rather than standing as a check with none", () => {
    const tree = plant({ "pages/cluster-check/cluster-check-nameless.md": NAMELESS })
    expect(() => readClusterCheckPages(tree)).toThrow(/names no script/)
  })

  test("two pages calling themselves one name are refused rather than one silently winning", () => {
    const tree = plant({
      "pages/cluster-check/cluster-check-shellcheck.cluster-check.md": SHELLCHECK,
      "pages/cluster-check/nested/cluster-check-shellcheck.md": SHELLCHECK,
    })
    expect(() => readClusterCheckPages(tree)).toThrow(/both call themselves shellcheck/)
  })
})

describe("a check page becomes a step of the check workflow", () => {
  const composition = { stepPrefix: "check-", defaultImage: "debian:bookworm-slim" }

  test("each check stands as a cluster check node and as a step of the check workflow", () => {
    const nodes = buildClusterCheckNodes(readClusterCheckPages(PAGES), composition)
    expect(nodes.filter((n) => n.type === "cluster-check")).toHaveLength(2)
    const steps = nodes.filter((n) => n.type === "step")
    expect(steps.map((n) => (n.attrs as StepAttrs).name)).toEqual([
      "check-ci-workflow-graph",
      "check-shellcheck",
    ])
    expect(steps.map((n) => n.key)).toContain("check:check-shellcheck")
  })

  test("a step takes the image its page states, and the composed default where it states none", () => {
    const nodes = buildClusterCheckNodes(readClusterCheckPages(PAGES), composition)
    const byName = new Map(
      nodes.filter((n) => n.type === "step").map((n) => [(n.attrs as StepAttrs).name, n.attrs as StepAttrs])
    )
    expect(byName.get("check-shellcheck")?.image).toBe("debian:trixie")
    expect(byName.get("check-ci-workflow-graph")?.image).toBe("debian:bookworm-slim")
  })

  test("a step's dependency carries the same prefix the step names carry", () => {
    const nodes = buildClusterCheckNodes(readClusterCheckPages(PAGES), composition)
    const step = nodes
      .filter((n) => n.type === "step")
      .map((n) => n.attrs as StepAttrs)
      .find((a) => a.name === "check-ci-workflow-graph")
    expect(step?.dependsOnSteps).toEqual(["check-shellcheck"])
  })

  test("a cluster check node keeps the page it was read from", () => {
    const nodes = buildClusterCheckNodes(readClusterCheckPages(PAGES), composition)
    const check = nodes.find((n) => n.type === "cluster-check" && n.key === "shellcheck")
    expect((check?.attrs as ClusterCheckAttrs).pagePath).toBe(
      "pages/cluster-check/cluster-check-shellcheck.cluster-check.md"
    )
  })
})

describe("how a check step is composed is read from source rather than restated here", () => {
  test("the step prefix and the default image are taken from the workflow that composes them", () => {
    expect(readComposition(sourceTree(WORKFLOW_SOURCE))).toEqual({
      stepPrefix: "check-",
      defaultImage: "debian:bookworm-slim",
    })
  })

  test("a source carrying no step prefix is refused rather than composed with a guess", () => {
    const body = WORKFLOW_SOURCE.replace(`const STEP_PREFIX = "check-"`, `const OTHER = "check-"`)
    expect(() => readComposition(sourceTree(body))).toThrow(/no readable STEP_PREFIX/)
  })
})
