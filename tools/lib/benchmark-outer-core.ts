import type { Candidate, NodeCapacity, Requests } from "@akasha/ci-containers/ci-dispatch-shapes"
import { asHostname, type Hostname } from "@akasha/k8s-types/hostnames"
import {
  aggregatePhases,
  computeStoreDelta,
  DECLARED_BENCHMARK_REDS,
  type DeclaredRed,
  type DockerSkipCensus,
  dockerSkipCensus,
  type PhaseDelta,
  type PhaseRollup,
  type RedStep,
  redSet,
  type SmokeVerdict,
  smokeVerdict,
  undeclaredReds,
} from "./benchmark-aggregate.ts"
import { type InnerReport, reportTypes, runCore, type StoreVariant } from "./benchmark-code.ts"
import type { MarginSweepRow, SweepArgs } from "./benchmark-margin-sweep.ts"

export const BASELINE_CAVEAT =
  "buildkit runs on node-06 as of #14492 (live on main): node-06 numbers include a resident buildkit; cross-node deltas are not buildkit-neutral."

export const TIMED_BOUNDARY_NOTE =
  "Timed: cold-stage (checkout + cold bun install into empty store), warm-prep (graph/config/synth producers), check (full registry). Untimed pre-stage (entrypoint): shallow clone, toolchain provision + verify, prelude bun install."

export interface OutOfCpuObserved {
  readonly node: string
  readonly windowStartMs: number
  readonly windowEndMs: number
  readonly count: number | null
  readonly unavailableReason: string | null
}

export interface VariantResult {
  readonly store: StoreVariant
  readonly inner: InnerReport
  readonly phases: readonly PhaseRollup[]
  readonly smoke: SmokeVerdict
  readonly census: DockerSkipCensus
  readonly redSet: readonly RedStep[]
}

export interface OuterReportMeta {
  readonly nodeUnderTest: string
  readonly targetSha: string
  readonly generatedAtMs: number
  readonly stepConcurrency: number
  readonly baselineCaveat: string
  readonly timedBoundaryNote: string
  readonly storeVariantsRun: readonly StoreVariant[]
  readonly unmeasuredVariants: readonly StoreVariant[]
}

export interface OuterReport {
  readonly meta: OuterReportMeta
  readonly variants: readonly VariantResult[]
  readonly storeDelta: readonly PhaseDelta[] | null
  readonly storeDeltaRefusedReason: string | null
  readonly outOfCpuObserved: OutOfCpuObserved
  readonly marginSweep: readonly MarginSweepRow[]
  readonly declaredReds: readonly DeclaredRed[]
  readonly undeclaredReds: readonly RedStep[]
}

export async function parseInnerReportFromLogs(logs: string): Promise<InnerReport> {
  const { BENCHMARK_REPORT_SENTINEL } = await runCore()
  const line = logs
    .split("\n")
    .reverse()
    .find((l) => l.includes(BENCHMARK_REPORT_SENTINEL))
  if (line === undefined) {
    throw new Error(
      `benchmark report marker "${BENCHMARK_REPORT_SENTINEL}" not found in pod logs (pod likely died before emitting a report)`
    )
  }
  const jsonStart = line.indexOf(BENCHMARK_REPORT_SENTINEL) + BENCHMARK_REPORT_SENTINEL.length
  const payload = line.slice(jsonStart).trim()
  const { InnerReportSchema } = await reportTypes()
  return InnerReportSchema.parse(JSON.parse(payload))
}

const SWEEP_NODE_CPU_MILLIS = 8_000
const SWEEP_NODE_MEMORY_BYTES = 16 * 1024 ** 3
const SWEEP_BURST_SIZE = 24
const SWEEP_POD_CPU_MILLIS = 1_000
const SWEEP_POD_MEMORY_BYTES = 2 * 1024 ** 3
const SWEEP_COMMIT = "0".repeat(40)
const SWEEP_INSTRUCTIONS_COMMIT = "1".repeat(40)

export const SWEEP_MARGINS_MILLIS: readonly number[] = [0, 250, 500, 1_000, 2_000, 4_000]
export const SWEEP_STICKY_OPTIONS: readonly boolean[] = [false, true]

export function buildMarginSweepGrid(nodeUnderTest: string): SweepArgs {
  const assignedNode = asHostname(nodeUnderTest)
  if (assignedNode === undefined) {
    throw new Error(`buildMarginSweepGrid: "${nodeUnderTest}" is not a known node hostname`)
  }
  const sweepNodeNames: readonly Hostname[] = [
    "node-02",
    "node-03",
    "node-04",
    "node-05",
    "node-06",
  ]
  const nodes: readonly NodeCapacity[] = sweepNodeNames.map((nodeName) => ({
    nodeName,
    cpuMillisAvailable: SWEEP_NODE_CPU_MILLIS,
    memoryBytesAvailable: SWEEP_NODE_MEMORY_BYTES,
    cpuMillisCapacity: SWEEP_NODE_CPU_MILLIS,
    memoryBytesCapacity: SWEEP_NODE_MEMORY_BYTES,
  }))
  const requests: Requests = {
    cpuMillis: SWEEP_POD_CPU_MILLIS,
    memoryBytes: SWEEP_POD_MEMORY_BYTES,
  }
  const candidates: readonly Candidate[] = Array.from(
    { length: SWEEP_BURST_SIZE },
    (_unused, i): Candidate => ({
      stepSeq: String(i),
      stepName: `sweep-step-${i}`,
      dependsOn: [],
      workflowSeq: String(i),
      workflowSlug: "sweep",
      workflowKind: "sweep",
      workflowStatus: "running",
      pipelineSeq: String(i),
      pipelineStatus: "running",
      pipelineBranch: "benchmark-sweep",
      pipelineCommit: SWEEP_COMMIT,
      pipelineInstructionsCommit: SWEEP_INSTRUCTIONS_COMMIT,
      inputsHash: null,
      assignedNode,
      definition: {},
      requests,
      pipelineMaxRequests: requests,
      dispatchWaitSince: null,
      neverFitSince: null,
    })
  )
  return {
    candidates,
    nodes,
    margins: SWEEP_MARGINS_MILLIS,
    stickyOptions: SWEEP_STICKY_OPTIONS,
  }
}

export interface AssembleOuterReportArgs {
  readonly nodeUnderTest: string
  readonly targetSha: string
  readonly generatedAtMs: number
  readonly inners: ReadonlyMap<StoreVariant, InnerReport>
  readonly unmeasuredVariants: readonly StoreVariant[]
  readonly outOfCpuObserved: OutOfCpuObserved
  readonly marginSweep: readonly MarginSweepRow[]
}

function variantResult(store: StoreVariant, inner: InnerReport): VariantResult {
  return {
    store,
    inner,
    phases: aggregatePhases(inner.steps),
    smoke: smokeVerdict(inner.steps),
    census: dockerSkipCensus(inner.steps),
    redSet: redSet(inner.steps),
  }
}

export async function assembleOuterReport(args: AssembleOuterReportArgs): Promise<OuterReport> {
  const { BENCHMARK_STEP_CONCURRENCY } = await runCore()
  const storeVariantsRun = [...args.inners.keys()]
  const variants = storeVariantsRun.map((store) => {
    const inner = args.inners.get(store)
    if (inner === undefined) throw new Error(`missing inner report for store variant ${store}`)
    return variantResult(store, inner)
  })

  const disk = args.inners.get("disk")
  const memory = args.inners.get("memory")
  const delta =
    disk !== undefined && memory !== undefined ? computeStoreDelta(disk.steps, memory.steps) : null

  const storeDelta = delta?.kind === "delta" ? delta.phases : null
  const storeDeltaRefusedReason = delta?.kind === "refused" ? delta.reason : null

  const undeclaredUnion: RedStep[] = []
  for (const v of variants) {
    for (const r of undeclaredReds(v.redSet, DECLARED_BENCHMARK_REDS)) {
      if (!undeclaredUnion.some((u) => u.name === r.name && u.exitCode === r.exitCode)) {
        undeclaredUnion.push(r)
      }
    }
  }

  return {
    meta: {
      nodeUnderTest: args.nodeUnderTest,
      targetSha: args.targetSha,
      generatedAtMs: args.generatedAtMs,
      stepConcurrency: BENCHMARK_STEP_CONCURRENCY,
      baselineCaveat: BASELINE_CAVEAT,
      timedBoundaryNote: TIMED_BOUNDARY_NOTE,
      storeVariantsRun,
      unmeasuredVariants: args.unmeasuredVariants,
    },
    variants,
    storeDelta,
    storeDeltaRefusedReason,
    outOfCpuObserved: args.outOfCpuObserved,
    marginSweep: args.marginSweep,
    declaredReds: DECLARED_BENCHMARK_REDS,
    undeclaredReds: undeclaredUnion,
  }
}
