
import type { HoldMark } from "./oauth-at-limit-mark.ts"
import { holdMarksOnPage } from "./oauth-page-mark.ts"
import { DISABLED_REASON_KEY } from "./oauth-page-state.ts"

export interface SubscriptionDisabledEffects {
  readonly holdMark: HoldMark
}

const LIVE: SubscriptionDisabledEffects = {
  holdMark: holdMarksOnPage,
}

function holdDisabledReason(
  effects: SubscriptionDisabledEffects,
  account: string,
  reason: string | null,
  logPrefix: string
): void {
  try {
    const outcome = effects.holdMark(account, {
      [DISABLED_REASON_KEY]: reason === null ? null : JSON.stringify(reason),
    })
    if (outcome.kind === "refused") {
      console.error(`${logPrefix} ${account} kept its subscription mark off its page: ${outcome.why}`)
    }
  } catch (err) {
    console.error(`${logPrefix} ${account} kept its subscription mark off its page:`, err)
  }
}

export async function markAccountSubscriptionDisabled(
  account: string,
  reason: string,
  logPrefix = "[oauth]",
  effects: SubscriptionDisabledEffects = LIVE
): Promise<void> {
  holdDisabledReason(effects, account, reason, logPrefix)
}

export async function clearAccountSubscriptionDisabled(
  account: string,
  logPrefix = "[oauth]",
  effects: SubscriptionDisabledEffects = LIVE
): Promise<void> {
  holdDisabledReason(effects, account, null, logPrefix)
}
