import { shape } from "../shape.ts"
import { Shape } from "../shape-core.ts"
import { DEFAULT_DOWNSTREAM_KEEPALIVE_MS } from "./keepalive.ts"

function preprocess<T>(change: (value: unknown) => unknown, inner: Shape<T>): Shape<T> {
  return Shape((value, path) => inner.run(change(value), path), inner.acceptsAbsent)
}

const blankIsAbsent = (value: unknown): unknown =>
  typeof value === "string" && value.trim() === "" ? undefined : value

const NonEmptyString = shape.string().min(1)

const PortInt = shape.coerce.number().int().min(0).max(65535).default(0)

export const DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS = 600_000

const IdleTimeoutMs = preprocess(
  blankIsAbsent,
  shape.coerce
    .number()
    .int()
    .min(0)
    .catch(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
    .default(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
)

const KeepaliveMs = preprocess(
  blankIsAbsent,
  shape.coerce
    .number()
    .int()
    .min(0)
    .catch(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
    .default(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
)

const BootEnvShape = shape.object({
  OAUTH_PROXY_AGENT_ID: NonEmptyString,
  OAUTH_PROXY_LOG_DIR: NonEmptyString,
  OAUTH_PROXY_REGISTRATION_ACCOUNT: NonEmptyString,
  OAUTH_PROXY_VERSION: NonEmptyString.default("unknown"),
  OAUTH_PROXY_PORT: PortInt,
  OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: IdleTimeoutMs,
  OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: KeepaliveMs,
})

export type OAuthProxyBootEnv = {
  agentId: string
  logDir: string
  registrationAccount: string
  oauthProxyVersion: string
  port: number
  upstreamIdleTimeoutMs: number
  downstreamKeepaliveMs: number
}

export function parseBootEnv(env: NodeJS.ProcessEnv): OAuthProxyBootEnv {
  const result = BootEnvShape.safeParse(env)
  if (!result.success) {
    const keys = result.error.issues
      .map((issue) => issue.path.join("."))
      .filter((k) => k.length > 0)
    const unique = [...new Set(keys)]
    const list = unique.length > 0 ? unique.join(", ") : "(unknown)"
    throw new Error(`oauth-proxy boot env invalid — missing/invalid key(s): ${list}`)
  }
  return {
    agentId: result.data.OAUTH_PROXY_AGENT_ID,
    logDir: result.data.OAUTH_PROXY_LOG_DIR,
    registrationAccount: result.data.OAUTH_PROXY_REGISTRATION_ACCOUNT,
    oauthProxyVersion: result.data.OAUTH_PROXY_VERSION,
    port: result.data.OAUTH_PROXY_PORT,
    upstreamIdleTimeoutMs: result.data.OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS,
    downstreamKeepaliveMs: result.data.OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS,
  }
}
