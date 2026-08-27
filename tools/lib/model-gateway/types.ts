import type { RefreshOutcome } from "../oauth-credentials.ts"
import type { OAuthEffects } from "../oauth-effects.ts"

export type OAuthProxy = {
  port: number
  stop: () => void
  flushAll: (reason: string) => undefined
}

export type StartOAuthProxyOptions = {
  logPrefix?: string
  port: number
  onRefreshOutcome?: (account: string, outcome: RefreshOutcome) => void
  isAccountTerminal?: (account: string) => boolean
  getLogDir?: () => string
  upstreamIdleTimeoutMs?: number
  downstreamKeepaliveMs?: number
  unixSocketPath?: string
  oauth?: OAuthEffects
}
