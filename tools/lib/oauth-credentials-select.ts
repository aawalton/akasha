
import { selectAccount } from "./oauth-selection.ts"
import type { AccountState, CredentialDoc } from "./oauth-types.ts"

export function selectBestAccount(
  allCreds: readonly CredentialDoc[],
  pacingMap: ReadonlyMap<string, AccountState>,
  now: number,
  excludes: ReadonlySet<string> = new Set()
): { cred: CredentialDoc; state: AccountState } | null {
  const pool = allCreds
    .filter((cred) => !excludes.has(cred.account))
    .map((cred) => ({
      cred,
      state:
        pacingMap.get(cred.account) ?? defaultState(cred.account, cred.subscriptionType ?? null),
    }))
  const picked = selectAccount(
    pool.map((p) => p.state),
    now
  )
  if (!picked) return null
  return pool.find((p) => p.state.account === picked.account) ?? null
}

function defaultState(account: string, subscriptionType: string | null): AccountState {
  return {
    account,
    fiveHourUtil: 0,
    sevenDayUtil: 0,
    sevenDayResetsAt: null,
    fiveHourResetsAt: null,
    subscriptionDisabled: false,
    fiveHourAtLimitUntil: null,
    subscriptionType,
    renewalTerminal: false,
    accessTokenExpiresAt: null,
  }
}

export function parseFutureIsoMs(iso: string | null, now: number): number | null {
  if (iso == null) return null
  const ms = new Date(iso).getTime()
  if (Number.isNaN(ms)) return null
  return ms > now ? ms : null
}
