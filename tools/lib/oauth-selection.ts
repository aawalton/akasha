import { hoursUntilReset } from "@akasha/agents/claude-account-pacing"
import type { AccountState } from "@akasha/agents/oauth-types"

export type IneligibilityReason = "five-hour-maxed" | "seven-day-maxed"

export type EligibilityExplanation = {
  readonly eligible: boolean
  readonly reasons: readonly IneligibilityReason[]
}

export function explainAccountEligibility(s: AccountState, _now: number): EligibilityExplanation {
  const reasons: IneligibilityReason[] = []
  if (s.fiveHourUtil >= 100) reasons.push("five-hour-maxed")
  if (s.sevenDayUtil >= 100) reasons.push("seven-day-maxed")
  return { eligible: reasons.length === 0, reasons }
}

export function isAccountEligible(s: AccountState, now: number): boolean {
  return explainAccountEligibility(s, now).eligible
}

export function formatPoolEligibilityBreakdown(
  states: readonly AccountState[],
  now: number
): string {
  return states
    .map((s) => {
      const { eligible, reasons } = explainAccountEligibility(s, now)
      return `${s.account}=${eligible ? "eligible" : reasons.join(",")}`
    })
    .join(" ")
}

export type PoolSummary = {
  readonly eligibleCount: number
  readonly totalCount: number
  readonly earliestEligibleResetMs: number | null
}

function resetInstantMs(iso: string | null): number | null {
  if (iso == null) return null
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? null : ms
}

export function accountEligibleAgainMs(s: AccountState, _now: number): number | null {
  const blocking: (number | null)[] = []
  if (s.fiveHourUtil >= 100) blocking.push(resetInstantMs(s.fiveHourResetsAt))
  if (s.sevenDayUtil >= 100) blocking.push(resetInstantMs(s.sevenDayResetsAt))
  if (blocking.length === 0) return null
  if (blocking.some((b) => b == null)) return null
  return Math.max(...blocking.filter((b): b is number => b != null))
}

export function summarizePool(states: readonly AccountState[], now: number): PoolSummary {
  let eligibleCount = 0
  let earliest: number | null = null
  for (const s of states) {
    if (isAccountEligible(s, now)) {
      eligibleCount++
      continue
    }
    const again = accountEligibleAgainMs(s, now)
    if (again != null && (earliest == null || again < earliest)) earliest = again
  }
  return { eligibleCount, totalCount: states.length, earliestEligibleResetMs: earliest }
}

export function selectAccount(states: readonly AccountState[], now: number): AccountState | null {
  const eligible = states.filter((s) => isAccountEligible(s, now))
  if (eligible.length === 0) return null

  return eligible.reduce((best, s) => (comparePrimary(s, best, now) < 0 ? s : best))
}

function comparePrimary(a: AccountState, b: AccountState, now: number): number {
  const ha = hoursUntilReset({ now, sevenDayResetsAt: a.sevenDayResetsAt })
  const hb = hoursUntilReset({ now, sevenDayResetsAt: b.sevenDayResetsAt })
  if (ha !== hb) return ha - hb
  if (a.sevenDayUtil !== b.sevenDayUtil) return a.sevenDayUtil - b.sevenDayUtil
  if (a.fiveHourUtil !== b.fiveHourUtil) return a.fiveHourUtil - b.fiveHourUtil
  return a.account < b.account ? -1 : a.account > b.account ? 1 : 0
}
