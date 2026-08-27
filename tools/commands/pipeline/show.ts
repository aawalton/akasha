
export const summary = "Show pipeline header fields plus per-status workflow summary"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  getPipelineBySeq,
  listStepsForPipeline,
  listWorkflowsForPipeline,
  optionalNumber,
  optionalString,
  type Row,
  summarizeWorkflows,
  type WorkflowStatusSummary,
} from "../../lib/pipeline-pages/read.ts"
import { type Roots } from "../../../page/page"
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
    { name: "--json", description: "Emit JSON instead of TSV" },
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
    "ops pipeline show 8200",
    "ops pipeline show --seq 8200",
    "ops pipeline show 8200 --json",
  ],
}

interface CapacityWaitRollup {
  readonly waiting: number
  readonly nodes: readonly string[]
}

function renderTsv(
  pipelineFields: Record<string, string | number | undefined>,
  summary: WorkflowStatusSummary,
  capacityWait: CapacityWaitRollup
): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(pipelineFields)) {
    if (value === undefined) continue
    lines.push(`${key}\t${value}`)
  }
  lines.push(`workflow.total\t${summary.total}`)
  for (const [status, count] of Object.entries(summary.byStatus)) {
    lines.push(`workflow.${status}\t${count}`)
  }
  if (capacityWait.waiting > 0) {
    lines.push(`capacityWait.waiting\t${capacityWait.waiting}`)
    if (capacityWait.nodes.length > 0) {
      lines.push(`capacityWait.nodes\t${capacityWait.nodes.join(",")}`)
    }
  }
  return lines.join("\n")
}

function capacityWaitRollup(roots: Roots, pipeline: Row): CapacityWaitRollup {
  const dispatching = listStepsForPipeline(roots, { pipeline, status: "dispatching" })
  const nodes = new Set<string>()
  let waiting = 0
  for (const step of dispatching) {
    if (optionalString(step, "dispatchWaitReason") === undefined) continue
    waiting += 1
    const node = optionalString(step, "dispatchWaitNode")
    if (node !== undefined) nodes.add(node)
  }
  return { waiting, nodes: [...nodes].sort() }
}

export default async function pipelineShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const json = parsed.boolean("--json")

  const roots = resolveRoots()
  const pipeline = getPipelineBySeq(roots, seq)
  const workflows = listWorkflowsForPipeline(roots, { pipelineSeq: seq })
  const summary = summarizeWorkflows(workflows)
  const capacityWait = capacityWaitRollup(roots, pipeline)

  const pipelineFields = {
    seq: optionalNumber(pipeline, "seq"),
    status: optionalString(pipeline, "status"),
    branch: optionalString(pipeline, "branch"),
    commitSha: optionalString(pipeline, "commit"),
    createdAt: optionalString(pipeline, "createdAt"),
    updatedAt: optionalString(pipeline, "updatedAt"),
    supersededBy: optionalNumber(pipeline, "overtakenBySeq"),
  }

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ pipeline: pipelineFields, workflows: summary, capacityWait })}\n`
    )
    return
  }
  process.stdout.write(`${renderTsv(pipelineFields, summary, capacityWait)}\n`)
}
