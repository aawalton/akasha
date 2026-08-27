import type { WorkflowKind } from "../workflow-dsl/types.ts"
import type { SurfaceWorkflow } from "./surface.ts"

export interface WorkflowGraphViolation {
  readonly workflow: string
  readonly message: string
}

const DEPENDS_ON_PREPARATION: Readonly<Record<WorkflowKind, boolean>> = {
  preparation: false,
  foundation: true,
  checks: true,
  apps: true,
  cleanup: false,
}

interface BranchRule {
  readonly allowed: readonly (string | undefined)[]
  readonly describe: string
}

const BRANCH_BY_KIND: Readonly<Record<WorkflowKind, BranchRule>> = {
  preparation: {
    allowed: [undefined, "*"],
    describe: 'omit `when.branch`, or set it to "*"',
  },
  cleanup: {
    allowed: [undefined, "*"],
    describe: 'omit `when.branch`, or set it to "*"',
  },
  checks: {
    allowed: ["!main"],
    describe: 'set `when.branch` to "!main"',
  },
  foundation: {
    allowed: ["main"],
    describe: 'set `when.branch` to "main"',
  },
  apps: {
    allowed: ["main"],
    describe: 'set `when.branch` to "main"',
  },
}

const shownBranch = (branch: string | undefined): string =>
  branch === undefined ? "no `when.branch` at all" : `"${branch}"`

const cyclicGroups = (
  names: readonly string[],
  successorsOf: (name: string) => readonly string[]
): readonly (readonly string[])[] => {
  const known = new Set(names)
  const index = new Map<string, number>()
  const lowlink = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const groups: string[][] = []
  let next = 0

  const lowest = (name: string): number => lowlink.get(name) ?? 0

  const visit = (name: string): undefined => {
    index.set(name, next)
    lowlink.set(name, next)
    next++
    stack.push(name)
    onStack.add(name)
    for (const to of successorsOf(name)) {
      if (!known.has(to)) continue
      if (!index.has(to)) {
        visit(to)
        lowlink.set(name, Math.min(lowest(name), lowest(to)))
      } else if (onStack.has(to)) {
        lowlink.set(name, Math.min(lowest(name), index.get(to) ?? 0))
      }
    }
    if (lowest(name) !== index.get(name)) return
    const group: string[] = []
    for (;;) {
      const popped = stack.pop()
      if (popped === undefined) break
      onStack.delete(popped)
      group.push(popped)
      if (popped === name) break
    }
    const loopsOnItself = group.length === 1 && successorsOf(name).includes(name)
    if (group.length > 1 || loopsOnItself) groups.push([...group].sort())
  }

  for (const name of known) if (!index.has(name)) visit(name)
  return groups
}

export const workflowGraphViolations = (
  workflows: readonly SurfaceWorkflow[]
): ReadonlyMap<SurfaceWorkflow, readonly WorkflowGraphViolation[]> => {
  const found = new Map<SurfaceWorkflow, WorkflowGraphViolation[]>()
  for (const workflow of workflows) found.set(workflow, [])
  const fault = (workflow: SurfaceWorkflow, message: string): undefined => {
    found.get(workflow)?.push({ workflow: workflow.name, message })
  }

  const bearing = new Map<string, SurfaceWorkflow[]>()
  for (const workflow of workflows) {
    const held = bearing.get(workflow.name) ?? []
    held.push(workflow)
    bearing.set(workflow.name, held)
  }

  for (const workflow of workflows) {
    const sharing = bearing.get(workflow.name) ?? []
    if (sharing.length > 1) {
      fault(
        workflow,
        `${sharing.length} workflows carry the name "${workflow.name}", declared in ` +
          `${sharing.map((one) => `\`${one.sourcePath}\``).join(" and ")} — rename all but one. ` +
          "A `dependsOn` naming it reaches whichever the dispatcher happened to index last, " +
          "so the ordering it states is not the ordering that runs."
      )
    }

    const dependsOn = workflow.dependsOn ?? []

    if (DEPENDS_ON_PREPARATION[workflow.kind] && !dependsOn.includes("preparation")) {
      fault(
        workflow,
        `${workflow.kind} workflows must list "preparation" in \`dependsOn\`, and this one lists ` +
          `[${dependsOn.join(", ")}] — preparation is what materializes the checkout every later ` +
          "step runs in, so without that edge the steps here start against a tree that is not there yet."
      )
    }

    const rule = BRANCH_BY_KIND[workflow.kind]
    if (!rule.allowed.includes(workflow.when.branch)) {
      fault(
        workflow,
        `${workflow.kind} workflows must ${rule.describe}, and this one states ` +
          `${shownBranch(workflow.when.branch)} — the branch decides which pipelines dispatch it, ` +
          "so the wrong value silently drops it from every pipeline it belonged in."
      )
    }

    if (workflow.declaredKind !== undefined && workflow.declaredKind !== workflow.kind) {
      fault(
        workflow,
        `the page states \`kind: ${workflow.kind}\` and the declaration states ` +
          `\`kind: "${workflow.declaredKind}"\` — make them agree. Discovery takes the kind from ` +
          "the page, so the declared value is being discarded without a word."
      )
    }

    const stepNames = new Set(workflow.steps.map((step) => step.name))
    const stepsBearing = new Map<string, number>()
    for (const step of workflow.steps) {
      stepsBearing.set(step.name, (stepsBearing.get(step.name) ?? 0) + 1)
    }
    for (const [name, count] of stepsBearing) {
      if (count === 1) continue
      fault(
        workflow,
        `${count} steps carry the name "${name}" — rename all but one. A sibling's \`dependsOn\`, ` +
          "its `outputs` and its pod name are all keyed by step name, so the duplicates contend " +
          "for one identity and which of them a dependent waits for is not decided anywhere."
      )
    }

    for (const step of workflow.steps) {
      for (const target of step.dependsOn ?? []) {
        if (stepNames.has(target)) continue
        fault(
          workflow,
          `step "${step.name}" states \`dependsOn: "${target}"\`, which is no step in this ` +
            "workflow — correct the spelling, restore the step it names, or drop the entry. " +
            "`dependenciesOf` drops a name matching no sibling, so this step waits for nothing, " +
            "and with no dependency left its `when` condition counts as met whatever it states, " +
            "so it dispatches at once."
        )
      }
    }

    for (const group of cyclicGroups(
      workflow.steps.map((step) => step.name),
      (name) => workflow.steps.find((step) => step.name === name)?.dependsOn ?? []
    )) {
      fault(
        workflow,
        `its steps ${group.join(", ")} wait on each other in a ring — remove one \`dependsOn\` ` +
          "entry along it. Every step in a ring stays unready forever, so the workflow neither " +
          "finishes nor fails."
      )
    }
  }

  const byName = new Map<string, SurfaceWorkflow>()
  for (const workflow of workflows) byName.set(workflow.name, workflow)

  for (const workflow of workflows) {
    for (const target of workflow.dependsOn ?? []) {
      const named = byName.get(target)
      if (named === undefined) {
        fault(
          workflow,
          `\`dependsOn\` names "${target}", which is no declared workflow — correct the spelling ` +
            "or drop the entry. The dispatch resolver treats an absent dependency as already " +
            "satisfied, so this edge gates nothing."
        )
        continue
      }
      if (workflow.kind === "apps" && named.kind === "checks") {
        fault(
          workflow,
          `\`dependsOn\` names "${target}", a checks workflow — name the foundation or app it ` +
            "really waits for instead. A checks workflow never runs on main, and an absent " +
            "dependency counts as satisfied, so on main this edge gates nothing at all."
        )
      }
      if (named.disabled === true && workflow.disabled !== true) {
        fault(
          workflow,
          `\`dependsOn\` names "${target}", which is disabled — drop the edge, or disable this ` +
            "workflow too. A disabled workflow never reaches a terminal state, so what this " +
            "states it waits for is either never satisfied or satisfied vacuously."
        )
      }
    }
  }

  for (const group of cyclicGroups(
    workflows.map((workflow) => workflow.name),
    (name) => byName.get(name)?.dependsOn ?? []
  )) {
    for (const name of group) {
      const workflow = byName.get(name)
      if (workflow === undefined) continue
      fault(
        workflow,
        `it stands in a ring of workflows waiting on each other: ${group.join(", ")} — remove ` +
          "one `dependsOn` entry along that ring, the one whose ordering the pipeline does not " +
          "actually need. Every workflow in a ring stays unready forever."
      )
    }
  }

  return found
}
