import { UPKEEP_PERIOD_MS, UPKEEP_RENEWAL_MARGIN_MS } from "./oauth-constants.ts"

export const USAGE_READ_KEY = "usage-read-at"

export const EXPIRY_FLOOR_MS = UPKEEP_RENEWAL_MARGIN_MS - 2 * UPKEEP_PERIOD_MS

export const USAGE_CEILING_MS = 3 * UPKEEP_PERIOD_MS

export type StallVerdict =
  | "current"
  | "expired"
  | "expiry-behind"
  | "usage-behind"
  | "never-reached"
  | "unread"

export interface AccountReading {
  readonly account: string
  readonly held: Record<string, unknown> | null
  readonly why: string | null
}

export interface StallEntry {
  readonly account: string
  readonly verdict: StallVerdict
  readonly detail: string
}

export interface UpkeepStall {
  readonly pages: number
  readonly judged: number
  readonly current: number
  readonly stalled: readonly string[]
  readonly unread: readonly string[]
  readonly entries: readonly StallEntry[]
}

function hoursOf(ms: number): string {
  return `${(ms / (60 * 60 * 1000)).toFixed(1)}h`
}

type Stamp = { readonly at: number } | { readonly absent: true } | { readonly why: string }

function stampAt(held: Record<string, unknown>, key: string): Stamp {
  const raw = held[key]
  if (raw === undefined || raw === null) return { absent: true }
  if (typeof raw !== "string") return { why: `${key} is held as ${typeof raw}, not a timestamp` }
  const at = Date.parse(raw)
  if (Number.isNaN(at)) return { why: `${key} is held as '${raw}', which is not a timestamp` }
  return { at }
}

export function judgeAccount(
  reading: AccountReading,
  nowMs: number,
  expiresKey: string
): StallEntry {
  const { account } = reading
  if (reading.why !== null) return { account, verdict: "unread", detail: reading.why }
  if (reading.held === null) {
    return { account, verdict: "unread", detail: "nothing was held to look at" }
  }

  const expiry = stampAt(reading.held, expiresKey)
  const usage = stampAt(reading.held, USAGE_READ_KEY)

  if ("why" in expiry) return { account, verdict: "unread", detail: expiry.why }
  if ("why" in usage) return { account, verdict: "unread", detail: usage.why }

  if ("absent" in expiry && "absent" in usage) {
    return {
      account,
      verdict: "never-reached",
      detail: `holds neither ${expiresKey} nor ${USAGE_READ_KEY}, so upkeep has never reached it`,
    }
  }

  if ("absent" in expiry) {
    return {
      account,
      verdict: "expiry-behind",
      detail: `holds no ${expiresKey}, so nothing here says its token was ever renewed`,
    }
  }

  const life = expiry.at - nowMs
  if (life <= 0) {
    return {
      account,
      verdict: "expired",
      detail: `its token expired ${hoursOf(-life)} ago and upkeep is the only thing that renews one`,
    }
  }
  if (life < EXPIRY_FLOOR_MS) {
    return {
      account,
      verdict: "expiry-behind",
      detail: `${hoursOf(life)} of token life left, under the ${hoursOf(EXPIRY_FLOOR_MS)} floor upkeep's own margin and period set`,
    }
  }

  if ("absent" in usage) {
    return {
      account,
      verdict: "usage-behind",
      detail: `holds no ${USAGE_READ_KEY}, so its eligibility stands on nothing upkeep read`,
    }
  }
  const since = nowMs - usage.at
  if (since > USAGE_CEILING_MS) {
    return {
      account,
      verdict: "usage-behind",
      detail: `its usage was read ${hoursOf(since)} ago, past the ${hoursOf(USAGE_CEILING_MS)} ceiling, so its eligibility is frozen at whatever it then held`,
    }
  }

  return {
    account,
    verdict: "current",
    detail: `${hoursOf(life)} of token life left, usage read ${hoursOf(since)} ago`,
  }
}

export function stallAcross(
  readings: readonly AccountReading[],
  nowMs: number,
  expiresKey: string
): UpkeepStall {
  const entries = readings.map((one) => judgeAccount(one, nowMs, expiresKey))
  const unread = entries.filter((one) => one.verdict === "unread").map((one) => one.account)
  const stalled = entries
    .filter((one) => one.verdict !== "current" && one.verdict !== "unread")
    .map((one) => one.account)
  return {
    pages: readings.length,
    judged: entries.length - unread.length,
    current: entries.filter((one) => one.verdict === "current").length,
    stalled,
    unread,
    entries,
  }
}

export function stallLines(stall: UpkeepStall): readonly string[] {
  const lines = stall.entries.map((one) => `${one.account}: ${one.verdict} — ${one.detail}`)
  lines.push(
    `${stall.current} of ${stall.pages} account page(s) current; ` +
      `${stall.stalled.length} behind upkeep, ${stall.unread.length} could not be looked at`
  )
  return lines
}
