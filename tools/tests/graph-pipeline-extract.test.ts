import { describe, expect, test } from "bun:test"
import { buildPipelineNodes } from "../lib/graph/producers/pipeline/pipeline.node.producer.ts"
import { PIPELINE_REPO } from "../lib/graph/producers/pipeline/types.ts"
import {
  extractWorkflows,
  type WorkflowSource,
} from "../lib/graph/producers/pipeline/workflow-extract.ts"
import type {
  StepAttrs,
  WorkflowAttrs,
} from "../lib/graph/producers/pipeline/types.ts"
import type { SourceTree } from "../lib/graph/producers/pipeline/workflow-modules.ts"

const DSL_FILES: Record<string, string> = {
  "packages/kit/dsl/package.json": JSON.stringify({
    name: "@kit/dsl",
    exports: { ".": "./src/index.ts" },
  }),
  "packages/kit/dsl/src/index.ts": [
    `export { IMAGES } from "./images"`,
    `export { step } from "./step"`,
    `export { workflow } from "./workflow"`,
    `export { applyManifest } from "./apply-manifest"`,
    `export { onMainOnly } from "./gate"`,
  ].join("\n"),
  "packages/kit/dsl/src/images.ts": [
    `export const REGISTRY = "registry.example:5000"`,
    `export const IMAGES = {`,
    `  RUNNER: \`\${REGISTRY}/cluster/runner:latest\`,`,
    `  TOOLS: \`\${REGISTRY}/cluster/tools:latest\`,`,
    `} as const`,
  ].join("\n"),
  "packages/kit/dsl/src/step.ts": [
    `export function step(config) {`,
    `  return config`,
    `}`,
  ].join("\n"),
  "packages/kit/dsl/src/workflow.ts": [
    `const DEFAULT_WHEN = { event: "push" }`,
    `export function workflow(name, config) {`,
    `  const { when, ...rest } = config`,
    `  return { name, when: when ?? DEFAULT_WHEN, ...rest }`,
    `}`,
  ].join("\n"),
  "packages/kit/dsl/src/apply-manifest.ts": [
    `import { IMAGES } from "./images"`,
    `export function applyManifest(config) {`,
    `  return {`,
    `    name: config.name,`,
    `    image: IMAGES.TOOLS,`,
    `    ...(config.dependsOn && { dependsOn: config.dependsOn }),`,
    `  }`,
    `}`,
  ].join("\n"),
  "packages/kit/dsl/src/gate.ts": [
    `export function onMainOnly(s) {`,
    `  return { ...s, commands: [] }`,
    `}`,
  ].join("\n"),
}

const SHARED_STEPS = [
  `import { applyManifest } from "@kit/dsl"`,
  `export const SHARED_STEPS = [`,
  `  applyManifest({ name: "shared-apply", dependsOn: ["site-build"] }),`,
  `]`,
].join("\n")

const SITE_WORKFLOW = [
  `import { applyManifest, IMAGES, onMainOnly, step, workflow } from "@kit/dsl"`,
  `import { SHARED_STEPS } from "./shared-steps"`,
  ``,
  `export default workflow("site", {`,
  `  dependsOn: ["preparation"],`,
  `  when: { branch: "main", event: "push" },`,
  `  dispatchNodes: ["package:@site/web"],`,
  `  steps: [`,
  `    step({ name: "site-build", image: IMAGES.RUNNER, alwaysRun: true }),`,
  `    applyManifest({ name: "site-apply", dependsOn: ["site-build"] }),`,
  `    { ...onMainOnly(applyManifest({ name: "site-gated" })), dependsOn: ["site-apply"] },`,
  `    ...SHARED_STEPS,`,
  `  ],`,
  `})`,
].join("\n")

const LIST_WORKFLOW = [
  `import { IMAGES, step, workflow } from "@kit/dsl"`,
  ``,
  `export const workflows = [`,
  `  workflow("docs", {`,
  `    package: "@site/docs",`,
  `    disabled: true,`,
  `    when: { event: "push" },`,
  `    steps: [step({ name: "docs-build", image: IMAGES.RUNNER, script: "build.sh" })],`,
  `  }),`,
  `]`,
].join("\n")

const LOOP_WORKFLOW = [
  `import { IMAGES, step, workflow } from "@kit/dsl"`,
  ``,
  `const TARGETS = ["one", "two"]`,
  ``,
  `export default workflow("fanout", {`,
  `  when: { event: "push" },`,
  `  steps: TARGETS.map((t) => step({ name: \`fanout-\${t}\`, image: IMAGES.RUNNER })),`,
  `})`,
].join("\n")

const SERVICE_STEPS = [
  `import { IMAGES, step } from "@kit/dsl"`,
  `export function serviceSteps(name, after) {`,
  `  return [`,
  `    step({ name: \`\${name}-build\`, image: IMAGES.RUNNER, dependsOn: after }),`,
  `    step({ name: \`\${name}-apply\`, image: IMAGES.TOOLS, dependsOn: [\`\${name}-build\`] }),`,
  `  ]`,
  `}`,
].join("\n")

const IDS = [
  `const PREFIX = "queue-config:"`,
  `export const queueId = (n) => \`\${PREFIX}\${n}\``,
  `export const QUEUE_ID = queueId("main")`,
].join("\n")

const FACTORY_WORKFLOW = [
  `import { IMAGES, step, workflow } from "@kit/dsl"`,
  `import { serviceSteps } from "./service-steps"`,
  `import { QUEUE_ID } from "./ids"`,
  ``,
  `export default workflow("queue", {`,
  `  when: { event: "push" },`,
  `  dispatchNodes: [QUEUE_ID],`,
  `  steps: [`,
  `    step({ name: "queue-prepare", image: IMAGES.RUNNER }),`,
  `    ...serviceSteps("queue", ["queue-prepare"]),`,
  `  ],`,
  `})`,
].join("\n")

const FAN_STEPS = [
  `import { IMAGES, step } from "@kit/dsl"`,
  `export function fanSteps(names) {`,
  `  return names.map((n) => step({ name: \`fan-\${n}\`, image: IMAGES.RUNNER }))`,
  `}`,
].join("\n")

const FAN_WORKFLOW = [
  `import { IMAGES, step, workflow } from "@kit/dsl"`,
  `import { fanSteps } from "./fan-steps"`,
  ``,
  `export default workflow("fan", {`,
  `  when: { event: "push" },`,
  `  steps: [`,
  `    step({ name: "fan-prepare", image: IMAGES.RUNNER }),`,
  `    ...fanSteps(["one", "two"]),`,
  `  ],`,
  `})`,
].join("\n")

const EMPTY_WORKFLOW = [
  `export const notAWorkflow = { title: "nothing declared here" }`,
].join("\n")

const plant = (extra: Record<string, string>): SourceTree => {
  const files = { ...DSL_FILES, ...extra }
  return {
    files: Object.keys(files),
    read: (path) => files[path] ?? null,
  }
}

const FULL = plant({
  "packages/site/web/shared-steps.ts": SHARED_STEPS,
  "packages/site/web/foundation.workflow.ts": SITE_WORKFLOW,
  "packages/site/docs/apps.workflow.ts": LIST_WORKFLOW,
})

const SOURCES: readonly WorkflowSource[] = [
  { sourcePath: "packages/site/web/foundation.workflow.ts", kind: "apps" },
  { sourcePath: "packages/site/docs/apps.workflow.ts", kind: "foundation" },
]

const QUEUE_SOURCE = "packages/site/queue/foundation.workflow.ts"

const QUEUE_SOURCES: readonly WorkflowSource[] = [
  { sourcePath: QUEUE_SOURCE, kind: "foundation" },
]

const sourced = (sourcePath: string): readonly WorkflowSource[] => [
  { sourcePath, kind: "foundation" },
]

const QUEUE = plant({
  "packages/site/queue/service-steps.ts": SERVICE_STEPS,
  "packages/site/queue/ids.ts": IDS,
  [QUEUE_SOURCE]: FACTORY_WORKFLOW,
})

describe("extractWorkflows", () => {
  test("a workflow declared in source stands in the graph the producer builds", () => {
    const { workflows } = extractWorkflows(FULL, SOURCES)
    const nodes = buildPipelineNodes("code", workflows)
    const declared = new Set(["site", "docs"])
    const built = new Set(
      nodes.filter((n) => n.type === "workflow").map((n) => (n.attrs as WorkflowAttrs).name)
    )
    for (const name of declared) expect(built.has(name)).toBe(true)
  })

  test("a workflow carries the kind its source states, not the one its file name spells", () => {
    const { workflows } = extractWorkflows(FULL, SOURCES)
    const byName = new Map(workflows.map((w) => [w.name, w]))
    expect(byName.get("site")?.kind).toBe("apps")
    expect(byName.get("docs")?.kind).toBe("foundation")
  })

  test("a workflow node stands in the repo whose pages declare it", () => {
    const { workflows } = extractWorkflows(FULL, SOURCES)
    const nodes = buildPipelineNodes(PIPELINE_REPO, workflows)
    expect(nodes.length).toBeGreaterThan(0)
    for (const node of nodes) expect(node.repo).toBe(PIPELINE_REPO)
  })

  test("a workflow's declared attributes are read without the module being run", () => {
    const { workflows } = extractWorkflows(FULL, SOURCES)
    const site = workflows.find((w) => w.name === "site")
    expect(site?.branch).toBe("main")
    expect(site?.dependsOn).toEqual(["preparation"])
    expect(site?.dispatchNodes).toEqual(["package:@site/web"])
    const docs = workflows.find((w) => w.name === "docs")
    expect(docs?.package).toBe("@site/docs")
    expect(docs?.disabled).toBe(true)
    expect(docs?.steps[0]?.script).toBe("build.sh")
  })

  test("a step takes the image its template declares in another module", () => {
    const { workflows } = extractWorkflows(FULL, SOURCES)
    const steps = workflows.find((w) => w.name === "site")?.steps ?? []
    const byName = new Map(steps.map((s) => [s.name, s]))
    expect(byName.get("site-build")?.image).toBe("registry.example:5000/cluster/runner:latest")
    expect(byName.get("site-apply")?.image).toBe("registry.example:5000/cluster/tools:latest")
    expect(byName.get("site-build")?.alwaysRun).toBe(true)
    expect(byName.get("site-apply")?.dependsOn).toEqual(["site-build"])
  })

  test("a step handed through a wrapper and one spread in from another module both stand", () => {
    const { workflows } = extractWorkflows(FULL, SOURCES)
    const steps = workflows.find((w) => w.name === "site")?.steps ?? []
    const names = steps.map((s) => s.name)
    expect(names).toContain("site-gated")
    expect(names).toContain("shared-apply")
    const nodes = buildPipelineNodes("code", workflows)
    const stepNames = nodes
      .filter((n) => n.type === "step")
      .map((n) => (n.attrs as StepAttrs).name)
    expect(stepNames).toContain("shared-apply")
  })

  test("steps spread in from a call stand, with the arguments written at the call site put through", () => {
    const { workflows, gaps } = extractWorkflows(QUEUE, QUEUE_SOURCES)
    expect(gaps).toEqual([])
    const steps = workflows.find((w) => w.name === "queue")?.steps ?? []
    expect(steps.map((s) => s.name)).toEqual(["queue-prepare", "queue-build", "queue-apply"])
    const byName = new Map(steps.map((s) => [s.name, s]))
    expect(byName.get("queue-build")?.image).toBe("registry.example:5000/cluster/runner:latest")
    expect(byName.get("queue-apply")?.image).toBe("registry.example:5000/cluster/tools:latest")
    expect(byName.get("queue-build")?.dependsOn).toEqual(["queue-prepare"])
    expect(byName.get("queue-apply")?.dependsOn).toEqual(["queue-build"])
  })

  test("a node id a call composes is read as the string it composes", () => {
    const { workflows } = extractWorkflows(QUEUE, QUEUE_SOURCES)
    expect(workflows.find((w) => w.name === "queue")?.dispatchNodes).toEqual(["queue-config:main"])
  })

  test("a step assembled in a loop is reported as a gap rather than dropped in silence", () => {
    const tree = plant({ "packages/site/fan/foundation.workflow.ts": LOOP_WORKFLOW })
    const { workflows, gaps } = extractWorkflows(tree, sourced("packages/site/fan/foundation.workflow.ts"))
    expect(workflows).toHaveLength(1)
    expect(workflows[0]?.steps).toHaveLength(0)
    expect(gaps).toHaveLength(1)
    expect(gaps[0]?.workflow).toBe("fanout")
    expect(gaps[0]?.sourcePath).toBe("packages/site/fan/foundation.workflow.ts")
    expect(gaps[0]?.construct).toBe("steps-not-a-declared-array")
    expect(gaps[0]?.text).toContain("TARGETS.map")
  })

  test("a call that iterates rather than returning a declaration is a gap, and what stands beside it is kept", () => {
    const tree = plant({
      "packages/site/spread/fan-steps.ts": FAN_STEPS,
      "packages/site/spread/foundation.workflow.ts": FAN_WORKFLOW,
    })
    const { workflows, gaps } = extractWorkflows(
      tree,
      sourced("packages/site/spread/foundation.workflow.ts")
    )
    expect(workflows.find((w) => w.name === "fan")?.steps.map((s) => s.name)).toEqual([
      "fan-prepare",
    ])
    expect(gaps).toHaveLength(1)
    expect(gaps[0]?.construct).toBe("step-spread-not-a-declared-array")
    expect(gaps[0]?.text).toContain("fanSteps")
  })

  test("a file named as a workflow that declares none is refused rather than passed over", () => {
    const tree = plant({ "packages/site/void/foundation.workflow.ts": EMPTY_WORKFLOW })
    expect(() =>
      extractWorkflows(tree, sourced("packages/site/void/foundation.workflow.ts"))
    ).toThrow(/no workflow stands in its source/)
  })

  test("a file the snapshot does not carry is refused rather than passed over", () => {
    expect(() => extractWorkflows(FULL, sourced("packages/site/gone/foundation.workflow.ts"))).toThrow(
      /carries no body/
    )
  })
})