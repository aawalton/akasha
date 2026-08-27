
export const summary = "Fetch pod logs for one step of a pipeline (via Loki)"

import type { CommandHelp } from "../../ops/surface.ts"
import { chooseLogsDiagnostic, describeBounds } from "../../lib/loki-diagnostics.ts"
import {
  fetchAllLokiLogs,
  fetchLokiLogs,
  findPodNamespaces,
  hasLinesBeforeWindow,
  LOKI_RETENTION_LABEL,
  parseLokiDuration,
  parseLokiPositiveInt,
} from "../../lib/loki-fetch.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { getPipelineBySeq, resolveStepPodName } from "../../lib/pipeline-pages/read.ts"
import { resolveRoots } from "../../../repo/roots/roots"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "Pipeline sequence number",
    },
    {
      name: "--workflow",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "Workflow name within the pipeline",
    },
    {
      name: "--step",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "Step name within the workflow",
    },
    {
      name: "--namespace",
      argLabel: "<ns>",
      valueShape: "token",
      default: "ci",
      description: "K8s namespace the pod runs in (literal string; special chars auto-escaped)",
    },
    {
      name: "--since",
      argLabel: "<duration>",
      valueShape: "token",
      default: "1h",
      description: "Wall-clock duration from now (e.g. 30m, 1h, 2d). Supported units: s, m, h, d.",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "500",
      description: "Max lines to return (positive integer)",
    },
    {
      name: "--cursor",
      argLabel: "<b64>",
      valueShape: "token",
      description: "Opaque cursor from a previous --json response",
    },
    {
      name: "--all",
      description:
        "Fetch the complete step log WITHIN the --since window by auto-paginating until the end of that window (each page capped at Loki's 5000-line limit). Use this — not --limit — to feed a full fan-out log to `ops tests triage-fanout`; a bounded --limit returns only a tail window, and --limit > 5000 errors. Ignores --limit / --cursor. --all removes the --limit bound, NOT the --since one: lines older than the window are still excluded, and a stderr warning says so when that happens.",
    },
    { name: "--json", description: "Emit paginated JSON object instead of JSONL" },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description: "Pipeline sequence number",
    },
  ],
  envVars: [
    {
      name: "PIPELINE_SA_TOKEN",
      description: "K8s service-account bearer token for the API proxy.",
    },
    { name: "K8S_API_BASE", description: "K8s API server base URL." },
    {
      name: "K8S_CA_CERT_B64",
      description: "Base64-encoded cluster CA certificate (optional; enables TLS verification)",
    },
  ],
  exits: [
    { code: 2, meaning: "pipeline / workflow / step not found, or step has no podName yet" },
    { code: 3, meaning: "Loki or Supabase query failed (transient/operational)" },
  ],
  examples: [
    "ops pipeline logs 8200 --workflow checks --step typecheck",
    "ops pipeline logs --seq 8200 --workflow checks --step typecheck",
    "ops pipeline logs --seq 8200 --workflow checks --step typecheck --since 15m --limit 100",
    "ops pipeline logs --seq 8200 --workflow checks --step check-unit-tests --all | ops tests triage-fanout",
    "ops pipeline logs --seq 8200 --workflow checks --step typecheck --json | jq '.cursor'",
  ],
}

async function probeOlderLines(args: {
  pod: string
  namespace: string
  since: string
  isDone: boolean
}): Promise<boolean | null> {
  if (!args.isDone) return null
  return hasLinesBeforeWindow({ pod: args.pod, namespace: args.namespace, since: args.since })
}

async function emitLogsDiagnostic(args: {
  pod: string
  namespace: string
  since: string
  lineCount: number
  isDone: boolean
  limit: number
}): Promise<void> {
  const { pod, namespace, since } = args
  const [olderLinesBeforeWindow, otherNamespaces] = await Promise.all([
    probeOlderLines({ pod, namespace, since, isDone: args.isDone }),
    args.lineCount === 0
      ? findPodNamespaces({ pod, since }).then((found) => found.filter((ns) => ns !== namespace))
      : Promise.resolve<readonly string[]>([]),
  ])
  const diagnostic = chooseLogsDiagnostic({
    ...args,
    command: "ops pipeline logs",
    retentionLabel: LOKI_RETENTION_LABEL,
    olderLinesBeforeWindow,
    otherNamespaces,
  })
  if (diagnostic) process.stderr.write(`${diagnostic.message}\n`)
}

export default async function pipelineLogs(args: readonly string[]): Promise<void> {
  process.stdout.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EPIPE") process.exit(0)
    throw err
  })

  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const workflowName = parsed.requireString("--workflow")
  const stepName = parsed.requireString("--step")
  const namespace = parsed.string("--namespace") ?? "ci"
  const since = parsed.string("--since") ?? "1h"
  parseLokiDuration("--since", since)
  const limit = parseLokiPositiveInt("--limit", parsed.string("--limit") ?? "500")
  const cursor = parsed.string("--cursor") ?? null
  const json = parsed.boolean("--json")
  const all = parsed.boolean("--all")

  const roots = resolveRoots()
  const pipeline = getPipelineBySeq(roots, seq)
  const podName = resolveStepPodName(roots, pipeline, workflowName, stepName)

  if (all) {
    const lines = await fetchAllLokiLogs({ pod: podName, namespace, since })
    if (json) {
      const olderLinesBeforeWindow = await probeOlderLines({
        pod: podName,
        namespace,
        since,
        isDone: true,
      })
      const { complete, boundedBy } = describeBounds({
        isDone: true,
        olderLinesBeforeWindow,
      })
      process.stdout.write(
        `${JSON.stringify({
          lines,
          count: lines.length,
          cursor: null,
          isDone: true,
          complete,
          boundedBy,
        })}\n`
      )
      return
    }
    for (const entry of lines) {
      process.stdout.write(`${JSON.stringify(entry)}\n`)
    }
    await emitLogsDiagnostic({
      pod: podName,
      namespace,
      since,
      lineCount: lines.length,
      isDone: true,
      limit,
    })
    return
  }

  const {
    lines,
    cursor: nextCursor,
    isDone,
  } = await fetchLokiLogs({
    pod: podName,
    namespace,
    since,
    limit,
    cursor,
  })

  if (json) {
    const olderLinesBeforeWindow = await probeOlderLines({
      pod: podName,
      namespace,
      since,
      isDone,
    })
    const { complete, boundedBy } = describeBounds({ isDone, olderLinesBeforeWindow })
    process.stdout.write(
      `${JSON.stringify({
        lines,
        count: lines.length,
        cursor: nextCursor,
        isDone,
        complete,
        boundedBy,
      })}\n`
    )
    return
  }

  for (const entry of lines) {
    process.stdout.write(`${JSON.stringify(entry)}\n`)
  }
  await emitLogsDiagnostic({
    pod: podName,
    namespace,
    since,
    lineCount: lines.length,
    isDone,
    limit,
  })
}
