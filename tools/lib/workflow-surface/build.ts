import {
  type DeclarationContext,
  discoverWorkflows,
  workflowPages,
} from "../workflow-dsl/discovery.ts"
import type { DiscoveredWorkflow, Step } from "../workflow-dsl/types.ts"
import {
  PROBE_CONTEXT_IDS,
  PROBE_CONTEXTS,
  type ResolvedCommands,
  type SurfaceStep,
  type SurfaceWorkflow,
  type WorkflowSurface,
  WorkflowSurfaceSchema,
} from "./surface.ts"

const errorText = (err: unknown): string => (err instanceof Error ? err.message : String(err))

const resolveStep = (step: Step): readonly ResolvedCommands[] =>
  PROBE_CONTEXT_IDS.map((id): ResolvedCommands => {
    try {
      const commands =
        typeof step.commands === "function" ? step.commands(PROBE_CONTEXTS[id]) : step.commands
      return { ok: true, commands: [...commands] }
    } catch (err) {
      return { ok: false, error: errorText(err) }
    }
  })

const toSurfaceStep = (step: Step): SurfaceStep => ({
  name: step.name,
  image: step.image,
  script: step.script,
  dependsOn: step.dependsOn === undefined ? undefined : [...step.dependsOn],
  resolved: [...resolveStep(step)],
})

const toSurfaceWorkflow = (workflow: DiscoveredWorkflow): SurfaceWorkflow => ({
  name: workflow.name,
  kind: workflow.kind,
  declaredKind: workflow.declaredKind,
  package: workflow.package,
  dependsOn: workflow.dependsOn === undefined ? undefined : [...workflow.dependsOn],
  when: { event: workflow.when.event, branch: workflow.when.branch },
  disabled: workflow.disabled,
  alwaysRun: workflow.alwaysRun,
  dispatchNodes: workflow.dispatchNodes === undefined ? undefined : [...workflow.dispatchNodes],
  dispatchNodeTypes:
    workflow.dispatchNodeTypes === undefined ? undefined : [...workflow.dispatchNodeTypes],
  sourcePath: workflow.sourcePath,
  steps: (workflow.steps ?? []).map(toSurfaceStep),
})

export const scannedSourcePaths = (instructionsRoot: string): readonly string[] =>
  workflowPages(instructionsRoot).map((page) => page.sourcePath)

export const buildWorkflowSurface = async (
  instructionsRoot: string,
  context: DeclarationContext
): Promise<WorkflowSurface> => {
  const pages = workflowPages(instructionsRoot)
  const discovered = await discoverWorkflows(instructionsRoot, context)
  return WorkflowSurfaceSchema.parse({
    contexts: [...PROBE_CONTEXT_IDS],
    files: pages.map((page) => ({
      sourcePath: page.sourcePath,
      slug: page.slug,
      kind: page.kind,
    })),
    workflows: discovered.map(toSurfaceWorkflow),
  })
}
