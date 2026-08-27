import { fakeOAuthEffects } from "../lib/model-gateway/_oauth-effects-test-helpers.ts"
import type { Forward } from "../lib/model-gateway/forward.ts"
import type { ObserverSlot } from "../lib/model-gateway/observer-slot.ts"
import { runPickPipeline } from "../lib/model-gateway/pick-pipeline.ts"

export { runPickPipeline }
import type { PickPipelineDeps } from "../lib/model-gateway/pick-pipeline-types.ts"
import { shape } from "../lib/shape.ts"
import { type Infer } from "../lib/shape-core"

export const OVERAGE_REJECTED_HEADERS = {
  "anthropic-ratelimit-unified-overage-status": "rejected",
  "anthropic-ratelimit-unified-overage-disabled-reason": "org_level_disabled",
  "anthropic-ratelimit-unified-5h-status": "allowed",
  "anthropic-ratelimit-unified-5h-utilization": "0.07",
  "anthropic-ratelimit-unified-7d-status": "allowed",
  "anthropic-ratelimit-unified-7d-utilization": "0.06",
}

export const CAPACITY_HEADERS = {
  "anthropic-ratelimit-unified-5h-status": "rejected",
  "anthropic-ratelimit-unified-5h-utilization": "100",
  "anthropic-ratelimit-unified-7d-status": "allowed",
  "retry-after": "120",
}

export const RATE_LIMIT_BODY = JSON.stringify({
  type: "error",
  error: { type: "rate_limit_error", message: "rate limit" },
})

export const LIVE_OVERAGE_REFUSAL_HEADERS = {
  "anthropic-ratelimit-unified-overage-disabled-reason": "org_level_disabled",
}

export const LIVE_OVERAGE_REFUSAL_BODY = JSON.stringify({
  type: "error",
  error: { type: "rate_limit_error", message: "Usage credits are required for fast mode." },
})

export const LIVE_GENUINE_CAP_HEADERS = {
  "anthropic-ratelimit-unified-5h-status": "allowed",
  "anthropic-ratelimit-unified-7d-status": "rejected",
  "anthropic-ratelimit-unified-7d-utilization": "1.0",
  "anthropic-ratelimit-unified-overage-disabled-reason": "out_of_credits",
  "retry-after": "361112",
}

export function toBuffer(value: unknown): ArrayBuffer {
  const encoded = new TextEncoder().encode(JSON.stringify(value))
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}

export function fastModeRequest(): Request {
  return new Request("http://localhost/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-beta": "oauth-2025-04-20,fast-mode-2026-02-01",
      "content-type": "application/json",
    },
  })
}

export const FAST_BODY = { model: "claude-opus-5", max_tokens: 100, speed: "fast", messages: [] }

export const CRED = {
  account: "acct-a",
  accessToken: "tok",
  refreshToken: "r",
  expiresAt: Date.now() + 3_600_000,
  scopes: [],
  subscriptionType: "max",
  rateLimitTier: null,
}

const ForwardedBodySchema = shape.looseObject({
  speed: shape.string().optional(),
  model: shape.string().optional(),
})

export type ForwardCall = {
  readonly beta: string | null
  readonly body: Infer<typeof ForwardedBodySchema> | null
}

export function buildDeps(args: {
  readonly responses: readonly Response[]
  readonly record: (call: ForwardCall) => void
  readonly effects?: Parameters<typeof fakeOAuthEffects>[0]
  readonly accounts?: readonly string[]
}): PickPipelineDeps {
  const accounts = args.accounts ?? ["acct-a"]
  const queue = [...args.responses]
  const forward: Forward = async (incoming, _token, bodyBuffer) => {
    args.record({
      beta: incoming.headers.get("anthropic-beta"),
      body:
        bodyBuffer == null
          ? null
          : ForwardedBodySchema.parse(JSON.parse(new TextDecoder().decode(bodyBuffer))),
    })
    const next = queue.shift()
    if (next == null) throw new Error("forward called more times than the test scripted")
    return next
  }
  return {
    logPrefix: "[test]",
    pickAccount: async (exclude) => {
      const excluded =
        exclude == null
          ? new Set<string>()
          : typeof exclude === "string"
            ? new Set([exclude])
            : exclude
      const candidate = accounts.filter((a) => !excluded.has(a))[0]
      return candidate == null ? null : { account: candidate }
    },
    getFreshToken: async (account) => ({ ...CRED, account }),
    forward,
    oauth: fakeOAuthEffects(args.effects),
  }
}

export function emptySlot(): ObserverSlot {
  return { current: null, endInFlight: undefined }
}

export function plainRequest(): Request {
  return new Request("http://localhost/v1/messages", {
    method: "POST",
    headers: { "anthropic-beta": "oauth-2025-04-20", "content-type": "application/json" },
  })
}

export const PLAIN_BODY = { model: "claude-opus-5", max_tokens: 100, messages: [] }

export async function run(deps: PickPipelineDeps, body: unknown = FAST_BODY) {
  return runPickPipeline({
    req: fastModeRequest(),
    observerSlot: emptySlot(),
    originalBody: toBuffer(body),
    method: "POST",
    pathname: "/v1/messages",
    deps,
  })
}


export async function runPlain(deps: PickPipelineDeps, body: unknown = PLAIN_BODY) {
  return runPickPipeline({
    req: plainRequest(),
    observerSlot: emptySlot(),
    originalBody: toBuffer(body),
    method: "POST",
    pathname: "/v1/messages",
    deps,
  })
}

export async function runBare(deps: PickPipelineDeps, body: unknown) {
  return runPickPipeline({
    req: new Request("http://localhost/v1/messages", { method: "POST" }),
    observerSlot: emptySlot(),
    originalBody: toBuffer(body),
    method: "POST",
    pathname: "/v1/messages",
    deps,
  })
}
