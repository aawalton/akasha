export const summary =
  "Check the shape of every CI workflow and step name, and that each step name fits a pod name"

import type { CommandHelp } from "../ops/surface.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import { exitOnResult, exitOnToolError } from "../lib/check-workflow/violation-reporter.ts"
import { parseArgs } from "../lib/parse-args.ts"
import {
  type NamingViolation,
  resolvePipelineSeq,
  stepNameCapFor,
  stepNameViolations,
  workflowNameViolations,
} from "../lib/workflow-surface/naming.ts"
import { SURFACE_FLAGS, suppliedSurface } from "../lib/workflow-surface/supplied.ts"
import type { SurfaceStep, SurfaceWorkflow } from "../lib/workflow-surface/surface.ts"

export const help: CommandHelp = {
  flags: SURFACE_FLAGS,
  envVars: [
    {
      name: "PIPELINE_SEQ",
      description:
        "The pipeline sequence this run belongs to. It stands in the pod name ahead of the step name, so a longer one leaves the step name less room. Read as `CI_SEQ` too, and assumed to be 99999 outside a pipeline, which is the tightest cap a five-digit sequence gives.",
    },
  ],
  examples: [
    "ops check-ci-naming-conventions",
    "ops check-ci-naming-conventions --surface /var/tmp/surface.json",
  ],
}

const PREFIX = "[ci-naming-conventions]"

type Named =
  | { readonly kind: "workflow"; readonly workflow: SurfaceWorkflow; readonly pageSlug: string }
  | { readonly kind: "step"; readonly workflow: SurfaceWorkflow; readonly step: SurfaceStep }

export default async function checkCiNamingConventions(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  let held: Awaited<ReturnType<typeof suppliedSurface>>
  try {
    held = await suppliedSurface({
      root: parsed.string("--root"),
      surfaceFile: parsed.string("--surface"),
    })
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const pipelineSeq = resolvePipelineSeq(process.env)
  let stepNameCap: number
  try {
    stepNameCap = stepNameCapFor(pipelineSeq.seq)
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const slugAt = new Map(held.surface.files.map((file) => [file.sourcePath, file.slug]))

  const named: Named[] = []
  for (const workflow of held.surface.workflows) {
    named.push({
      kind: "workflow",
      workflow,
      pageSlug: slugAt.get(workflow.sourcePath) ?? "",
    })
    for (const step of workflow.steps) named.push({ kind: "step", workflow, step })
  }
  const workflowNames = held.surface.workflows.length
  const stepNames = named.length - workflowNames

  const derivation =
    `step names capped at ${stepNameCap} characters, found by running \`buildPodName\` at ` +
    `pipeline sequence ${pipelineSeq.seq} (${pipelineSeq.source})`

  const { population, violations } = examinePopulation<Named, NamingViolation>({
    members: named,
    unit: "workflow and step names",
    membership: {
      kind: "enumerated",
      because:
        "the members are every name the surface carries — one per workflow and one per step — and " +
        "`buildWorkflowSurface` throws on a `workflow-template` page that does not load rather " +
        "than skipping it, then parses what it emits through `WorkflowSurfaceSchema`, which " +
        "requires a name on every workflow and every step. A surface read from a file goes " +
        "through that same schema, so a name cannot arrive here absent",
    },
    labelOf: (member) =>
      member.kind === "workflow"
        ? member.workflow.name
        : `${member.workflow.name}/${member.step.name}`,
    siteOf: (member) =>
      held.root === null ? null : `${held.root}/${member.workflow.sourcePath}`,
    examine: (member) =>
      member.kind === "workflow"
        ? workflowNameViolations(member.workflow, member.pageSlug)
        : stepNameViolations(member.workflow, member.step, stepNameCap),
  })

  exitOnResult<NamingViolation>({
    violations,
    options: {
      prefix: PREFIX,
      header: `A CI name is not of the shape it must take — ${derivation}`,
      successMessage:
        `OK — ${workflowNames} workflow names and ${stepNames} step names read from ` +
        `${held.from}; ${derivation}.`,
      groupBy: (violation) => violation.workflow,
      formatViolation: (violation) => violation.message,
      population,
    },
  })
}
