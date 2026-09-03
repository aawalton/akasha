import { CeilingExceeded, describeErr, withCeiling } from "@akasha/ci-containers/ci-reaper-ceiling"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { type ContainerReading, readCiContainers } from "./cluster.ts"
import { decidePipeline } from "./decide-pipeline.ts"
import { decideStep } from "./decide-step.ts"
import { decideWorkflow } from "./decide-workflow.ts"
import { stepsByTitle } from "./dispatch-guards.ts"
import { applyEffect, describe, type Effect } from "./effects.ts"
import type { Step } from "./entities.ts"
import { definitionReader, kinOf, readSnapshot } from "./pages.ts"

export const LOG = "sweep-pipeline-pages:"

export const TICK_MS = 10_000

export const TICK_CEILING_MS = 120_000

export const MAX_PASSES = 20

const NOTHING: readonly Step[] = []

export interface SweepReport {
  readonly passes: number
  readonly applied: number
  readonly containers: number | null
}

export type Say = (line: string) => void

function sweepOnce(
  roots: Roots,
  containers: ReadonlyMap<string, ContainerReading> | null,
  hasDefinition: (stepSeq: string) => boolean,
  now: number,
  say: Say
): number {
  const snapshot = readSnapshot(roots)
  const kin = kinOf(snapshot)
  const effects: Effect[] = []

  for (const pipeline of snapshot.pipelines) {
    effects.push(
      ...decidePipeline(
        pipeline,
        kin.workflowsByPipeline.get(pipeline.seq) ?? [],
        kin.pipelinesByBranch.get(pipeline.branch) ?? []
      )
    )
  }

  for (const workflow of snapshot.workflows) {
    const parent = kin.pipelineBySeq.get(workflow.pipelineSeq)
    if (parent === undefined) continue
    effects.push(
      ...decideWorkflow(
        workflow,
        parent,
        kin.workflowsByPipeline.get(parent.seq) ?? [],
        kin.stepsByWorkflow.get(workflow.seq) ?? NOTHING
      )
    )
  }

  const titled = new Map<string, ReadonlyMap<string, Step>>()
  for (const step of snapshot.steps) {
    const parent = kin.workflowBySeq.get(step.workflowSeq)
    if (parent === undefined) continue
    const siblings = kin.stepsByWorkflow.get(step.workflowSeq) ?? NOTHING
    let byTitle = titled.get(step.workflowSeq)
    if (byTitle === undefined) {
      byTitle = stepsByTitle(siblings)
      titled.set(step.workflowSeq, byTitle)
    }
    try {
      effects.push(
        ...decideStep(step, {
          workflow: parent,
          siblings,
          byTitle,
          containers,
          hasDefinition,
          now,
        })
      )
    } catch (err) {
      say(`step=${step.seq} was left alone: ${describeErr(err)}`)
    }
  }

  let applied = 0
  for (const effect of effects) {
    try {
      if (!applyEffect(roots, effect)) continue
    } catch (err) {
      say(`${describe(effect)} was refused: ${describeErr(err)}`)
      continue
    }
    applied += 1
    say(describe(effect))
  }
  return applied
}

async function containersOrNone(say: Say): Promise<ReadonlyMap<string, ContainerReading> | null> {
  try {
    return await readCiContainers()
  } catch (err) {
    say(
      `the cluster was not read, so no step moves off \`launching\` or \`running\` this tick: ${describeErr(err)}`
    )
    return null
  }
}

export async function runSweepTick(
  roots: Roots,
  signal: AbortSignal,
  say: Say = (line) => console.log(`${LOG} ${line}`)
): Promise<SweepReport> {
  signal.throwIfAborted()
  const containers = await containersOrNone(say)
  const hasDefinition = definitionReader(roots)
  let applied = 0
  for (let pass = 0; pass < MAX_PASSES; pass += 1) {
    signal.throwIfAborted()
    const took = sweepOnce(roots, containers, hasDefinition, Date.now(), say)
    applied += took
    if (took === 0) return { passes: pass + 1, applied, containers: containers?.size ?? null }
  }
  throw new Error(
    `${LOG} the sweep was still writing pipeline pages after ${MAX_PASSES} passes, so it stopped ` +
      "rather than going on waiting for a state machine that is not settling"
  )
}

export async function runBoundedSweepTick(roots: Roots, signal: AbortSignal): Promise<SweepReport> {
  return withCeiling("a tick of the pipeline page sweep", TICK_CEILING_MS, () =>
    runSweepTick(roots, signal)
  )
}

export { CeilingExceeded }
