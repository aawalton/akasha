import type { CredentialPick, OAuthCredential } from "../lib/oauth-types.ts"
import type { AccountResolutionDeps } from "../lib/supervisor-agent.ts"

export interface Write {
  configDir: string
  account: string
}

export const freshCred = (account: string): OAuthCredential => ({
  account,
  accessToken: "fresh-access",
  refreshToken: "fresh-refresh",
  expiresAt: Date.now() + 60 * 60 * 1000,
  scopes: [],
  subscriptionType: null,
  rateLimitTier: null,
})

export const expiringCred = (account: string): OAuthCredential => ({
  account,
  accessToken: "expiring-access",
  refreshToken: "expiring-refresh",
  expiresAt: Date.now() + 60 * 1000,
  scopes: [],
  subscriptionType: null,
  rateLimitTier: null,
})

export const staleCred = (account: string): OAuthCredential => ({
  account,
  accessToken: "stale-access",
  refreshToken: "stale-refresh",
  expiresAt: Date.now() - 60 * 1000,
  scopes: [],
  subscriptionType: null,
  rateLimitTier: null,
})

export const credPick = (account: string): CredentialPick => ({
  credential: freshCred(account),
  fiveHourResetsAtMs: Date.now() + 60 * 60 * 1000,
})

export function makeDeps(
  writes: Write[],
  overrides: Partial<AccountResolutionDeps> = {}
): AccountResolutionDeps {
  return {
    getCredentialByAccount: async () => null,
    getBestCredential: async () => null,
    writeCredentialFile: (configDir: string, cred: OAuthCredential) => {
      writes.push({ configDir, account: cred.account })
    },
    configDirForAccount: (account: string) => `/home/test/.claude/accounts/${account}`,
    claudeAccountPageExists: async () => true,
    log: "[test]",
    ...overrides,
  }
}
