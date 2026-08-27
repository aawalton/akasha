
export type RuleStatus = "LIVE" | "PROPOSED"

export interface CommsInput {
  readonly sender: string
  readonly content: string
}

export interface CommsRule {
  readonly id: string
  readonly senderMatch: string
  readonly contentRegex: string | undefined
  readonly target: string
  readonly status: RuleStatus
}

export type StateAuthorityKind =
  | "pages-rows"
  | "bound-worktree"
  | "game-state-rows"

export interface StateAuthority {
  readonly kind: StateAuthorityKind
  readonly detail: string
}

export type ResumePolicy =
  | { readonly kind: "fresh" }
  | { readonly kind: "resume-under-budget"; readonly tokenThreshold: number }

export interface OnDemandAgentSpec {
  readonly name: string
  readonly wakeSources: readonly CommsRule[]
  readonly stateAuthority: readonly StateAuthority[]
  readonly resumePolicy: ResumePolicy
  readonly owner: string
  readonly bootPrompt?: string
}

export function ruleMatches(rule: CommsRule, input: CommsInput): boolean {
  const senderHit = input.sender.length > 0 && input.sender.includes(rule.senderMatch)
  if (!senderHit) return false
  if (rule.contentRegex === undefined) return true
  try {
    return new RegExp(rule.contentRegex, "i").test(input.content)
  } catch {
    return false
  }
}

export type WakeMatchDecision =
  | { readonly kind: "revive"; readonly reason: string }
  | { readonly kind: "no-op"; readonly reason: string }

export type SeatWakeVerdict =
  | { readonly kind: "not-armed" }
  | { readonly kind: "armed-matched"; readonly ruleId: string }
  | { readonly kind: "armed-unmatched"; readonly declared: readonly string[] }

export interface SeatWakeInput {
  readonly wakeSources: readonly CommsRule[] | null
  readonly comms: CommsInput
}

function decideSeatWake(input: SeatWakeInput): SeatWakeVerdict {
  if (input.wakeSources === null) return { kind: "not-armed" }
  const hit = input.wakeSources.find((rule) => ruleMatches(rule, input.comms))
  if (hit !== undefined) return { kind: "armed-matched", ruleId: hit.id }
  return {
    kind: "armed-unmatched",
    declared: input.wakeSources.map((rule) => rule.senderMatch),
  }
}

export interface WakeMatchInput {
  readonly seatIsAbsent: boolean
  readonly comms: CommsInput
  readonly wakeSources: readonly CommsRule[]
}

export function decideWakeMatch(input: WakeMatchInput): WakeMatchDecision {
  if (!input.seatIsAbsent) {
    return { kind: "no-op", reason: "the seat's page stands, so an agent is in it — no wake needed" }
  }
  const seat = decideSeatWake({ wakeSources: input.wakeSources, comms: input.comms })
  if (seat.kind !== "armed-matched") {
    return { kind: "no-op", reason: "the seat is absent, but no wakeSource matched the inbound work" }
  }
  return { kind: "revive", reason: "an absent seat + a matching wakeSource → revive" }
}
