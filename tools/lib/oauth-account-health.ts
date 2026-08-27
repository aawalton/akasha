
import type { HoldMark } from "./oauth-at-limit-mark.ts"
import type { RefreshOutcome } from "./oauth-credentials.ts"
import { holdMarksOnPage } from "./oauth-page-mark.ts"
import {
  TERMINAL_ALERTED_AT_KEY,
  TERMINAL_AT_KEY,
  WINDOW_TRIGGER_AT_KEY,
} from "./oauth-page-state.ts"

export type HealthMarkDeps = {
  readonly holdMark: HoldMark
}

export const LIVE_HEALTH: HealthMarkDeps = {
  holdMark: holdMarksOnPage,
}

function holdPage(
  deps: HealthMarkDeps,
  account: string,
  marks: Record<string, string | null>,
  logPrefix: string
): void {
  try {
    const outcome = deps.holdMark(account, marks)
    if (outcome.kind === "refused") {
      console.error(`${logPrefix} ${account} kept its health off its page: ${outcome.why}`)
    }
  } catch (err) {
    console.error(`${logPrefix} ${account} kept its health off its page:`, err)
  }
}

type RefreshOutcomeCategory = "ok" | "terminal" | "retryable"

function categorizeRefreshOutcome(outcome: RefreshOutcome): RefreshOutcomeCategory {
  if (outcome.ok) return "ok"
  return outcome.terminal ? "terminal" : "retryable"
}

export async function writeRefreshHealth(
  args: {
    account: string
    outcome: RefreshOutcome
    logPrefix?: string
  },
  deps: HealthMarkDeps
): Promise<void> {
  const category = categorizeRefreshOutcome(args.outcome)
  const at = new Date().toISOString()
  const logPrefix = args.logPrefix ?? "[oauth]"
  holdPage(
    deps,
    args.account,
    { [TERMINAL_AT_KEY]: category === "terminal" ? at : null },
    logPrefix
  )
}

export async function writeTerminalHealth(
  args: {
    account: string
    logPrefix?: string
  },
  deps: HealthMarkDeps
): Promise<void> {
  const at = new Date().toISOString()
  const logPrefix = args.logPrefix ?? "[oauth]"
  holdPage(deps, args.account, { [TERMINAL_AT_KEY]: at }, logPrefix)
}

export async function writeWindowTriggerHealth(
  args: {
    account: string
    logPrefix?: string
  },
  deps: HealthMarkDeps
): Promise<void> {
  const at = new Date().toISOString()
  const logPrefix = args.logPrefix ?? "[oauth]"
  holdPage(deps, args.account, { [WINDOW_TRIGGER_AT_KEY]: at }, logPrefix)
}

export async function writeTokenTerminalAlertLatch(
  args: {
    account: string
    alertedAt: string | null
    logPrefix?: string
  },
  deps: HealthMarkDeps
): Promise<void> {
  const logPrefix = args.logPrefix ?? "[oauth]"
  holdPage(deps, args.account, { [TERMINAL_ALERTED_AT_KEY]: args.alertedAt }, logPrefix)
}
