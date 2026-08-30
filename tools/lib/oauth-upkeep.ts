
import {
  writeRefreshHealth,
  LIVE_HEALTH,
  writeTokenTerminalAlertLatch,
  writeWindowTriggerHealth,
} from "./oauth-account-health.ts"
import { USAGE_URL, UPKEEP_RENEWAL_MARGIN_MS } from "./oauth-constants.ts"
import { type RefreshOutcome, refreshOAuthTokenWithOutcome } from "./oauth-credentials.ts"
import { allCredentialDocsFromPages } from "./oauth-page-db.ts"
import { accountDirIn, pagesRoot } from "./oauth-page-push.ts"
import { decideTokenTerminalAlert } from "./oauth-token-terminal-alert.ts"
import type { CredentialDoc } from "./oauth-types.ts"
import { parseUsageResponse, pushPacingToPage, type UsageResponse } from "./oauth-usage.ts"

const MESSAGES_URL = "https://api.anthropic.com/v1/messages"
const HAIKU_MODEL = "claude-haiku-4-5-20251001"
const USER_AGENT = "claude-code/2.1.63"
const ANTHROPIC_BETA = "oauth-2025-04-20"
const ANTHROPIC_VERSION = "2023-06-01"
const HTTP_TIMEOUT_MS = 10_000

export const INTER_ACCOUNT_DELAY_MS = 60_000

export const RETRY_BACKOFF_MS = [10_000, 30_000] as const

export function shouldTriggerWindow(usage: UsageResponse, now: Date = new Date()): boolean {
  const fiveHr = parseTimestamp(usage.five_hour?.resets_at ?? null)
  const sevenDay = parseTimestamp(usage.seven_day?.resets_at ?? null)
  const fiveHrInactive = fiveHr === null || fiveHr.getTime() <= now.getTime()
  const sevenDayInactive = sevenDay === null || sevenDay.getTime() <= now.getTime()
  return fiveHrInactive || sevenDayInactive
}

function parseTimestamp(iso: string | null): Date | null {
  if (iso === null || iso === "") return null
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : d
}

export function sortAccountsAlpha<T extends { account: string }>(
  creds: readonly T[]
): readonly T[] {
  return [...creds].sort((a, b) => a.account.localeCompare(b.account))
}

class RateLimitError extends Error {
  constructor(public readonly url: string) {
    super(`Rate limited (429): ${url}`)
    this.name = "RateLimitError"
  }
}

export async function fetchWith429Retry<T>(
  op: () => Promise<T>,
  log: string,
  label: string,
  backoffMs: readonly number[] = RETRY_BACKOFF_MS,
  sleep: (ms: number) => Promise<void> = defaultSleep
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await op()
    } catch (err) {
      if (!(err instanceof RateLimitError)) throw err
      if (attempt >= backoffMs.length) {
        throw err
      }
      const wait = backoffMs[attempt] ?? 0
      console.warn(
        `${log} ${label} rate-limited; backing off ${wait}ms before retry ${attempt + 1}/${backoffMs.length}`
      )
      await sleep(wait)
    }
  }
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchUsageOrThrow(accessToken: string): Promise<UsageResponse> {
  const res = await fetch(USAGE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      "anthropic-beta": ANTHROPIC_BETA,
    },
    signal: AbortSignal.timeout(HTTP_TIMEOUT_MS),
  })
  if (res.status === 429) throw new RateLimitError(USAGE_URL)
  if (!res.ok) throw new Error(`Usage fetch failed: ${res.status}`)
  return parseUsageResponse(await res.json())
}

export async function triggerWindowSession(
  accessToken: string
): Promise<{ ok: true } | { ok: false; status: number }> {
  const res = await fetch(MESSAGES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      "anthropic-beta": ANTHROPIC_BETA,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: HAIKU_MODEL,
      max_tokens: 1,
      messages: [{ role: "user", content: "." }],
    }),
    signal: AbortSignal.timeout(HTTP_TIMEOUT_MS),
  })
  if (res.status === 429) throw new RateLimitError(MESSAGES_URL)
  if (res.status !== 200) return { ok: false, status: res.status }
  return { ok: true }
}

async function maybeAlertTokenTerminal(
  cred: CredentialDoc,
  outcome: RefreshOutcome,
  log: string
): Promise<void> {
  const action = decideTokenTerminalAlert({
    refreshTerminal: !outcome.ok && outcome.terminal,
    refreshOk: outcome.ok,
    accessTokenExpiresAtMs: cred.expiresAt,
    alreadyAlertedAtMs: cred.terminalAlertedAt ?? null,
    nowMs: Date.now(),
  })
  if (action === "alert") {
    const code = outcome.ok ? null : (outcome.code ?? null)
    const description = outcome.ok ? null : (outcome.description ?? null)
    console.error(
      `${log} ${cred.account}: token TERMINAL (refresh dead + access expired) (code=${code ?? "unknown"})`
    )
    await writeTokenTerminalAlertLatch(
      { account: cred.account, alertedAt: new Date().toISOString(), logPrefix: log },
      LIVE_HEALTH
    )
    return
  }
  if (action === "clear-latch") {
    console.log(`${log} ${cred.account}: token re-authed — clearing terminal alert latch`)
    await writeTokenTerminalAlertLatch(
      { account: cred.account, alertedAt: null, logPrefix: log },
      LIVE_HEALTH
    )
  }
}

export async function runUpkeepPassForAccount(cred: CredentialDoc, log: string): Promise<void> {
  if (cred.subscriptionDisabled === true || cred.subscriptionDisabledAt != null) {
    console.log(`${log} ${cred.account}: subscription withdrawn; skipping tick`)
    return
  }
  const outcome = await refreshOAuthTokenWithOutcome(
    cred.account,
    log,
    undefined,
    UPKEEP_RENEWAL_MARGIN_MS
  )
  await writeRefreshHealth({ account: cred.account, outcome, logPrefix: log }, LIVE_HEALTH)
  await maybeAlertTokenTerminal(cred, outcome, log)
  if (!outcome.ok) {
    console.error(`${log} ${cred.account}: token refresh failed; skipping`)
    return
  }
  const accessToken = outcome.credential.accessToken

  let usage: UsageResponse
  try {
    usage = await fetchWith429Retry(
      () => fetchUsageOrThrow(accessToken),
      log,
      `${cred.account} usage fetch`
    )
  } catch (err) {
    console.error(`${log} ${cred.account}: usage fetch failed:`, err)
    return
  }

  if (shouldTriggerWindow(usage)) {
    try {
      const ping = await fetchWith429Retry(
        () => triggerWindowSession(accessToken),
        log,
        `${cred.account} window trigger ping`
      )
      if (!ping.ok) {
        console.warn(`${log} ${cred.account}: ping returned status=${ping.status}`)
      } else {
        usage = await fetchWith429Retry(
          () => fetchUsageOrThrow(accessToken),
          log,
          `${cred.account} post-ping usage fetch`
        )
      }
    } catch (err) {
      console.error(`${log} ${cred.account}: window trigger failed:`, err)
    }
    await writeWindowTriggerHealth({ account: cred.account, logPrefix: log }, LIVE_HEALTH)
  }

  await pushPacingToPage(cred.account, usage, log)
}

export async function runUpkeepPass(
  log = "[upkeep]",
  sleep: (ms: number) => Promise<void> = defaultSleep
): Promise<void> {
  const creds = allCredentialDocsFromPages()
  const sorted = sortAccountsAlpha(creds)
  if (sorted.length === 0) {
    // Renewing a token happens here and nowhere else, so a pass over no accounts renews nothing
    // in the whole fleet. Answering that as a done tick would read healthy while every token
    // ages out, and the tokens would be the first thing to say so, hours later and all at once.
    throw new Error(
      `no claude-account pages stand under ${accountDirIn(pagesRoot())}, and renewing a token ` +
        `happens here and nowhere else, so a pass over none of them is a failure rather than a quiet success`
    )
  }
  console.log(`${log} starting tick for ${sorted.length} accounts`)
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0) await sleep(INTER_ACCOUNT_DELAY_MS)
    const cred = sorted[i]
    if (!cred) continue
    console.log(`${log} ${i + 1}/${sorted.length} ${cred.account}`)
    await runUpkeepPassForAccount(cred, log)
  }
  console.log(`${log} tick complete`)
}

export { RateLimitError }
