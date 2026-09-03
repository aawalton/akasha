import { selectNext } from "@akasha/ci-containers/ci-dispatch-placement"
import type { Admission, Candidate, NodeCapacity } from "@akasha/ci-containers/ci-dispatch-shapes"

export interface MarginSweepRow {
  readonly stickyPinning: boolean
  readonly marginMillis: number
  readonly admitted: number
  readonly pinned: number
  readonly unpinned: number
  readonly headOfLineHalts: number
  readonly wouldBeOutOfCpu: number
}

export interface SweepArgs {
  readonly candidates: readonly Candidate[]
  readonly nodes: readonly NodeCapacity[]
  readonly margins: readonly number[]
  readonly stickyOptions: readonly boolean[]
}

export function countWouldBeOutOfCpu(
  admissions: readonly Admission[],
  realNodes: readonly NodeCapacity[]
): number {
  const remaining = new Map<NodeCapacity["nodeName"], { cpu: number; mem: number }>()
  for (const n of realNodes) {
    remaining.set(n.nodeName, { cpu: n.cpuMillisAvailable, mem: n.memoryBytesAvailable })
  }

  let count = 0
  for (const a of admissions) {
    if (!a.pinned) continue
    const r = remaining.get(a.node)
    if (r === undefined) continue
    const req = a.candidate.requests
    if (r.cpu < req.cpuMillis || r.mem < req.memoryBytes) {
      count += 1
      continue
    }
    r.cpu -= req.cpuMillis
    r.mem -= req.memoryBytes
  }
  return count
}

export function sweepMargins(args: SweepArgs): readonly MarginSweepRow[] {
  const { candidates, nodes, margins, stickyOptions } = args
  const rows: MarginSweepRow[] = []

  for (const stickyPinning of stickyOptions) {
    const decision = selectNext(candidates, nodes, { stickyPinning, now: 0 })
    const admissions = decision.toCreate
    const pinned = admissions.filter((a) => a.pinned).length
    const admitted = admissions.length
    const headOfLineHalts = decision.toHeldNoCapacity.length

    for (const marginMillis of margins) {
      const realNodes: readonly NodeCapacity[] = nodes.map((n) => ({
        nodeName: n.nodeName,
        cpuMillisAvailable: Math.max(0, n.cpuMillisAvailable - marginMillis),
        memoryBytesAvailable: n.memoryBytesAvailable,
        cpuMillisCapacity: n.cpuMillisCapacity,
        memoryBytesCapacity: n.memoryBytesCapacity,
      }))
      rows.push({
        stickyPinning,
        marginMillis,
        admitted,
        pinned,
        unpinned: admitted - pinned,
        headOfLineHalts,
        wouldBeOutOfCpu: countWouldBeOutOfCpu(admissions, realNodes),
      })
    }
  }
  return rows
}
