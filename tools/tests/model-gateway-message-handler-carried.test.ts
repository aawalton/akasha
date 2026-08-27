import { describe, expect, test } from "bun:test"
import { fakeOAuthEffects } from "../lib/model-gateway/_oauth-effects-test-helpers.ts"
import type { PickAccount } from "../lib/model-gateway/account-picker.ts"
import { buildMessageHandler } from "../lib/model-gateway/message-handler.ts"
import type { ObserverSlot } from "../lib/model-gateway/observer-slot.ts"
import type { OAuthCredential } from "../lib/oauth-types.ts"
import { shape } from "../lib/shape.ts"

function makeCred(account: string): OAuthCredential {
  return {
    account,
    accessToken: `token-${account}`,
    refreshToken: "refresh",
    expiresAt: Date.now() + 60 * 60_000,
    scopes: [],
    subscriptionType: "max",
    rateLimitTier: null,
  }
}

const BodyModelSchema = shape.looseObject({ model: shape.string().optional() })

function bodyModel(bodyBuffer: ArrayBuffer | null): string | null {
  if (bodyBuffer == null) return null
  try {
    const parsed = BodyModelSchema.safeParse(JSON.parse(new TextDecoder().decode(bodyBuffer)))
    return parsed.success ? (parsed.data.model ?? null) : null
  } catch {
    return null
  }
}

const EXTENDED_MODEL = "claude-opus-4-8[1m]"
const BASE_MODEL = "claude-opus-4-8"

function makePickAccount(): PickAccount {
  return async (exclude) => {
    const excluded =
      exclude == null
        ? new Set<string>()
        : typeof exclude === "string"
          ? new Set([exclude])
          : exclude
    for (const account of ["opus-1", "opus-2"]) {
      if (!excluded.has(account)) return { account }
    }
    return null
  }
}

const okJson = (): Response =>
  new Response('{"type":"message","role":"assistant"}', {
    status: 200,
    headers: { "content-type": "application/json" },
  })

describe("404 extended-context [1m] downshift (message-handler)", () => {
  test("a [1m] model 404 → base-sibling 200 replayed on the SAME account, no pool walk", async () => {
    const forwarded: { account: string | null; model: string | null }[] = []

    const handler = buildMessageHandler({
      logPrefix: "[1m-test]",
      pickAccount: makePickAccount(),
      getFreshToken: async (account: string) => makeCred(account),
      oauth: fakeOAuthEffects(),
      forward: async (_incoming, _accessToken, bodyBuffer, account, _slot) => {
        const model = bodyModel(bodyBuffer)
        forwarded.push({ account, model })
        if (model === EXTENDED_MODEL) {
          return new Response(null, { status: 404, statusText: "Not Found" })
        }
        return okJson()
      },
    })

    const req = new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: EXTENDED_MODEL, max_tokens: 16, messages: [] }),
    })
    const slot: ObserverSlot = { current: null }

    const res = await handler(req, slot)

    expect(res.status).toBe(200)
    expect(forwarded[0]?.model).toBe(EXTENDED_MODEL)
    expect(forwarded[1]?.model).toBe(BASE_MODEL)
    expect(forwarded[0]?.account).toBe("opus-1")
    expect(forwarded[1]?.account).toBe("opus-1")
    expect(forwarded.every((f) => f.account === "opus-1")).toBe(true)
  })
})

