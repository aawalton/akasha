export const summary = "List workflows for a pipeline with status and step-failure counts"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  getPipelineBySeq,
  listWorkflowsForPipeline,
  optionalString,
} from "../../lib/pipeline-pages/read.ts"
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
      name: "--status",
      argLabel: "<s>",
      valueShape: "token",
      description: "Filter to one workflow status",
    },
    { name: "--json", description: "Emit JSON array instead of TSV" },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description: "Pipeline sequence number",
    },
  ],
  exits: [
    { code: 2, meaning: "pipeline not found" },
    { code: 3, meaning: "the pipeline pages could not be read" },
  ],
  examples: [
    "ops pipeline workflows 8200",
    "ops pipeline workflows --seq 8200",
    "ops pipeline workflows --seq 8200 --status failed",
    "ops pipeline workflows --seq 8200 --json",
  ],
}

const UNAVAILABLE = "unavailable"

interface WorkflowProjection {
  readonly name: string | undefined
  readonly kind: string | undefined
  readonly status: string | undefined
  readonly failedSteps: readonly string[] | null
  readonly blockedSteps: readonly string[] | null
  readonly createdAt: string | undefined
  readonly updatedAt: string | undefined
  readonly skipReason: string | undefined
  readonly failedDependency: string | undefined
}

function sanitizeCell(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

function stepNames(value: unknown): readonly string[] | null {
  if (!Array.isArray(value)) return null
  return value.filter((v): v is string => typeof v === "string")
}

function formatStepNamesCell(names: readonly string[] | null): string {
  if (names === null) return UNAVAILABLE
  return names.map(sanitizeCell).join(",")
}

function formatReason(w: WorkflowProjection): string {
  const reason = w.skipReason ?? w.failedDependency
  return reason === undefined ? "" : sanitizeCell(reason)
}

function formatWorkflowRow(w: WorkflowProjection): string {
  return [
    w.name ?? "",
    w.kind ?? "",
    w.status ?? "",
    formatStepNamesCell(w.failedSteps),
    formatStepNamesCell(w.blockedSteps),
    formatReason(w),
  ].join("\t")
}

export default async function pipelineWorkflows(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const status = parsed.string("--status")
  const json = parsed.boolean("--json")

  const roots = resolveRoots()
  getPipelineBySeq(roots, seq)
  const workflows = listWorkflowsForPipeline(roots, { pipelineSeq: seq, status })

  const projected: WorkflowProjection[] = workflows.map((row) => ({
    name: optionalString(row, "slug"),
    kind: optionalString(row, "kind"),
    status: optionalString(row, "status"),
    failedSteps: stepNames(row.failedSteps),
    blockedSteps: stepNames(row.blockedSteps),
    createdAt: optionalString(row, "createdAt"),
    updatedAt: optionalString(row, "updatedAt"),
    skipReason: optionalString(row, "skipReason"),
    failedDependency: optionalString(row, "failedDependency"),
  }))

  if (json) {
    process.stdout.write(`${JSON.stringify(projected)}\n`)
    return
  }

  if (projected.length === 0) return
  const lines = projected.map(formatWorkflowRow)
  process.stdout.write(`${lines.join("\n")}\n`)
}
