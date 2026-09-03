import type { OAuthEffects } from "../oauth-effects.ts"

export type OAuthProxy = {
  port: number
  stop: () => void
  flushAll: (reason: string) => undefined
}

export type StartOAuthProxyOptions = {
  logPrefix?: string
  port: number
  getLogDir?: () => string
  upstreamIdleTimeoutMs?: number
  downstreamKeepaliveMs?: number
  unixSocketPath?: string
  oauth?: OAuthEffects
}
