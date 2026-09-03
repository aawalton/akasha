import { askRule, type RuleAnswer } from "@akasha/seat-system/supervisor-ask-rule"
import type { AskDecide } from "@akasha/seat-system/supervisor-resume-asks"
import { shape } from "./shape.ts"

const RULE = "proxyAdoptionRule"

export type ProxyAdoptionInput = {
  readonly hasLiveProxy: boolean
  readonly versionMatches: boolean
  readonly healthy: boolean
}

export type ProxyAdoptionDecision = "adopt" | "adopt-with-drift" | "spawn-fresh"

const AnswerZ = shape.object({
  [RULE]: shape.object({
    decideProxyAdoption: shape.enum(["adopt", "adopt-with-drift", "spawn-fresh"]),
  }),
})

const SAFE: ProxyAdoptionDecision = "adopt"

export type ProxyAdoptionRuleSource = (
  input: ProxyAdoptionInput
) => Promise<RuleAnswer<ProxyAdoptionDecision>>

export function readProxyAdoption(answered: unknown): ProxyAdoptionDecision {
  return AnswerZ.parse(answered)[RULE].decideProxyAdoption
}

export function askProxyAdoption(
  input: ProxyAdoptionInput,
  ask?: AskDecide
): Promise<RuleAnswer<ProxyAdoptionDecision>> {
  return askRule(RULE, { decideProxyAdoption: input }, readProxyAdoption, SAFE, ask)
}
