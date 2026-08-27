import { discoverWorkflows } from "../workflow-dsl/discovery.ts"
import type { CIContext, DiscoveredWorkflow, Step } from "../workflow-dsl/types.ts"
import { applyContext, PIPELINE_SA } from "./applies.ts"

export interface EngineStep {
  readonly workflow: DiscoveredWorkflow
  readonly step: Step
  readonly site: string
  readonly commands: readonly string[]
  readonly commandText: string
}

export interface EngineSurface {
  readonly workflowCount: number
  readonly stepCount: number
  readonly steps: readonly EngineStep[]
}

function commandsOf(step: Step, ci: CIContext): readonly string[] {
  return typeof step.commands === "function" ? step.commands(ci) : step.commands
}

export async function engineSurface(roots: {
  readonly instructionsRoot: string
  readonly codeRoot: string
}): Promise<EngineSurface> {
  const workflows = await discoverWorkflows(roots.instructionsRoot, { codeRoot: roots.codeRoot })
  const ci = applyContext()
  const steps: EngineStep[] = []
  let stepCount = 0
  for (const workflow of workflows) {
    for (const step of workflow.steps ?? []) {
      stepCount += 1
      if (step.backendOptions?.kubernetes?.serviceAccountName !== PIPELINE_SA) continue
      const commands = commandsOf(step, ci)
      steps.push({
        workflow,
        step,
        site: `${workflow.name} → ${step.name}`,
        commands,
        commandText: commands.join("\n"),
      })
    }
  }
  return { workflowCount: workflows.length, stepCount, steps }
}
