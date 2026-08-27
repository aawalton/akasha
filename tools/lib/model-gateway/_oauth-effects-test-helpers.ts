import type { OAuthEffects } from "../oauth-effects.ts"

const unreachable = (member: string): never => {
  throw new Error(`OAuthEffects.${member} was called by a test that did not script it`)
}

export function fakeOAuthEffects(overrides: Partial<OAuthEffects> = {}): OAuthEffects {
  return {
    getBestCredential: () => unreachable("getBestCredential"),
    getCredentialByAccount: () => unreachable("getCredentialByAccount"),
    markAccountAtLimit: () => unreachable("markAccountAtLimit"),
    repollUsageAfter429: () => unreachable("repollUsageAfter429"),
    getClaudeAccountPacing: () => unreachable("getClaudeAccountPacing"),
    markAccountSubscriptionDisabled: () => unreachable("markAccountSubscriptionDisabled"),
    clearAccountSubscriptionDisabled: () => unreachable("clearAccountSubscriptionDisabled"),
    ...overrides,
  }
}
