import type { Roots } from "../../../page/page.ts"
import { AKASHA, rootFor } from "../../../repo/roots/roots.ts"
import { servedTip, TRANSPORT } from "../served-tip.ts"
import { reachCreatorCode } from "./code.ts"
import { createPipelineTree } from "./create.ts"
import { lastPipelinedCommit, MAIN_BRANCH, pipelinesAtCommit } from "./pages.ts"
import { planPipeline } from "./plan.ts"
import { prepareMainPipeline } from "./prepare.ts"
import { chooseWorkflows } from "./select.ts"

export const LOG = "main-pipeline-creator:"

export const TICK_MS = 60_000

export const TICK_CEILING_MS = 900_000

export async function runMainPipelineCreatorTick(roots: Roots, signal: AbortSignal): Promise<void> {
  signal.throwIfAborted()

  const codeRoot = rootFor(roots, AKASHA)

  const commit = servedTip(codeRoot, MAIN_BRANCH)
  if (commit === null) {
    console.error(`${LOG} \`${TRANSPORT}\` serves no \`${MAIN_BRANCH}\` for ${codeRoot}`)
    return
  }

  const instructionsCommit = servedTip(rootFor(roots, AKASHA), MAIN_BRANCH)
  if (instructionsCommit === null) {
    console.error(
      `${LOG} \`${TRANSPORT}\` serves no \`${MAIN_BRANCH}\` for ${rootFor(roots, AKASHA)}, so no ` +
        "instructions commit could be fixed for this pipeline to read"
    )
    return
  }

  const standing = pipelinesAtCommit(roots, MAIN_BRANCH, commit)
  if (standing.length === 1) return
  if (standing.length > 1) {
    console.error(
      `${LOG} drift_detected duplicate_main_pipelines_at_main_commit commit=${commit} ` +
        `count=${standing.length} seqs=${standing.map((one) => one.seq).join(",")}`
    )
    return
  }

  console.error(
    `${LOG} drift_detected no_main_pipeline_at_main_commit commit=${commit} — creating one`
  )

  await createFromTree(roots, signal, commit, instructionsCommit)
}

async function createFromTree(
  roots: Roots,
  signal: AbortSignal,
  commit: string,
  instructionsCommit: string
): Promise<void> {
  const code = reachCreatorCode()
  signal.throwIfAborted()

  const prepared = await prepareMainPipeline(code, {
    branch: MAIN_BRANCH,
    commit,
    instructionsCommit,
    lastPipelinedCommit: lastPipelinedCommit(roots, MAIN_BRANCH),
  })
  if (prepared === null) return
  signal.throwIfAborted()

  const choice = chooseWorkflows(roots, code, {
    branch: prepared.branch,
    changedFiles: prepared.changedFiles,
    configs: prepared.configs,
    graph: prepared.graph,
  })
  signal.throwIfAborted()

  const created = createPipelineTree(
    roots,
    planPipeline({
      branch: prepared.branch,
      commit: prepared.commit,
      instructionsCommit,
      changedFiles: prepared.changedFiles,
      treeHash: prepared.treeHash,
      choice,
    })
  )

  console.log(
    `${LOG} created pipeline #${created.seq} commit=${commit} ` +
      `workflows=${created.workflowCount} steps=${created.stepCount} ` +
      `overtook=${choice.overtakenSeqs.join(",")}`
  )
}

export async function runBoundedMainPipelineCreatorTick(
  roots: Roots,
  signal: AbortSignal
): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `${LOG} a tick has not answered inside ${TICK_CEILING_MS}ms while creating the main ` +
              "pipeline; ending rather than starting a second tick beside it"
          )
        ),
      TICK_CEILING_MS
    )
  })
  try {
    await Promise.race([runMainPipelineCreatorTick(roots, signal), ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}
