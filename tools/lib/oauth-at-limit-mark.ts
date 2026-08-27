import { backoffExpiryMs } from "./oauth-at-limit-expiry.ts"
import type { PageMark } from "./oauth-page-mark.ts"
import { RETRY_AFTER_KEY } from "./oauth-page-state.ts"

export type HoldMark = (account: string, marks: Record<string, string | null>) => PageMark

export type ApplyAtLimitMarkDeps = {
  holdMark: HoldMark
}

export async function applyAtLimitMark(
  args: { account: string; retryAfterHeader: string | null; logPrefix?: string },
  deps: ApplyAtLimitMarkDeps
): Promise<void> {
  const logPrefix = args.logPrefix ?? "[oauth]"
  let until: string
  try {
    until = new Date(
      backoffExpiryMs({ now: Date.now(), retryAfterHeader: args.retryAfterHeader })
    ).toISOString()
  } catch (err) {
    console.error(`${logPrefix} markAccountAtLimit error for ${args.account}:`, err)
    return
  }

  try {
    const outcome = deps.holdMark(args.account, { [RETRY_AFTER_KEY]: until })
    if (outcome.kind === "refused") {
      console.error(`${logPrefix} ${args.account} kept its at-limit mark off its page: ${outcome.why}`)
    }
  } catch (err) {
    console.error(`${logPrefix} ${args.account} kept its at-limit mark off its page:`, err)
  }
}
