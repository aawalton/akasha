import { buildContainerName, CONTAINER_NAME_MAX_LEN } from "@akasha/ci-containers/ci-container-name"
import type { WorkflowKind } from "@akasha/workflow-language/workflow-types"
import type { SurfaceStep, SurfaceWorkflow } from "./surface.ts"

export const NAME_SHAPE = /^[a-z][a-z0-9-]*$/

const CARRIES_PACKAGE: Readonly<Record<WorkflowKind, boolean>> = {
  preparation: false,
  foundation: false,
  checks: false,
  apps: true,
  cleanup: false,
}

const PAGE_SLUG_PREFIX = "workflow-"

const CAP_PROBE_SHA = "abc1234567abc1234567abc1234567abc1234567"

const CAP_PROBE_CHARACTER = "a"

export const stepNameCapFor = (pipelineSeq: number): number => {
  for (let length = CONTAINER_NAME_MAX_LEN; length >= 1; length--) {
    const probe = CAP_PROBE_CHARACTER.repeat(length)
    if (buildContainerName(String(pipelineSeq), probe, CAP_PROBE_SHA).includes(probe)) return length
  }
  throw new Error(
    `\`buildContainerName\` keeps no step name whole at pipeline sequence ${pipelineSeq}, not even one ` +
      "character, so there is no cap a step name could meet and this check would refuse every " +
      "name it saw. The pod-name framing has outgrown the 63 characters a pod name may run to."
  )
}

export const PIPELINE_SEQ_ASSUMED_OUTSIDE_CI = 99_999

const SEQ_VARIABLES = ["PIPELINE_SEQ", "CI_SEQ"] as const

const SEQ_SHAPE = /^[1-9][0-9]*$/

export interface ResolvedPipelineSeq {
  readonly seq: number
  readonly source: string
}

export const resolvePipelineSeq = (
  env: Readonly<Record<string, string | undefined>>
): ResolvedPipelineSeq => {
  for (const name of SEQ_VARIABLES) {
    const stated = env[name]
    if (stated === undefined || !SEQ_SHAPE.test(stated)) continue
    return { seq: Number(stated), source: `$${name}` }
  }
  return {
    seq: PIPELINE_SEQ_ASSUMED_OUTSIDE_CI,
    source: `assumed — neither ${SEQ_VARIABLES.map((one) => `$${one}`).join(" nor ")} is set, so this run is outside a pipeline`,
  }
}

export interface NamingViolation {
  readonly workflow: string
  readonly message: string
}

export const workflowNameViolations = (
  workflow: SurfaceWorkflow,
  pageSlug: string
): readonly NamingViolation[] => {
  const found: NamingViolation[] = []
  const fault = (message: string): undefined => {
    found.push({ workflow: workflow.name, message })
  }

  if (!NAME_SHAPE.test(workflow.name)) {
    fault(
      `the workflow name "${workflow.name}" is not of the shape ${NAME_SHAPE} — lower case, ` +
        "digits and hyphens, starting with a letter. The name is composed into a pod name, " +
        "which a Kubernetes object may only take in that shape."
    )
  }

  if (workflow.name.startsWith(`${workflow.kind}-`)) {
    fault(
      `the workflow name "${workflow.name}" restates its own kind — drop the "${workflow.kind}-" ` +
        "from the front. The page already states the kind, and the name repeated into every " +
        "step name below it costs characters against the pod-name cap for nothing."
    )
  }

  if (CARRIES_PACKAGE[workflow.kind] && workflow.package === undefined) {
    fault(
      `${workflow.kind} workflows must state a \`package\`, and this one states none — an apps ` +
        "workflow deploys one workspace package, and what it deploys is read off that field."
    )
  }

  if (!CARRIES_PACKAGE[workflow.kind] && workflow.package !== undefined) {
    fault(
      `${workflow.kind} workflows must state no \`package\`, and this one states ` +
        `"${workflow.package}" — drop the field. Only an apps workflow deploys a package, so ` +
        "the field here is read by nothing and reads as a claim that it is."
    )
  }

  if (pageSlug !== `${PAGE_SLUG_PREFIX}${workflow.name}`) {
    fault(
      `the page declaring it is slugged "${pageSlug}" and its declaration names the workflow ` +
        `"${workflow.name}", so the page should be slugged ` +
        `"${PAGE_SLUG_PREFIX}${workflow.name}" — a workflow page takes the ` +
        `\`${PAGE_SLUG_PREFIX}\` prefix so it does not contend for the slug of whatever it deploys.`
    )
  }

  return found
}

export const stepNameViolations = (
  workflow: SurfaceWorkflow,
  step: SurfaceStep,
  stepNameCap: number
): readonly NamingViolation[] => {
  const found: NamingViolation[] = []
  const fault = (message: string): undefined => {
    found.push({ workflow: workflow.name, message })
  }

  if (!NAME_SHAPE.test(step.name)) {
    fault(
      `the step name "${step.name}" is not of the shape ${NAME_SHAPE} — lower case, digits and ` +
        "hyphens, starting with a letter. The name is composed into a pod name, which a " +
        "Kubernetes object may only take in that shape."
    )
  }

  if (!step.name.startsWith(`${workflow.name}-`)) {
    fault(
      `the step name "${step.name}" does not start with "${workflow.name}-" — a step name is ` +
        "read on its own in pod names, logs and outputs, where nothing else says which workflow " +
        "it came from."
    )
  }

  if (step.name.length > stepNameCap) {
    fault(
      `the step name "${step.name}" runs to ${step.name.length} characters and the cap is ` +
        `${stepNameCap} — shorten it. Past the cap \`buildContainerName\` cuts the name and appends a ` +
        "digest, so the pod stops naming the step it runs and nothing reading pod names can " +
        "find it again."
    )
  }

  return found
}
