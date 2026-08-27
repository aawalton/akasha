export const summary =
  "Check that the CI workflow graph is a DAG and that every dependsOn edge names something real"

import type { CommandHelp } from "../ops/surface.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import { exitOnResult, exitOnToolError } from "../lib/check-workflow/violation-reporter.ts"
import { parseArgs } from "../lib/parse-args.ts"
import {
  SURFACE_FLAGS,
  suppliedSurface,
} from "../lib/workflow-surface/supplied.ts"
import {
  type WorkflowGraphViolation,
  workflowGraphViolations,
} from "../lib/workflow-surface/graph.ts"
import type { SurfaceWorkflow } from "../lib/workflow-surface/surface.ts"

export const help: CommandHelp = {
  flags: SURFACE_FLAGS,
  examples: [
    "ops check-ci-workflow-graph",
    "ops check-ci-workflow-graph --surface /var/tmp/surface.json",
  ],
}

const PREFIX = "[ci-workflow-graph]"

export default async function checkCiWorkflowGraph(args: readonly string[]): Promise<void> {
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

  const workflows = held.surface.workflows
  const faults = workflowGraphViolations(workflows)
  const disabled = workflows.filter((one) => one.disabled === true).length
  const steps = workflows.reduce((count, one) => count + one.steps.length, 0)

  const { population, violations } = examinePopulation<SurfaceWorkflow, WorkflowGraphViolation>({
    members: workflows,
    unit: "workflows",
    membership: {
      kind: "enumerated",
      because:
        "`buildWorkflowSurface` loads every `workflow-template` page the tree holds and throws on " +
        "one that does not import or exports no workflow, rather than skipping it, and parses what " +
        "it emits through `WorkflowSurfaceSchema` before returning it; a surface read from a file " +
        "goes through that same schema. So the workflows here are all of them, and a page that " +
        "went missing is a tool error above rather than a smaller population",
    },
    labelOf: (workflow) => workflow.name,
    siteOf: (workflow) =>
      held.root === null ? null : `${held.root}/${workflow.sourcePath}`,
    examine: (workflow) => faults.get(workflow) ?? [],
  })

  exitOnResult<WorkflowGraphViolation>({
    violations,
    options: {
      prefix: PREFIX,
      header: "The CI workflow graph does not hold",
      successMessage:
        `OK — ${workflows.length} workflows and ${steps} steps read from ${held.from}, ` +
        `${disabled} of them disabled and examined alongside the rest.`,
      groupBy: (violation) => violation.workflow,
      formatViolation: (violation) => violation.message,
      population,
    },
  })
}
