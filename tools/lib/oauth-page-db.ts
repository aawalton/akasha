import { accountsWithPages, readCredentialFromPage } from "./oauth-page-credential.ts"
import { type PagePush, pushCredentialToPage } from "./oauth-page-push.ts"
import {
  accountStateFromPage,
  type PageAccountState,
  statesFromPages,
} from "./oauth-page-state.ts"
import type { AccountState, CredentialDoc } from "./oauth-types.ts"

export interface CredentialDb extends CredentialStore {
  readonly getAllCredentials: () => Promise<CredentialDoc[]>
  readonly getClaudeAccountPacing: () => Promise<Map<string, AccountState>>
}


export interface CredentialStore {
  readonly getCredential: (account: string) => Promise<CredentialDoc | null>
  readonly updateTokenIfNewer: (args: {
    account: string
    accessToken: string
    refreshToken: string
    expiresAt: number
  }) => Promise<void>
}

export function credentialDocFromPage(
  account: string,
  logPrefix = "[oauth]"
): CredentialDoc | null {
  const held = readCredentialFromPage(account)
  if (held.kind === "absent") {
    console.error(`${logPrefix} ${account} could not be read off its page: ${held.why}`)
    return null
  }
  const state = accountStateFromPage(account)
  return {
    ...held.credential,
    subscriptionDisabled: state?.subscriptionDisabled ?? false,
    terminalAlertedAt: state?.terminalAlertedAtMs ?? null,
  }
}

export function allCredentialDocsFromPages(logPrefix = "[oauth]"): CredentialDoc[] {
  const out: CredentialDoc[] = []
  for (const account of accountsWithPages()) {
    const doc = credentialDocFromPage(account, logPrefix)
    if (doc !== null) out.push(doc)
  }
  return out
}

export function saidOf(outcome: PagePush): string {
  if (outcome.kind === "pushed") return `${outcome.account}: ${outcome.digests.join(", ")}`
  if (outcome.kind === "unchanged") return `${outcome.account}: page already held it`
  return `${outcome.account}: ${outcome.why}`
}

export function pageCredentialStore(logPrefix = "[oauth]"): CredentialStore {
  return {
    getCredential: async (account: string) => credentialDocFromPage(account, logPrefix),
    updateTokenIfNewer: async (args) => {
      const outcome = pushCredentialToPage(args)
      if (outcome.kind === "stale") return
      if (outcome.kind === "refused" || outcome.kind === "skipped") {
        throw new Error(`${logPrefix} the credential did not reach its page — ${saidOf(outcome)}`)
      }
    },
  }
}

export function instantOf(held: string | null): string | null {
  if (held === null) return null
  const at = Date.parse(held)
  return Number.isNaN(at) ? null : new Date(at).toISOString()
}

export function accountStateFrom(held: PageAccountState): AccountState {
  return {
    account: held.account,
    fiveHourUtil: held.fiveHourUtil,
    sevenDayUtil: held.sevenDayUtil,
    sevenDayResetsAt: instantOf(held.sevenDayResetsAt),
    fiveHourResetsAt: instantOf(held.fiveHourResetsAt),
    subscriptionType: held.subscriptionType,
    subscriptionDisabled: held.subscriptionDisabled,
    fiveHourAtLimitUntil: held.retryAfterMs,
    renewalTerminal: held.terminalAtMs !== null,
    accessTokenExpiresAt: held.accessTokenExpiresAtMs,
  }
}

export function pacingFromPages(): Map<string, AccountState> {
  const out = new Map<string, AccountState>()
  for (const [account, held] of statesFromPages()) {
    out.set(account, accountStateFrom(held))
  }
  return out
}

export function pageCredentialDb(logPrefix = "[oauth]"): CredentialDb {
  return {
    ...pageCredentialStore(logPrefix),
    getAllCredentials: async () => allCredentialDocsFromPages(logPrefix),
    getClaudeAccountPacing: async () => pacingFromPages(),
  }
}
