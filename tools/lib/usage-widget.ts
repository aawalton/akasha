
import { explainAccountEligibility, type IneligibilityReason } from "./oauth-selection.ts"
import type { AccountState } from "./oauth-types.ts"

export type UsageTier = "red" | "yellow" | "green" | "blue"

export type UsageWidgetPayload = {
  avgUsedPct: number
  fiveHourBackAt: number | null
  sevenDayBackAt: number | null
  sevenDayEndsAt: number | null
  tier: UsageTier
}

const HOUR_MS = 3_600_000

type PoolAccount = {
  readonly state: AccountState
  readonly reasons: readonly IneligibilityReason[]
}

function soonestUpcoming(instants: readonly (string | null)[], nowMs: number): number | null {
  let soonest: number | null = null
  for (const iso of instants) {
    if (iso == null) continue
    const ms = Date.parse(iso)
    if (Number.isNaN(ms)) continue
    if (ms <= nowMs) continue
    if (soonest == null || ms < soonest) soonest = ms
  }
  return soonest
}

export function deriveUsageWidgetPayload(
  accounts: readonly AccountState[],
  nowMs: number
): UsageWidgetPayload {
  const pool: PoolAccount[] = accounts.map((state) => ({
    state,
    reasons: explainAccountEligibility(state, nowMs).reasons,
  }))

  const utils = pool.map((a) => a.state.sevenDayUtil).filter((u) => Number.isFinite(u))
  const avgUsedPct =
    utils.length === 0 ? 0 : Math.round(utils.reduce((sum, u) => sum + u, 0) / utils.length)

  const weeklyDead = (a: PoolAccount) => a.reasons.includes("seven-day-maxed")

  const fiveHourBackAt = soonestUpcoming(
    pool
      .filter((a) => a.reasons.includes("five-hour-maxed") && !weeklyDead(a))
      .map((a) => a.state.fiveHourResetsAt),
    nowMs
  )
  const sevenDayBackAt = soonestUpcoming(
    pool.filter(weeklyDead).map((a) => a.state.sevenDayResetsAt),
    nowMs
  )
  const sevenDayEndsAt = soonestUpcoming(
    pool.filter((a) => !weeklyDead(a)).map((a) => a.state.sevenDayResetsAt),
    nowMs
  )

  return {
    avgUsedPct,
    fiveHourBackAt,
    sevenDayBackAt,
    sevenDayEndsAt,
    tier: tierFor(sevenDayEndsAt, nowMs),
  }
}

function tierFor(sevenDayEndsAt: number | null, nowMs: number): UsageTier {
  if (sevenDayEndsAt == null) return "blue"
  const hours = (sevenDayEndsAt - nowMs) / HOUR_MS
  return hours < 24 ? "red" : hours < 48 ? "yellow" : hours < 72 ? "green" : "blue"
}
