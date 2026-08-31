import {
  akashaAccountBeside,
  akashaAccounts,
  akashaAccountValues,
} from "./claude-account-akasha.ts"
import { EXPIRES_KEY } from "./oauth-page-push.ts"

export const FIVE_HOUR_USED_KEY = "five-hour-percent-used"

export const SEVEN_DAY_USED_KEY = "seven-day-percent-used"

export const FIVE_HOUR_RESETS_KEY = "five-hour-resets-at"

export const SEVEN_DAY_RESETS_KEY = "seven-day-resets-at"

export const SUBSCRIPTION_TYPE_KEY = "subscription-type"

export const DISABLED_REASON_KEY = "subscription-disabled-reason"

export const RETRY_AFTER_KEY = "retry-after"

export const TERMINAL_AT_KEY = "terminal-at"

export const WINDOW_TRIGGER_AT_KEY = "last-window-trigger-at"

export const TERMINAL_ALERTED_AT_KEY = "terminal-alerted-at"

export const ACCOUNT_UUID_KEY = "account-uuid"

export const ALIAS_INDEX_KEY = "alias-index"

export interface PageAccountState {
  readonly account: string
  readonly fiveHourUtil: number
  readonly sevenDayUtil: number
  readonly sevenDayResetsAt: string | null
  readonly fiveHourResetsAt: string | null
  readonly subscriptionType: string | null
  readonly subscriptionDisabled: boolean
  readonly retryAfterMs: number | null
  readonly terminalAtMs: number | null
  readonly terminalAlertedAtMs: number | null
  readonly lastWindowTriggerAtMs: number | null
  readonly accessTokenExpiresAtMs: number | null
}

function numberAt(held: Record<string, unknown> | null, key: string): number {
  const stated = held?.[key]
  return typeof stated === "number" && Number.isFinite(stated) ? stated : 0
}

function isoAt(held: Record<string, unknown> | null, key: string): string | null {
  const stated = held?.[key]
  if (typeof stated !== "string" || stated === "") return null
  return Number.isNaN(Date.parse(stated)) ? null : stated
}

function msAt(held: Record<string, unknown> | null, key: string): number | null {
  const stated = isoAt(held, key)
  return stated === null ? null : Date.parse(stated)
}

function textOf(stated: Record<string, unknown> | null, key: string): string | null {
  const said = stated?.[key]
  return typeof said === "string" && said !== "" ? said : null
}

// What a pass needs to know about an account: what it states, and what was last observed of it.
//
// Every reading now comes from beside the page. They stood in the page body while the account was
// a markdown file, and a mark carrying one landed a commit; they are readings rather than anything
// the account states, so they moved in with the rest of what is observed.
export function stateFrom(
  account: string,
  stated: Record<string, unknown> | null,
  held: Record<string, unknown> | null
): PageAccountState {
  return {
    account,
    fiveHourUtil: numberAt(held, FIVE_HOUR_USED_KEY),
    sevenDayUtil: numberAt(held, SEVEN_DAY_USED_KEY),
    sevenDayResetsAt: isoAt(held, SEVEN_DAY_RESETS_KEY),
    fiveHourResetsAt: isoAt(held, FIVE_HOUR_RESETS_KEY),
    subscriptionType: textOf(stated, SUBSCRIPTION_TYPE_KEY),
    subscriptionDisabled: textOf(held, DISABLED_REASON_KEY) !== null,
    retryAfterMs: msAt(held, RETRY_AFTER_KEY),
    terminalAtMs: msAt(held, TERMINAL_AT_KEY),
    terminalAlertedAtMs: msAt(held, TERMINAL_ALERTED_AT_KEY),
    lastWindowTriggerAtMs: msAt(held, WINDOW_TRIGGER_AT_KEY),
    accessTokenExpiresAtMs: msAt(held, EXPIRES_KEY),
  }
}

export function accountStateFromPage(account: string): PageAccountState | null {
  const stated = akashaAccountValues(account)
  if (stated === null) return null
  return stateFrom(account, stated, akashaAccountBeside(account))
}

export function statesFromPages(): Map<string, PageAccountState> {
  const out = new Map<string, PageAccountState>()
  for (const account of akashaAccounts()) {
    const state = accountStateFromPage(account)
    if (state !== null) out.set(account, state)
  }
  return out
}

export function accountUuidsFromPages(): Map<string, string> {
  const out = new Map<string, string>()
  for (const account of akashaAccounts()) {
    const uuid = textOf(akashaAccountValues(account), ACCOUNT_UUID_KEY)
    if (uuid !== null) out.set(account, uuid)
  }
  return out
}

export function aliasIndexesFromPages(): Map<string, number> {
  const out = new Map<string, number>()
  for (const account of akashaAccounts()) {
    const said = akashaAccountValues(account)?.[ALIAS_INDEX_KEY]
    const index = typeof said === "number" ? said : Number(said)
    if (Number.isInteger(index)) out.set(account, index)
  }
  return out
}

export function lastWindowTriggerAcross(
  states: Iterable<PageAccountState>
): number | null {
  let latest: number | null = null
  for (const state of states) {
    const at = state.lastWindowTriggerAtMs
    if (at !== null && (latest === null || at > latest)) latest = at
  }
  return latest
}
