import { pageTypePathIn } from "../../../page/page-types.ts"
import { type SeqSource } from "../page-seq.ts"
import { AKASHA, resolveRoots, rootFor } from "../../../repo/roots/roots"

const pageTypeAt = (slug: string): string => pageTypePathIn(rootFor(resolveRoots(), AKASHA), slug)

export const PIPELINE_SEQS: SeqSource = {
  pageTypeRelPath: pageTypeAt("pipeline"),
  noun: "pipeline",
}

export const WORKFLOW_SEQS: SeqSource = {
  pageTypeRelPath: pageTypeAt("workflow"),
  noun: "workflow",
}

export const STEP_SEQS: SeqSource = { pageTypeRelPath: pageTypeAt("step"), noun: "step" }
