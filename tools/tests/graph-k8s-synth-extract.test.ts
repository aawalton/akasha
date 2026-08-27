import { describe, expect, test } from "bun:test"
import {
  extractSynthManifests,
  extractSynthManifestsForService,
} from "../lib/graph/producers/k8s/synth-extract.ts"

const SOURCE_PATH = "packages/infra/k8s/src/app-namespaces/synth.ts"

const NAMESPACE_NAMES: string[] = [
  "alanwalton",
  "archive-of-worlds",
  "audhdalan",
  "collections",
  "connect",
  "design-system",
  "projects",
  "relationships",
  "temper",
  "tracking",
]

const MAPPED_LIST = [
  `import { synthMulti } from "@infra/k8s-types/cdk8s-synth"`,
  ``,
  `export const NAMESPACE_NAMES = [`,
  ...NAMESPACE_NAMES.map((one) => `  "${one}",`),
  `] as const`,
  ``,
  `function namespacesYaml(): string {`,
  `  return synthMulti(`,
  `    "app-namespaces",`,
  `    NAMESPACE_NAMES.map((name) => ({`,
  `      id: name,`,
  `      manifest: {`,
  `        apiVersion: "v1",`,
  `        kind: "Namespace",`,
  `        metadata: {`,
  `          name,`,
  `          labels: {`,
  `            "kubernetes.io/metadata.name": name,`,
  `          },`,
  `        },`,
  `      },`,
  `    }))`,
  `  )`,
  `}`,
].join("\n")

const MAPPED_LIST_WITH_BLOCK_BODY = [
  `import { synthMulti } from "@infra/k8s-types/cdk8s-synth"`,
  ``,
  `const QUEUES = ["one", "two"]`,
  ``,
  `const queuesYaml = () =>`,
  `  synthMulti(`,
  `    "queues",`,
  `    QUEUES.map((queue) => {`,
  `      return {`,
  `        id: queue,`,
  `        manifest: {`,
  `          apiVersion: "v1",`,
  `          kind: "ConfigMap",`,
  `          metadata: { name: queue, namespace: "tracking" },`,
  `        },`,
  `      }`,
  `    })`,
  `  )`,
].join("\n")

const MAPPED_OVER_A_CALL = [
  `import { synthMulti } from "@infra/k8s-types/cdk8s-synth"`,
  ``,
  `function namespacesYaml(): string {`,
  `  return synthMulti(`,
  `    "app-namespaces",`,
  `    listNamespaces().map((name) => ({`,
  `      id: name,`,
  `      manifest: { apiVersion: "v1", kind: "Namespace", metadata: { name } },`,
  `    }))`,
  `  )`,
  `}`,
].join("\n")

const MAPPED_OVER_A_COMPUTED_ARRAY = [
  `import { synthMulti } from "@infra/k8s-types/cdk8s-synth"`,
  ``,
  `const PREFIX = "app"`,
  `const NAMES = [\`\${PREFIX}-one\`, \`\${PREFIX}-two\`]`,
  ``,
  `function namespacesYaml(): string {`,
  `  return synthMulti(`,
  `    "app-namespaces",`,
  `    NAMES.map((name) => ({`,
  `      id: name,`,
  `      manifest: { apiVersion: "v1", kind: "Namespace", metadata: { name } },`,
  `    }))`,
  `  )`,
  `}`,
].join("\n")

const MAPPED_WITHOUT_A_MANIFEST = [
  `import { synthMulti } from "@infra/k8s-types/cdk8s-synth"`,
  ``,
  `const NAMES = ["one", "two"]`,
  ``,
  `function namespacesYaml(): string {`,
  `  return synthMulti(`,
  `    "app-namespaces",`,
  `    NAMES.map((name) => ({ id: name }))`,
  `  )`,
  `}`,
].join("\n")

const NAMED_MANIFESTS = [
  `import { synthMulti } from "@infra/k8s-types/cdk8s-synth"`,
  ``,
  `const NAMESPACE = "seaweedfs"`,
  ``,
  `const configMap = {`,
  `  apiVersion: "v1",`,
  `  kind: "ConfigMap",`,
  `  metadata: { name: "bench-runner", namespace: NAMESPACE },`,
  `} as const`,
  ``,
  `const job = {`,
  `  apiVersion: "batch/v1",`,
  `  kind: "Job",`,
  `  metadata: { name: "bench", namespace: NAMESPACE },`,
  `  spec: { template: { spec: { serviceAccountName: "bench-runner" } } },`,
  `} as const`,
  ``,
  `export default function synth() {`,
  `  return synthMulti(NAMESPACE, [`,
  `    { id: "bench-runner", manifest: configMap },`,
  `    { id: "bench", manifest: job },`,
  `  ])`,
  `}`,
].join("\n")

const MANIFEST_NAMED_BY_AN_IMPORT = [
  `import { synthMulti } from "@infra/k8s-types/cdk8s-synth"`,
  `import { configMap } from "./elsewhere"`,
  ``,
  `export default function synth() {`,
  `  return synthMulti("bench", [{ id: "bench", manifest: configMap }])`,
  `}`,
].join("\n")

describe("extractSynthManifests over a manifest named by a const", () => {
  test("a manifest written as the name of a top-level const object literal is read", () => {
    const manifests = extractSynthManifests("packages/infra/upscale/k8s/synth.ts", NAMED_MANIFESTS)
    expect(manifests.map((one) => one.kind)).toEqual(["ConfigMap", "Job"])
    expect(manifests.map((one) => one.name)).toEqual(["bench-runner", "bench"])
    expect(manifests.map((one) => one.namespace)).toEqual(["seaweedfs", "seaweedfs"])
    expect(manifests[1]?.serviceAccountName).toBe("bench-runner")
  })

  test("a manifest written as a name no const in this service carries is recorded, not dropped", () => {
    expect(() =>
      extractSynthManifestsForService([
        { sourcePath: "packages/infra/upscale/k8s/synth.ts", text: MANIFEST_NAMED_BY_AN_IMPORT },
      ])
    ).toThrow(/a manifest written as the name configMap/)
  })
})

describe("extractSynthManifests over a mapped synthMulti list", () => {
  test("a list mapped from a top-level const array yields one manifest per entry", () => {
    const manifests = extractSynthManifests(SOURCE_PATH, MAPPED_LIST)
    expect(manifests.map((one) => one.name)).toEqual(NAMESPACE_NAMES)
  })

  test("the mapped parameter is substituted wherever the manifest names it", () => {
    const manifests = extractSynthManifests(SOURCE_PATH, MAPPED_LIST)
    for (const manifest of manifests) {
      expect(manifest.kind).toBe("Namespace")
      expect(manifest.apiVersion).toBe("v1")
      expect(manifest.namespace).toBe(null)
      expect(manifest.sourcePath).toBe(SOURCE_PATH)
    }
  })

  test("an arrow that returns its object literal from a block is read the same way", () => {
    const manifests = extractSynthManifests("packages/infra/k8s/src/queues/synth.ts", MAPPED_LIST_WITH_BLOCK_BODY)
    expect(manifests.map((one) => one.name)).toEqual(["one", "two"])
    expect(manifests.map((one) => one.namespace)).toEqual(["tracking", "tracking"])
  })

  test("a service whose only synth file maps a const array no longer yields nothing", () => {
    expect(extractSynthManifestsForService([{ sourcePath: SOURCE_PATH, text: MAPPED_LIST }])).toHaveLength(
      NAMESPACE_NAMES.length
    )
  })
})

describe("extractSynthManifestsForService over a list it cannot read", () => {
  test("a list mapped over something that is not a const array in this service is recorded, not dropped", () => {
    expect(() =>
      extractSynthManifestsForService([{ sourcePath: SOURCE_PATH, text: MAPPED_OVER_A_CALL }])
    ).toThrow(/yielded no manifests/)
  })

  test("a list whose entries are composed rather than written is recorded, not dropped", () => {
    expect(() =>
      extractSynthManifestsForService([
        { sourcePath: SOURCE_PATH, text: MAPPED_OVER_A_COMPUTED_ARRAY },
      ])
    ).toThrow(/could not read as a string/)
  })

  test("a mapped element carrying no manifest is recorded, not dropped", () => {
    expect(() =>
      extractSynthManifestsForService([{ sourcePath: SOURCE_PATH, text: MAPPED_WITHOUT_A_MANIFEST }])
    ).toThrow(/no manifest property/)
  })
})
