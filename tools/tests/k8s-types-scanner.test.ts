import { describe, expect, it } from "bun:test"
import { POD_TEMPLATE_KINDS, scanManifestText } from "@infra/k8s-types/k8s-manifest-scanner"

const lines = (...text: readonly string[]): string => text.join("\n")

const DEPLOYMENT = lines(
  "apiVersion: apps/v1",
  "kind: Deployment",
  "metadata:",
  '  name: "web"',
  "  namespace: serve",
  "spec:",
  "  template:",
  "    spec:",
  "      nodeSelector:",
  "        kubernetes.io/hostname: node-03",
  "      nodeName: node-03",
  "      containers:",
  "        - name: app",
  "          image: registry/app:1",
  "          resources:",
  "            requests:",
  "              memory: 256Mi",
  "            limits:",
  "              memory: 512Mi"
)

describe("POD_TEMPLATE_KINDS", () => {
  it("names exactly the kinds that carry a pod template", () => {
    expect([...POD_TEMPLATE_KINDS].sort()).toEqual([
      "CronJob",
      "DaemonSet",
      "Deployment",
      "Job",
      "StatefulSet",
    ])
  })
})

describe("scanManifestText identity", () => {
  it("reads apiVersion and kind from the top level and name and namespace from metadata, unquoted", () => {
    const doc = scanManifestText(DEPLOYMENT).docs[0]
    expect(doc?.apiVersion).toBe("apps/v1")
    expect(doc?.kind).toBe("Deployment")
    expect(doc?.name).toBe("web")
    expect(doc?.namespace).toBe("serve")
  })

  it("bounds the document by its first and last non-blank line and reports no errors", () => {
    const result = scanManifestText(DEPLOYMENT)
    expect(result.docs[0]?.startLine).toBe(1)
    expect(result.docs[0]?.endLine).toBe(19)
    expect(result.errors).toEqual([])
  })

  it("gives each document of a multi-document file its own span", () => {
    const result = scanManifestText(
      lines("apiVersion: v1", "kind: ConfigMap", "---", "", "apiVersion: v1", "kind: Secret")
    )
    expect(result.docs.length).toBe(2)
    expect(result.docs.map((doc) => doc.kind)).toEqual(["ConfigMap", "Secret"])
    expect(result.docs.map((doc) => doc.startLine)).toEqual([1, 5])
    expect(result.docs.map((doc) => doc.endLine)).toEqual([2, 6])
  })
})

describe("scanManifestText node targeting", () => {
  it("reads the node selector, node name and pod template flag of a Deployment", () => {
    const doc = scanManifestText(DEPLOYMENT).docs[0]
    expect(doc?.hasPodTemplate).toBe(true)
    expect(doc?.nodeSelectorKeys).toEqual(["kubernetes.io/hostname"])
    expect(doc?.hostnameSelector).toBe("node-03")
    expect(doc?.workloadClassSelector).toBeUndefined()
    expect(doc?.nodeName).toBe("node-03")
    expect(doc?.hasPodAffinity).toBe(false)
    expect(doc?.nodeAffinityKeys).toEqual([])
  })

  it("reads the workload class selector under its own key", () => {
    const doc = scanManifestText(
      lines(
        "apiVersion: v1",
        "kind: Pod",
        "spec:",
        "  nodeSelector:",
        "    alanwalton.com/workload-class: serve"
      )
    ).docs[0]
    expect(doc?.nodeSelectorKeys).toEqual(["alanwalton.com/workload-class"])
    expect(doc?.workloadClassSelector).toBe("serve")
    expect(doc?.hostnameSelector).toBeUndefined()
  })

  it("reads no node targeting for a kind whose pod spec has no known location", () => {
    const doc = scanManifestText(
      lines(
        "apiVersion: v1",
        "kind: Service",
        "spec:",
        "  nodeSelector:",
        "    kubernetes.io/hostname: node-01"
      )
    ).docs[0]
    expect(doc?.hasPodTemplate).toBe(false)
    expect(doc?.nodeSelectorKeys).toEqual([])
    expect(doc?.hostnameSelector).toBeUndefined()
  })

  it("reaches the pod spec a CronJob nests two templates deep", () => {
    const doc = scanManifestText(
      lines(
        "apiVersion: batch/v1",
        "kind: CronJob",
        "spec:",
        "  jobTemplate:",
        "    spec:",
        "      template:",
        "        spec:",
        "          nodeName: node-05"
      )
    ).docs[0]
    expect(doc?.hasPodTemplate).toBe(true)
    expect(doc?.nodeName).toBe("node-05")
  })

  it("separates pod affinity from node affinity", () => {
    const nodeAffinity = scanManifestText(
      lines(
        "apiVersion: v1",
        "kind: Pod",
        "spec:",
        "  affinity:",
        "    nodeAffinity:",
        "      requiredDuringSchedulingIgnoredDuringExecution:",
        "        nodeSelectorTerms:",
        "          - matchExpressions:",
        "              - key: kubernetes.io/hostname",
        "                operator: In",
        "                values:",
        "                  - node-01"
      )
    ).docs[0]
    expect(nodeAffinity?.hasPodAffinity).toBe(false)
    expect(nodeAffinity?.nodeAffinityKeys).toEqual(["kubernetes.io/hostname"])

    const podAffinity = scanManifestText(
      lines(
        "apiVersion: v1",
        "kind: Pod",
        "spec:",
        "  affinity:",
        "    podAffinity:",
        "      requiredDuringSchedulingIgnoredDuringExecution:",
        "        - topologyKey: kubernetes.io/hostname"
      )
    ).docs[0]
    expect(podAffinity?.hasPodAffinity).toBe(true)
    expect(podAffinity?.nodeAffinityKeys).toEqual([])
  })
})

describe("scanManifestText container readings", () => {
  it("reports each container's memory request and limit with the line each stands on", () => {
    const doc = scanManifestText(DEPLOYMENT).docs[0]
    expect(doc?.containerResources).toEqual([
      {
        containerName: "app",
        listKey: "containers",
        line: 13,
        requestMemory: { value: "256Mi", line: 17 },
        limitMemory: { value: "512Mi", line: 19 },
      },
    ])
  })

  it("reports an image wherever it stands, with the line it stands on", () => {
    expect(scanManifestText(DEPLOYMENT).docs[0]?.imageLines).toEqual([
      { value: "registry/app:1", line: 14 },
    ])
  })

  it("reports a nameless container carried on the sequence item itself", () => {
    const doc = scanManifestText(
      lines("apiVersion: v1", "kind: Pod", "spec:", "  containers:", "    - image: registry/x:2")
    ).docs[0]
    expect(doc?.imageLines).toEqual([{ value: "registry/x:2", line: 5 }])
    expect(doc?.containerResources).toEqual([
      {
        containerName: undefined,
        listKey: "containers",
        line: 5,
        requestMemory: undefined,
        limitMemory: undefined,
      },
    ])
  })
})

describe("scanManifestText repo paths", () => {
  it("reports each distinct TypeScript package path once, in the order first met", () => {
    const doc = scanManifestText(
      lines(
        "apiVersion: v1",
        "kind: ConfigMap",
        "data:",
        "  a: infra/k8s-types/src/hostnames.ts",
        "  b: infra/k8s-types/src/hostnames.ts",
        "  c: shared/graph-producers/src/k8s/extract.tsx"
      )
    ).docs[0]
    expect(doc?.repoPaths).toEqual([
      "infra/k8s-types/src/hostnames.ts",
      "shared/graph-producers/src/k8s/extract.tsx",
    ])
  })
})

describe("scanManifestText duplicates", () => {
  it("reports a duplicate top-level key and keeps the first reading", () => {
    const result = scanManifestText(lines("apiVersion: v1", "kind: ConfigMap", "kind: Secret"))
    expect(result.errors).toEqual([{ line: 3, message: 'duplicate top-level key "kind"' }])
    expect(result.docs[0]?.kind).toBe("ConfigMap")
  })

  it("reports a duplicate metadata key and keeps the first reading", () => {
    const result = scanManifestText(
      lines("apiVersion: v1", "kind: ConfigMap", "metadata:", "  name: a", "  name: b")
    )
    expect(result.errors).toEqual([{ line: 5, message: 'duplicate metadata key "name"' }])
    expect(result.docs[0]?.name).toBe("a")
  })

  it("reports a duplicate nodeSelector key and keeps the first reading", () => {
    const result = scanManifestText(
      lines(
        "apiVersion: v1",
        "kind: Pod",
        "spec:",
        "  nodeSelector:",
        "    kubernetes.io/hostname: node-01",
        "    kubernetes.io/hostname: node-02"
      )
    )
    expect(result.errors).toEqual([
      { line: 6, message: 'duplicate nodeSelector key "kubernetes.io/hostname"' },
    ])
    expect(result.docs[0]?.hostnameSelector).toBe("node-01")
  })
})
