import { askRule, type RuleAnswer } from "@akasha/seat-system/supervisor-ask-rule"
import type { AskDecide } from "@akasha/seat-system/supervisor-resume-asks"
import { shape } from "./shape.ts"

const RULE = "preCliffRestartRule"

export type PreCliffObservation = {
  childAgeMs: number | null
  alreadyArmed: boolean
  deferredOrActionPending: boolean
}

export type PreCliffDecision = "arm" | "wait"

const AnswerZ = shape.object({
  [RULE]: shape.object({ decidePreCliffRestart: shape.enum(["arm", "wait"]) }),
})

const SAFE: PreCliffDecision = "wait"

export type PreCliffRestartRuleSource = (
  obs: PreCliffObservation,
  thresholdMs: number
) => Promise<RuleAnswer<PreCliffDecision>>

export function readPreCliffRestart(answered: unknown): PreCliffDecision {
  return AnswerZ.parse(answered)[RULE].decidePreCliffRestart
}

export function askPreCliffRestart(
  obs: PreCliffObservation,
  thresholdMs: number,
  ask?: AskDecide
): Promise<RuleAnswer<PreCliffDecision>> {
  return askRule(
    RULE,
    { decidePreCliffRestart: { obs, thresholdMs } },
    readPreCliffRestart,
    SAFE,
    ask
  )
}
