import { askRule, type RuleAnswer } from "@akasha/seat-system/supervisor-ask-rule"
import { shape } from "./shape.ts"
import type { AskDecide } from "./supervisor-resume-asks.ts"

const RULE = "selfHealJitterRule"

const AnswerZ = shape.object({
  [RULE]: shape.object({ reExecJitterMs: shape.number() }),
})

const SAFE = 0

export type SelfHealJitterRuleSource = (
  randFloat: number,
  rawMaxJitterMs: string | undefined
) => Promise<RuleAnswer<number>>

export function readReExecJitterMs(answered: unknown): number {
  return AnswerZ.parse(answered)[RULE].reExecJitterMs
}

export function askReExecJitterMs(
  randFloat: number,
  rawMaxJitterMs: string | undefined,
  ask?: AskDecide
): Promise<RuleAnswer<number>> {
  return askRule(
    RULE,
    { reExecJitterMs: { randFloat, rawMaxJitterMs: rawMaxJitterMs ?? null } },
    readReExecJitterMs,
    SAFE,
    ask
  )
}
