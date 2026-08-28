export const summary =
  "Re-dispatch only the failed (+ dependent-blocked) workflows of an existing pipeline in place at the same commit — the infra-failure cure that makes no new pipeline"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { decideRetry, type Reading } from "../../lib/pipeline-retry/decide.ts"
import { runRetry } from "../../lib/pipeline-retry/run.ts"
import { kinOf, readSnapshot } from "../../lib/sweep-pipeline-pages/pages.ts"
import { whereFor } from "../../lib/page-write-where.ts"
import { type Roots } from "../../../page/page.ts"
import { AKASHA, resolveRoots, rootFor } from "../../../repo/roots/roots.ts"
import { servedTip } from "../../lib/served-tip.ts"
import { STEP } from "../../lib/sweep-pipeline-pages/statuses.ts"
import { readUncommitted } from "../../../page/uncommitted/uncommitted.ts"

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
      description:
        "Retry only this workflow (must be failed) plus its transitive blocked dependents; omit to retry every failed or blocked workflow",
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
    { code: 1, meaning: "bad arguments" },
    {
      code: 2,
      meaning: "pipeline not found, not retriable, or moved off failed while the retry was planned",
    },
  ],
  examples: [
    "ops pipeline retry 18",
    "ops pipeline retry --seq 18",
    "ops pipeline retry --seq 18 --workflow alanwalton-web",
    "ops pipeline retry 18 --json",
  ],
}

type Result =
  | {
      readonly outcome: "retried"
      readonly seq: string
      readonly workflows: readonly string[]
      readonly workflowsReset: number
      readonly stepsReset: number
    }
  | { readonly outcome: "refused" | "raced"; readonly reason: string }

function report(result: Result, json: boolean): void {
  if (json) {
    process.stdout.write(`${JSON.stringify(result)}\n`)
    return
  }
  if (result.outcome === "retried") {
    process.stdout.write(
      [
        "outcome\tretried",
        `seq\t${result.seq}`,
        `workflows\t${result.workflows.join(", ")}`,
        `workflowsReset\t${result.workflowsReset}`,
        `stepsReset\t${result.stepsReset}`,
        "",
      ].join("\n")
    )
    return
  }
  process.stdout.write(`outcome\t${result.outcome}\nreason\t${result.reason}\n`)
}

function failureReasonOf(roots: Roots, stepSeq: string): string | null {
  const at = whereFor(roots, STEP, stepSeq)
  if (at === null) return null
  const said = readUncommitted(at.path)?.["failure-reason"]
  return typeof said === "string" ? said : null
}

export default async function pipelineRetry(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = String(parsed.requireNonNegativeInt("--seq"))
  const targetWorkflow = parsed.string("--workflow") ?? null
  const json = parsed.boolean("--json")

  const roots = resolveRoots()
  const kin = kinOf(readSnapshot(roots))

  const pipeline = kin.pipelineBySeq.get(seq)
  if (pipeline === undefined) {
    report({ outcome: "refused", reason: `no pipeline page stands at seq ${seq}` }, json)
    process.exitCode = 2
    return
  }

  const reading: Reading = {
    pipeline,
    workflows: kin.workflowsByPipeline.get(seq) ?? [],
    stepsOf: (workflowSeq) => kin.stepsByWorkflow.get(workflowSeq) ?? [],
    failureOf: (stepSeq) => failureReasonOf(roots, stepSeq),
    branchTip: servedTip(rootFor(roots, AKASHA), pipeline.branch),
  }

  const decided = decideRetry(reading, targetWorkflow)
  if (decided.kind === "refusal") {
    report({ outcome: "refused", reason: decided.reason }, json)
    process.exitCode = 2
    return
  }

  const landed = runRetry(roots, seq, decided)
  if (!landed.pipelineMoved) {
    report(
      {
        outcome: "raced",
        reason: `pipeline ${seq} moved off \`failed\` while this retry was being planned`,
      },
      json
    )
    process.exitCode = 2
    return
  }

  report(
    {
      outcome: "retried",
      seq,
      workflows: decided.workflows.map((one) => one.slug),
      workflowsReset: landed.workflowsReset,
      stepsReset: landed.stepsReset,
    },
    json
  )
}
