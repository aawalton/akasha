
export const summary = "List recent pipelines, optionally filtered by branch or status"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { listPipelines, optionalNumber, optionalString } from "../../lib/pipeline-pages/read.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import { commitSha40, toShortSha7 } from "../../lib/workflow-dsl/ci-identifiers.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--branch",
      argLabel: "<name>",
      valueShape: "token",
      description: "Filter to one branch",
    },
    {
      name: "--status",
      argLabel: "<s>",
      valueShape: "token",
      description: "Filter to one pipeline status",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "20",
      description: "Max pipelines to return (positive integer, default 20)",
    },
    { name: "--json", description: "Emit JSON array instead of TSV" },
  ],
  exits: [{ code: 3, meaning: "the pipeline pages could not be read" }],
  examples: [
    "ops pipeline list",
    "ops pipeline list --branch main --limit 5",
    "ops pipeline list --status failed --json",
  ],
}

function shortSha(sha: string | undefined): string {
  if (sha === undefined) return ""
  try {
    return toShortSha7(commitSha40(sha))
  } catch {
    return ""
  }
}

function formatAge(isoTimestamp: string | undefined): string {
  if (isoTimestamp == null) return ""
  const then = Date.parse(isoTimestamp)
  if (!Number.isFinite(then)) return ""
  const deltaMs = Date.now() - then
  if (deltaMs < 0) return "0s"
  const seconds = Math.floor(deltaMs / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

export default async function pipelineList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const branch = parsed.string("--branch")
  const status = parsed.string("--status")
  const limitRaw = parsed.string("--limit") ?? "20"
  const limit = Number(limitRaw)
  if (!Number.isFinite(limit) || !Number.isInteger(limit) || limit <= 0) {
    throw inputError(`--limit must be a positive integer, got: ${limitRaw}`)
  }
  const json = parsed.boolean("--json")

  const rows = listPipelines(resolveRoots(), { branch, status, limit })

  const projected = rows.map((row) => {
    const commitSha = optionalString(row, "commit")
    return {
      seq: optionalNumber(row, "seq"),
      status: optionalString(row, "status"),
      branch: optionalString(row, "branch"),
      commitSha,
      shortSha: shortSha(commitSha),
      createdAt: optionalString(row, "createdAt"),
      updatedAt: optionalString(row, "updatedAt"),
      supersededBy: optionalNumber(row, "overtakenBySeq"),
    }
  })

  if (json) {
    process.stdout.write(`${JSON.stringify(projected)}\n`)
    return
  }

  if (projected.length === 0) return
  const lines = projected.map((p) => {
    const age = formatAge(p.createdAt)
    return `${p.seq ?? ""}\t${p.status ?? ""}\t${p.branch ?? ""}\t${p.shortSha}\t${age}\t${p.supersededBy ?? ""}`
  })
  process.stdout.write(`${lines.join("\n")}\n`)
}
