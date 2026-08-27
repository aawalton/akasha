import { describe, expect, test } from "bun:test"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
import {
  addressIn,
  ClusterReachRefused,
  clusterReachOf,
  MANAGED_BY,
  manifestFor,
  planClusterReach,
  reachedServices,
  reachOf,
} from "../lib/service-cluster-reach.ts"
import { readServiceDocs } from "../lib/service-project.ts"
import type { ServiceDoc } from "../lib/service-unit.ts"

const doc = (over: Partial<ServiceDoc>): ServiceDoc =>
  ({
    slug: "one",
    root: "/nowhere",
    description: "a service",
    runs: ["bun services/one.ts"],
    enabled: true,
    schedule: null,
    jitterSeconds: null,
    catchUp: false,
    accuracySeconds: null,
    restartDelaySeconds: null,
    restart: null,
    successExitStatus: null,
    restartForceExitStatus: null,
    startLimitIntervalSeconds: null,
    bootDelaySeconds: null,
    intervalSeconds: null,
    startTimeoutSeconds: null,
    stopTimeoutSeconds: null,
    killMode: null,
    needsSecrets: false,
    scope: "user",
    after: [],
    wants: [],
    partOf: null,
    wantedBy: null,
    stops: [],
    restartsOn: [],
    nice: null,
    port: null,
    namespace: null,
    ...over,
  }) satisfies ServiceDoc

describe("a service the cluster reaches states both a port and a namespace", () => {
  test("a service stating neither is not reached from the cluster at all", () => {
    expect(reachOf(doc({}))).toBeNull()
  })

  test("a service stating a namespace and no port is refused", () => {
    expect(() => reachOf(doc({ namespace: "one" }))).toThrow(ClusterReachRefused)
  })

  test("a service stating a port and no namespace is refused", () => {
    expect(() => reachOf(doc({ port: 8788 }))).toThrow(ClusterReachRefused)
  })

  test("a port that is no whole number is refused", () => {
    expect(() => reachOf(doc({ port: 87.5, namespace: "one" }))).toThrow(/no whole port/)
  })

  test("two services claiming one namespace are refused rather than one winning", () => {
    const both = [
      doc({ slug: "one", port: 1, namespace: "shared" }),
      doc({ slug: "two", port: 2, namespace: "shared" }),
    ]
    expect(() => planClusterReach(both, "10.0.0.1")).toThrow(/both state namespace/)
  })
})

describe("the workstation's address is read from its own route rather than written down", () => {
  test("the source address in a route is what the cluster is pointed at", () => {
    expect(addressIn("1.1.1.1 via 192.168.68.1 dev enp129s0 src 192.168.68.50 uid 1000")).toBe(
      "192.168.68.50"
    )
  })

  test("a route naming no source address is refused rather than guessed", () => {
    expect(() => addressIn("1.1.1.1 via 192.168.68.1 dev enp129s0")).toThrow(/no source address/)
  })
})

describe("what the cluster is given is composed from the document", () => {
  const yaml = manifestFor({ slug: "one", port: 8788, namespace: "one-ns" }, "10.0.0.1")

  test("a namespace, a service and an endpoint slice stand in one manifest", () => {
    expect(yaml.match(/^kind: .+$/gm)).toEqual([
      "kind: Namespace",
      "kind: Service",
      "kind: EndpointSlice",
    ])
  })

  test("the port the document states is the port the cluster is given, on both sides", () => {
    expect(yaml).toContain("port: 8788")
    expect(yaml).toContain("targetPort: 8788")
  })

  test("the service selects nothing, the endpoint slice naming the workstation instead", () => {
    expect(yaml).not.toContain("selector:")
    expect(yaml).toContain("      - 10.0.0.1")
  })

  test("everything written carries the mark of what wrote it", () => {
    expect(yaml.match(new RegExp(`managed-by: ${MANAGED_BY}`, "g"))).toHaveLength(2)
  })
})

describe("what stands here today", () => {
  test("every service document stating a reach composes a manifest", () => {
    const root = rootFor(resolveRoots(), AKASHA)
    const reached = reachedServices(root)
    expect(reached.length).toBeGreaterThan(0)
    expect(planClusterReach(readServiceDocs(root), "10.0.0.1").size).toBe(reached.length)
  })

  test("the graph service's own document says where it answers", () => {
    const reach = clusterReachOf(rootFor(resolveRoots(), AKASHA), "graph-service")
    expect(Number.isInteger(reach.port)).toBe(true)
    expect(reach.namespace).not.toBe("")
  })
})
