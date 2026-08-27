import { describe, expect, it } from "bun:test"

import { countWouldBeOutOfCpu, sweepMargins } from "../lib/benchmark-margin-sweep.ts"
import type {
  Admission,
  Candidate,
  NodeCapacity,
  Requests,
} from "../lib/ci-container-dispatcher/types.ts"
import { asHostname } from "@infra/k8s-types/hostnames"

function hn(value: string) {
  const h = asHostname(value)
  if (h === undefined) throw new Error(`test fixture used unknown hostname ${value}`)
  return h
}

function first<T>(xs: readonly T[]): T {
  const x = xs.at(0)
  if (x === undefined) throw new Error("expected at least one row")
  return x
}

function admission(over: {
  node: string
  pinned: boolean
  cpuMillis: number
  memoryBytes?: number
  stepId?: string
}): Admission {
  const requests: Requests = { cpuMillis: over.cpuMillis, memoryBytes: over.memoryBytes ?? 0 }
  const candidate: Candidate = {
    stepSeq: "1",
    stepName: over.stepId ?? "s",
    dependsOn: [],
    workflowSeq: "1",
    workflowSlug: "w",
    workflowKind: "w",
    workflowStatus: "running",
    pipelineSeq: "1",
    pipelineStatus: "running",
    pipelineBranch: "feature/x",
    pipelineCommit: "0".repeat(40),
    pipelineInstructionsCommit: "1".repeat(40),
    inputsHash: null,
    assignedNode: null,
    definition: {},
    requests,
    pipelineMaxRequests: requests,
    dispatchWaitSince: null,
    neverFitSince: null,
  }
  return {
    candidate,
    node: hn(over.node),
    pinned: over.pinned,
    confined: false,
    newAssignment: false,
  }
}

describe("countWouldBeOutOfCpu", () => {
  it("counts a pinned pod that does not fit real capacity; fitting pods consume", () => {
    const real: readonly NodeCapacity[] = [
      {
        nodeName: hn("node-06"),
        cpuMillisAvailable: 5000,
        memoryBytesAvailable: 0,
        cpuMillisCapacity: 5000,
        memoryBytesCapacity: 0,
      },
    ]
    const admissions: readonly Admission[] = [
      admission({ node: "node-06", pinned: true, cpuMillis: 4000, stepId: "a" }),
      admission({ node: "node-06", pinned: true, cpuMillis: 4000, stepId: "b" }),
    ]
    expect(countWouldBeOutOfCpu(admissions, real)).toBe(1)
  })

  it("never counts unpinned admissions (scheduler owns their placement)", () => {
    const real: readonly NodeCapacity[] = [
      {
        nodeName: hn("node-06"),
        cpuMillisAvailable: 1000,
        memoryBytesAvailable: 0,
        cpuMillisCapacity: 1000,
        memoryBytesCapacity: 0,
      },
    ]
    const admissions: readonly Admission[] = [
      admission({ node: "node-06", pinned: false, cpuMillis: 9000, stepId: "u" }),
    ]
    expect(countWouldBeOutOfCpu(admissions, real)).toBe(0)
  })

  it("counts memory overcommit on a pinned pod too", () => {
    const real: readonly NodeCapacity[] = [
      {
        nodeName: hn("node-06"),
        cpuMillisAvailable: 100000,
        memoryBytesAvailable: 1_000,
        cpuMillisCapacity: 100000,
        memoryBytesCapacity: 1_000,
      },
    ]
    const admissions: readonly Admission[] = [
      admission({ node: "node-06", pinned: true, cpuMillis: 1, memoryBytes: 5_000, stepId: "m" }),
    ]
    expect(countWouldBeOutOfCpu(admissions, real)).toBe(1)
  })
})

describe("sweepMargins", () => {
  function candidate(over: {
    stepId: string
    seq: number
    cpuMillis: number
  }): Candidate {
    const requests: Requests = { cpuMillis: over.cpuMillis, memoryBytes: 0 }
    return {
      stepSeq: String(over.seq),
      stepName: over.stepId,
      dependsOn: [],
      workflowSeq: String(over.seq),
      workflowSlug: "w",
      workflowKind: "w",
      workflowStatus: "running",
      pipelineSeq: String(over.seq),
      pipelineStatus: "running",
      pipelineBranch: "feature/x",
      pipelineCommit: "0".repeat(40),
      pipelineInstructionsCommit: "1".repeat(40),
      inputsHash: null,
      assignedNode: null,
      definition: {},
      requests,
      pipelineMaxRequests: requests,
      dispatchWaitSince: null,
      neverFitSince: null,
    }
  }

  const candidates: readonly Candidate[] = [
    candidate({ stepId: "a", seq: 1, cpuMillis: 4000 }),
    candidate({ stepId: "b", seq: 2, cpuMillis: 4000 }),
  ]
  const nodes: readonly NodeCapacity[] = [
    {
      nodeName: hn("node-06"),
      cpuMillisAvailable: 8000,
      memoryBytesAvailable: 0,
      cpuMillisCapacity: 8000,
      memoryBytesCapacity: 0,
    },
  ]

  it("produces one row per (stickyPinning × margin) combination", () => {
    const rows = sweepMargins({
      candidates,
      nodes,
      margins: [0, 5000],
      stickyOptions: [false, true],
    })
    expect(rows).toHaveLength(4)
    expect(new Set(rows.map((r) => `${String(r.stickyPinning)}:${r.marginMillis}`)).size).toBe(4)
  })

  it("admits both candidates at margin 0 (snapshot has room for both)", () => {
    const row = first(sweepMargins({ candidates, nodes, margins: [0], stickyOptions: [true] }))
    expect(row).toMatchObject({ admitted: 2, headOfLineHalts: 0 })
  })

  it("surfaces would-be-OutOfcpu when sticky pins beyond real (snapshot − margin) capacity", () => {
    const sticky = first(
      sweepMargins({ candidates, nodes, margins: [5000], stickyOptions: [true] })
    )
    expect(sticky.wouldBeOutOfCpu).toBeGreaterThan(0)

    const loose = first(
      sweepMargins({ candidates, nodes, margins: [5000], stickyOptions: [false] })
    )
    expect(loose.wouldBeOutOfCpu).toBe(0)
  })
})
