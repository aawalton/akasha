import { readFileSync } from "node:fs"

import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { accountsWithPages } from "./oauth-page-credential.ts"
import { accountPage, EXPIRES_KEY, pagesRoot } from "./oauth-page-push.ts"

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

function statedInstant(text: string, key: string): number | null {
  const stated = textField(parseFrontmatter(text), key)
  if (stated === null || stated === "") return null
  const ms = Date.parse(stated)
  return Number.isNaN(ms) ? null : ms
}

export function stateFromPageText(
  account: string,
  text: string,
  held: Record<string, unknown> | null
): PageAccountState {
  const fm = parseFrontmatter(text)
  return {
    account,
    fiveHourUtil: numberAt(held, FIVE_HOUR_USED_KEY),
    sevenDayUtil: numberAt(held, SEVEN_DAY_USED_KEY),
    sevenDayResetsAt: isoAt(held, SEVEN_DAY_RESETS_KEY),
    fiveHourResetsAt: isoAt(held, FIVE_HOUR_RESETS_KEY),
    subscriptionType: textField(fm, SUBSCRIPTION_TYPE_KEY),
    subscriptionDisabled: textField(fm, DISABLED_REASON_KEY) !== null,
    retryAfterMs: msAt(held, RETRY_AFTER_KEY) ?? statedInstant(text, RETRY_AFTER_KEY),
    terminalAtMs: statedInstant(text, TERMINAL_AT_KEY),
    terminalAlertedAtMs: statedInstant(text, TERMINAL_ALERTED_AT_KEY),
    lastWindowTriggerAtMs:
      msAt(held, WINDOW_TRIGGER_AT_KEY) ?? statedInstant(text, WINDOW_TRIGGER_AT_KEY),
    accessTokenExpiresAtMs: msAt(held, EXPIRES_KEY),
  }
}

export function accountStateFromPage(
  account: string,
  root = pagesRoot()
): PageAccountState | null {
  const at = `${root}/${accountPage(account, root)}`
  let text: string
  try {
    text = readFileSync(at, "utf8")
  } catch {
    return null
  }
  return stateFromPageText(account, text, readUncommitted(at))
}

export function statesFromPages(root = pagesRoot()): Map<string, PageAccountState> {
  const out = new Map<string, PageAccountState>()
  for (const account of accountsWithPages(root)) {
    const state = accountStateFromPage(account, root)
    if (state !== null) out.set(account, state)
  }
  return out
}

export function accountUuidsFromPages(root = pagesRoot()): Map<string, string> {
  const out = new Map<string, string>()
  for (const account of accountsWithPages(root)) {
    let text: string
    try {
      text = readFileSync(`${root}/${accountPage(account, root)}`, "utf8")
    } catch {
      continue
    }
    const uuid = textField(parseFrontmatter(text), ACCOUNT_UUID_KEY)
    if (uuid !== null) out.set(account, uuid)
  }
  return out
}

export function aliasIndexesFromPages(root = pagesRoot()): Map<string, number> {
  const out = new Map<string, number>()
  for (const account of accountsWithPages(root)) {
    let text: string
    try {
      text = readFileSync(`${root}/${accountPage(account, root)}`, "utf8")
    } catch {
      continue
    }
    const stated = textField(parseFrontmatter(text), ALIAS_INDEX_KEY)
    if (stated === null) continue
    const index = Number(stated)
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
