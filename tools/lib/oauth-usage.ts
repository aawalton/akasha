
import { computePacingDerivations } from "./usage-derivations.ts"
import { holdBesideAccount } from "./claude-account-akasha.ts"
import { backoffExpiryMs } from "./oauth-at-limit-expiry.ts"
import { applyAtLimitMark } from "./oauth-at-limit-mark.ts"
import { USAGE_URL } from "./oauth-constants.ts"
import { holdMarksOnPage } from "./oauth-page-mark.ts"
import { UsageResponseSchema } from "./oauth-schemas.ts"
import type { OAuthCredential } from "./oauth-types.ts"
import {
  decideUsageRepoll,
  INITIAL_REPOLL_GATE_STATE,
  type RepollGateState,
  recordRepollAttempt,
  recordUsageRateLimited,
} from "./oauth-usage-repoll-gate.ts"

const repollGateStates = new Map<string, RepollGateState>()

export type UsageResponse = {
  five_hour: { resets_at: string | null; utilization: number }
  seven_day: { resets_at: string | null; utilization: number }
}

export function parseUsageResponse(raw: unknown): UsageResponse {
  const parsed = UsageResponseSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(`Usage response malformed: ${parsed.error.message}`)
  }
  return {
    five_hour: {
      utilization: parsed.data.five_hour.utilization,
      resets_at: parsed.data.five_hour.resets_at,
    },
    seven_day: {
      utilization: parsed.data.seven_day.utilization,
      resets_at: parsed.data.seven_day.resets_at,
    },
  }
}

export class UsageFetchError extends Error {
  readonly status: number
  constructor(status: number) {
    super(`Usage fetch failed: ${status}`)
    this.name = "UsageFetchError"
    this.status = status
  }
}

export async function fetchUsage(accessToken: string): Promise<UsageResponse> {
  const res = await fetch(USAGE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": "claude-code/2.1.63",
      "anthropic-beta": "oauth-2025-04-20",
    },
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new UsageFetchError(res.status)
  return parseUsageResponse(await res.json())
}

// Usage is held beside the page directly rather than through a mark, so that a percentage stays a
// number rather than being spelled as text and read back.
function holdUsageOnPage(account: string, stated: Record<string, unknown>): void {
  const held: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(stated)) {
    if (value !== null && value !== undefined) held[key] = value
  }
  const wrong = holdBesideAccount(account, held)
  if (wrong !== null) console.error(`[oauth] ${account} kept its usage off its page: ${wrong}`)
}

export async function pushPacingToPage(
  account: string,
  usage: UsageResponse,
  logPrefix = "[oauth]"
): Promise<void> {
  try {
    const now = Date.now()
    const derived = computePacingDerivations({
      now,
      sevenDayUtil: usage.seven_day.utilization,
      sevenDayResetsAt: usage.seven_day.resets_at,
      fiveHourResetsAt: usage.five_hour.resets_at,
    })
    holdUsageOnPage(account, {
      "five-hour-percent-used": usage.five_hour.utilization,
      "seven-day-percent-used": usage.seven_day.utilization,
      "five-hour-resets-at": usage.five_hour.resets_at,
      "seven-day-resets-at": usage.seven_day.resets_at,
      "five-hour-started-at": derived.fiveHourStartedAt,
      "seven-day-started-at": derived.sevenDayStartedAt,
      "usage-read-at": new Date(now).toISOString(),
    })
  } catch (err) {
    console.error(`${logPrefix} pushPacingToPage error for ${account}:`, err)
  }
}

export async function markAccountAtLimit(args: {
  account: string
  retryAfterHeader: string | null
  logPrefix?: string
}): Promise<void> {
  await applyAtLimitMark(args, {
    holdMark: (account, marks) => holdMarksOnPage(account, marks),
  })
}


export async function repollUsageAfter429(
  account: string,
  getToken: (account: string) => Promise<OAuthCredential | null>,
  logPrefix = "[oauth]"
): Promise<void> {
  const now = Date.now()
  const state = repollGateStates.get(account) ?? INITIAL_REPOLL_GATE_STATE
  const decision = decideUsageRepoll(state, now)
  if (decision.kind === "skip") {
    console.log(`${logPrefix} repollUsageAfter429 skipped for ${account}: ${decision.reason}`)
    return
  }
  repollGateStates.set(account, recordRepollAttempt(state, now))
  try {
    const cred = await getToken(account)
    if (cred == null) return
    const usage = await fetchUsage(cred.accessToken)
    await pushPacingToPage(account, usage, logPrefix)
  } catch (err) {
    if (err instanceof UsageFetchError && err.status === 429) {
      repollGateStates.set(account, recordUsageRateLimited(state, Date.now()))
      console.error(
        `${logPrefix} repollUsageAfter429 rate-limited by the usage endpoint for ${account}; breaker open`
      )
      return
    }
    console.error(`${logPrefix} repollUsageAfter429 error for ${account}:`, err)
  }
}

export function resetRepollGateForTests(): undefined {
  repollGateStates.clear()
}
