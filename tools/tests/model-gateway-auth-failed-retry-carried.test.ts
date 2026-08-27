import { describe, expect, test } from "bun:test"
import { attemptAuthFailedRetry } from "../lib/model-gateway/auth-failed-retry.ts"
import type { OAuthCredential } from "../lib/oauth-types.ts"

const REVOKED = JSON.stringify({
  type: "error",
  error: { type: "authentication_error", message: "OAuth access token has been revoked" },
})

const SENT_TOKEN = "token-the-proxy-is-holding"

function credential(accessToken: string): OAuthCredential {
  return {
    account: "alanwalton",
    accessToken,
    refreshToken: "refresh",
    expiresAt: Date.now() + 3_600_000,
    scopes: ["user:inference"],
    subscriptionType: "max",
    rateLimitTier: null,
  }
}

function args(getFreshToken: (account: string) => Promise<OAuthCredential | null>) {
  return {
    res: new Response(REVOKED, { status: 401, statusText: "Unauthorized" }),
    currentAccount: "alanwalton",
    currentToken: SENT_TOKEN,
    trail: ["alanwalton"] as readonly string[],
    method: "POST",
    pathname: "/v1/messages",
    logPrefix: "[oauth-proxy]",
    getFreshToken,
  }
}

describe("attemptAuthFailedRetry", () => {
  test("replays the same account when the store holds a newer credential", async () => {
    const fresh = credential("token-the-upkeep-service-wrote")
    const outcome = await attemptAuthFailedRetry(args(async () => fresh))
    expect(outcome.kind).toBe("retry")
    if (outcome.kind !== "retry") throw new Error("expected retry")
    expect(outcome.cred.accessToken).toBe("token-the-upkeep-service-wrote")
  })

  test("gives the 401 back when the store holds the very token that failed", async () => {
    const outcome = await attemptAuthFailedRetry(args(async () => credential(SENT_TOKEN)))
    expect(outcome.kind).toBe("response")
    if (outcome.kind !== "response") throw new Error("expected response")
    expect(outcome.response.status).toBe(401)
    expect(await outcome.response.text()).toBe(REVOKED)
  })

  test("gives the 401 back when the store holds no usable credential", async () => {
    const outcome = await attemptAuthFailedRetry(args(async () => null))
    expect(outcome.kind).toBe("response")
    if (outcome.kind !== "response") throw new Error("expected response")
    expect(outcome.response.status).toBe(401)
  })

  test("re-reads the account that failed rather than any other", async () => {
    const asked: string[] = []
    await attemptAuthFailedRetry(
      args(async (account) => {
        asked.push(account)
        return credential("newer")
      })
    )
    expect(asked).toEqual(["alanwalton"])
  })
})
