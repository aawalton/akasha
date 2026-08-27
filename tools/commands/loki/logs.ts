export const summary = "Fetch pod logs from Loki (JSONL; filter with jq)"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
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
import { commitSha40, inputsHash12 } from "../../lib/workflow-dsl/ci-identifiers.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "pod",
      required: false,
      aliasOfFlag: "--pod",
      description: "Pod name prefix to match (literal string; special chars auto-escaped)",
    },
  ],
  flags: [
    {
      name: "--pod",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "Pod name prefix to match (or pass as positional)",
    },
    {
      name: "--namespace",
      argLabel: "<ns>",
      valueShape: "token",
      default: "ci",
      description: "K8s namespace (literal string; special chars auto-escaped)",
    },
    {
      name: "--since",
      argLabel: "<duration>",
      valueShape: "token",
      default: "1h",
      description:
        "Wall-clock duration from now, UTC (e.g. 30m, 1h, 2d). Supported units: s, m, h, d.",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "500",
      aliases: ["--tail"],
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
        "Fetch the complete log WITHIN the --since window by auto-paginating until the end (each page capped at Loki's 5000-line limit). Still bounded by --since, never by line count — a clipped window is reported on stderr (and as complete / boundedBy under --json), so widen --since to reach further back. Use this — not --limit — to feed a full fan-out log to `ops tests triage-fanout`; a bounded --limit returns only a tail window, and --limit > 5000 errors. Ignores --limit / --cursor.",
    },
    {
      name: "--commit-sha",
      argLabel: "<sha40>",
      valueShape: "token",
      description:
        "Filter to step pods stamped with `pipeline-engine/commit-sha=<value>`. Value must be a full 40-char lowercase hex SHA — validated up-front.",
    },
    {
      name: "--inputs-hash",
      argLabel: "<hex12>",
      valueShape: "token",
      description:
        "Filter to step pods stamped with `pipeline-engine/inputs-hash=<value>`. Value must be a 12-char lowercase hex string — validated up-front.",
    },
    {
      name: "--json",
      description:
        'Emit {"lines": [...], "count": n, "cursor": <b64|null>, "isDone": bool, "complete": bool, "boundedBy": [...]} on stdout instead of JSONL',
    },
  ],
  envVars: [
    {
      name: "PIPELINE_SA_TOKEN",
      description:
        "K8s service-account bearer token used to authenticate to the API proxy. Required at runtime; enforced by the K8s admin client so the error surfaces alongside other operational failures.",
    },
    {
      name: "K8S_API_BASE",
      description:
        "K8s API server base URL (e.g. https://kubernetes.default.svc). Required at runtime; enforced by the K8s admin client.",
    },
    {
      name: "K8S_CA_CERT_B64",
      description: "Base64-encoded cluster CA certificate (optional; enables TLS verification)",
    },
  ],
  exits: [
    {
      code: 0,
      meaning:
        "Query ran. A pod prefix that matched nothing exits 0 with empty output — read the stderr warning, or `complete` / `boundedBy` under --json, for whether that absence is meaningful. A closed pipe (`| head`) also exits 0.",
    },
    { code: 1, meaning: "Input error: a flag carried a value this cannot use." },
    {
      code: 3,
      meaning:
        "Operational error: Loki refused the query, or answered in a shape this cannot read.",
    },
  ],
  examples: [
    "ops loki logs my-pod",
    "ops loki logs --pod my-pod",
    "ops loki logs my-pod --since 15m --limit 100",
    "ops loki logs my-pod --since 15m --tail 100",
    "ops loki logs my-pod --namespace default --json",
    "ops loki logs my-pod --json | jq '.cursor'",
    "ops loki logs check-unit-tests-pod --all | ops tests triage-fanout",
    "ops loki logs pe-42 --commit-sha 1234567890abcdef1234567890abcdef12345678",
    "ops loki logs pe-42 --inputs-hash 0123456789ab",
  ],
}

async function emitLogsDiagnostic(args: {
  pod: string
  namespace: string
  since: string
  lineCount: number
  isDone: boolean
  limit: number
  commitSha?: string
  inputsHash?: string
}): Promise<boolean | null> {
  const { pod, namespace, since, lineCount, isDone, limit, commitSha, inputsHash } = args
  const probe = isDone
    ? hasLinesBeforeWindow({ pod, namespace, since, commitSha, inputsHash })
    : Promise.resolve(null)
  const lookup =
    lineCount === 0
      ? findPodNamespaces({ pod, since }).then((all) => all.filter((ns) => ns !== namespace))
      : Promise.resolve<readonly string[]>([])
  const [olderLinesBeforeWindow, otherNamespaces] = await Promise.all([probe, lookup])
  const diagnostic = chooseLogsDiagnostic({
    command: "ops loki logs",
    pod,
    namespace,
    since,
    lineCount,
    isDone,
    limit,
    olderLinesBeforeWindow,
    retentionLabel: LOKI_RETENTION_LABEL,
    otherNamespaces,
  })
  if (diagnostic) process.stderr.write(`${diagnostic.message}\n`)
  return olderLinesBeforeWindow
}

export default async function lokiLogs(args: readonly string[]): Promise<void> {
  process.stdout.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EPIPE") process.exit(0)
    throw err
  })

  const parsed = parseArgs(help, args)
  const pod = parsed.requireString("--pod")
  const namespace = parsed.string("--namespace") ?? "ci"
  const since = parsed.string("--since") ?? "1h"

  parseLokiDuration("--since", since)
  const limit = parseLokiPositiveInt("--limit", parsed.string("--limit") ?? "500")
  const cursor = parsed.string("--cursor") ?? null
  const json = parsed.boolean("--json")
  const all = parsed.boolean("--all")

  const commitShaRaw = parsed.string("--commit-sha")
  const inputsHashRaw = parsed.string("--inputs-hash")
  let commitSha: string | undefined
  let inputsHash: string | undefined
  if (commitShaRaw !== undefined) {
    try {
      commitSha = commitSha40(commitShaRaw)
    } catch (err) {
      throw inputError(`--commit-sha: ${err instanceof Error ? err.message : String(err)}`)
    }
  }
  if (inputsHashRaw !== undefined) {
    try {
      inputsHash = inputsHash12(inputsHashRaw)
    } catch (err) {
      throw inputError(`--inputs-hash: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  if (all) {
    const lines = await fetchAllLokiLogs({ pod, namespace, since, commitSha, inputsHash })
    if (json) {
      const olderLinesBeforeWindow = await hasLinesBeforeWindow({
        pod,
        namespace,
        since,
        commitSha,
        inputsHash,
      })
      const bounds = describeBounds({ isDone: true, olderLinesBeforeWindow })
      process.stdout.write(
        `${JSON.stringify({ lines, count: lines.length, cursor: null, isDone: true, ...bounds })}\n`
      )
      return
    }
    for (const entry of lines) {
      process.stdout.write(`${JSON.stringify(entry)}\n`)
    }
    await emitLogsDiagnostic({
      pod,
      namespace,
      since,
      lineCount: lines.length,
      isDone: true,
      limit,
      commitSha,
      inputsHash,
    })
    return
  }

  const {
    lines,
    cursor: nextCursor,
    isDone,
  } = await fetchLokiLogs({
    pod,
    namespace,
    since,
    limit,
    cursor,
    commitSha,
    inputsHash,
  })

  if (json) {
    const olderLinesBeforeWindow = isDone
      ? await hasLinesBeforeWindow({ pod, namespace, since, commitSha, inputsHash })
      : null
    const bounds = describeBounds({ isDone, olderLinesBeforeWindow })
    process.stdout.write(
      `${JSON.stringify({ lines, count: lines.length, cursor: nextCursor, isDone, ...bounds })}\n`
    )
    return
  }

  for (const entry of lines) {
    process.stdout.write(`${JSON.stringify(entry)}\n`)
  }
  await emitLogsDiagnostic({
    pod,
    namespace,
    since,
    lineCount: lines.length,
    isDone,
    limit,
    commitSha,
    inputsHash,
  })
}
