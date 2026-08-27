export const summary = "Run the per-node CI benchmark (node-pinned one-off Job over the real check registry on a cold store): captures per-phase timings + smoke verdict, the memory-vs-disk store delta, and the OutOfcpu-burst rate (observed events + synthetic margin sweep)"

import type { CommandHelp } from "../../ops/surface.ts"
import {
  type InnerReport,
  reportTypes,
  type StoreVariant,
} from "../../lib/benchmark-code.ts"
import { buildBenchmarkJob } from "../../lib/benchmark-job.ts"
import { sweepMargins } from "../../lib/benchmark-margin-sweep.ts"
import { assembleOuterReport, buildMarginSweepGrid, parseInnerReportFromLogs } from "../../lib/benchmark-outer-core.ts"
import { renderReport } from "../../lib/benchmark-outer-render"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  countOutOfCpuEvents,
  createJob,
  readJobPodLogs,
  waitForJob,
} from "../../lib/pipeline-run/k8s-jobs.ts"
import { asHostname, type Hostname } from "@infra/k8s-types/hostnames"

const NAMESPACE = "ci"
const DEFAULT_NODE = "node-06"
const DEFAULT_TIMEOUT_MIN = 45

export const help: CommandHelp = {
  flags: [
    {
      name: "--node",
      argLabel: "<name>",
      valueShape: "token",
      description: "Node to pin the Job to (default node-06)",
    },
    {
      name: "--store",
      argLabel: "<disk|memory>",
      valueShape: "token",
      description: "Restrict to one store variant (default: run both)",
    },
    {
      name: "--sha",
      argLabel: "<sha>",
      valueShape: "token",
      description: "Target commit (default: origin/main HEAD)",
    },
    {
      name: "--timeout-min",
      argLabel: "<n>",
      valueShape: "token",
      description: "Per-variant Job timeout in minutes (default 45)",
    },
    { name: "--json", description: "Emit the merged report as JSON instead of text" },
  ],
  envVars: [
    { name: "PIPELINE_SA_TOKEN", description: "K8s API bearer token (Job create/read + events)" },
    { name: "K8S_API_BASE", description: "K8s API base URL" },
    { name: "K8S_CA_CERT_B64", description: "Base64 cluster CA cert" },
  ],
  exits: [
    { code: 2, meaning: "a requested variant produced no report (a real measurement gap)" },
    { code: 3, meaning: "could not resolve the target SHA" },
    {
      code: 4,
      meaning: "an undeclared red (beyond the declared env-red set) invalidated the run",
    },
  ],
  examples: [
    "ops pipeline benchmark",
    "ops pipeline benchmark --node node-03 --store disk",
    "ops pipeline benchmark --sha 8eef0757b1 --json",
  ],
}

interface OutOfCpuObserved {
  readonly node: Hostname
  readonly windowStartMs: number
  readonly windowEndMs: number
  readonly count: number | null
  readonly unavailableReason: string | null
}

function resolveDefaultSha(): string {
  const proc = Bun.spawnSync(["git", "rev-parse", "origin/main"])
  const out = proc.stdout.toString().trim()
  if (proc.exitCode !== 0 || out === "") {
    process.stderr.write("benchmark: could not resolve origin/main HEAD (pass --sha)\n")
    process.exit(3)
  }
  return out
}



async function runVariant(args: {
  readonly node: Hostname
  readonly store: StoreVariant
  readonly targetSha: string
  readonly timeoutMs: number
}): Promise<InnerReport | null> {
  const runId = `${Date.now().toString(36)}-${args.store}`
  const manifest = await buildBenchmarkJob({
    node: args.node,
    store: args.store,
    targetSha: args.targetSha,
    runId,
  })
  const { name } = await createJob(NAMESPACE, manifest)
  process.stderr.write(`benchmark: created Job ${name} (node=${args.node} store=${args.store})\n`)

  const outcome = await waitForJob(NAMESPACE, name, { timeoutMs: args.timeoutMs })
  const logs = await readJobPodLogs(NAMESPACE, name)
  try {
    const report = await parseInnerReportFromLogs(logs)
    process.stderr.write(
      `benchmark: variant ${args.store} measured (Job ${outcome.outcome}; smoke verdict is a report field, not a run gate)\n`
    )
    return report
  } catch {
    process.stderr.write(`${logs.slice(-4000)}\n`)
    process.stderr.write(
      `benchmark: variant ${args.store} UNMEASURED — Job ${outcome.outcome}, no report emitted\n`
    )
    return null
  }
}

export default async function pipelineBenchmark(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const nodeArg = parsed.string("--node") ?? DEFAULT_NODE
  const node = asHostname(nodeArg)
  if (node === undefined) {
    process.stderr.write(`benchmark: --node ${nodeArg} is not a cluster node\n`)
    process.exit(3)
  }
  const targetSha = parsed.string("--sha") ?? resolveDefaultSha()
  const timeoutMs = (parsed.nonNegativeInt("--timeout-min") ?? DEFAULT_TIMEOUT_MIN) * 60_000
  const json = parsed.boolean("--json")

  const { StoreVariantSchema } = await reportTypes()
  const storeArg = parsed.string("--store")
  const variants: readonly StoreVariant[] =
    storeArg != null ? [StoreVariantSchema.parse(storeArg)] : ["disk", "memory"]

  const windowStartMs = Date.now()

  const inners = new Map<StoreVariant, InnerReport>()
  const unmeasuredVariants: StoreVariant[] = []
  for (const store of variants) {
    const report = await runVariant({ node, store, targetSha, timeoutMs })
    if (report === null) unmeasuredVariants.push(store)
    else inners.set(store, report)
  }

  const outOfCpuObserved: OutOfCpuObserved = await countOutOfCpuEvents(node, windowStartMs)
    .then(
      (count): OutOfCpuObserved => ({
        node,
        windowStartMs,
        windowEndMs: Date.now(),
        count,
        unavailableReason: null,
      })
    )
    .catch((err: unknown): OutOfCpuObserved => {
      const reason = err instanceof Error ? err.message : String(err)
      process.stderr.write(`benchmark: family d-observed unavailable — ${reason}\n`)
      return {
        node,
        windowStartMs,
        windowEndMs: Date.now(),
        count: null,
        unavailableReason: `OutOfcpu event sampling failed: ${reason}`,
      }
    })

  const marginSweep = sweepMargins(buildMarginSweepGrid(node))

  const report = await assembleOuterReport({
    nodeUnderTest: node,
    targetSha,
    generatedAtMs: Date.now(),
    inners,
    unmeasuredVariants,
    outOfCpuObserved,
    marginSweep,
  })

  process.stdout.write(json ? `${JSON.stringify(report)}\n` : `${renderReport(report)}\n`)

  if (unmeasuredVariants.length > 0) {
    process.stderr.write(
      `benchmark: ${unmeasuredVariants.length} variant(s) unmeasured: ${unmeasuredVariants.join(", ")}\n`
    )
    process.exit(2)
  }
  if (report.undeclaredReds.length > 0) {
    process.stderr.write(
      `benchmark: INVALID — undeclared red(s) beyond the declared env-red set; run invalid pending investigation\n`
    )
    process.exit(4)
  }
}
