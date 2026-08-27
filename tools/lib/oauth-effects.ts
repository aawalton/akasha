
import { getBestCredential, getCredentialByAccount } from "./oauth-credentials.ts"
import { credentialByAccountFromPage } from "./oauth-page-credential.ts"
import { pacingFromPages } from "./oauth-page-db.ts"
import {
  clearAccountSubscriptionDisabled,
  markAccountSubscriptionDisabled,
} from "./oauth-subscription-disabled.ts"
import { markAccountAtLimit, repollUsageAfter429 } from "./oauth-usage.ts"
import type { AccountState } from "./oauth-types.ts"

export type OAuthEffects = {
  readonly getBestCredential: typeof getBestCredential
  readonly getCredentialByAccount: typeof getCredentialByAccount
  readonly markAccountAtLimit: typeof markAccountAtLimit
  readonly repollUsageAfter429: typeof repollUsageAfter429
  readonly getClaudeAccountPacing: () => Promise<Map<string, AccountState>>
  readonly markAccountSubscriptionDisabled: typeof markAccountSubscriptionDisabled
  readonly clearAccountSubscriptionDisabled: typeof clearAccountSubscriptionDisabled
}

export const realOAuthEffects: OAuthEffects = {
  getBestCredential,
  getCredentialByAccount: async (account: string, logPrefix?: string) =>
    credentialByAccountFromPage(account, logPrefix),
  markAccountAtLimit,
  repollUsageAfter429,
  getClaudeAccountPacing: async () => pacingFromPages(),
  markAccountSubscriptionDisabled,
  clearAccountSubscriptionDisabled,
}
