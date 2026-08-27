import { describe, expect, test } from "bun:test"
import { decideCallbackResponse } from "./auth"

const STATE = "0123456789abcdef"
const SERVER = "https://tempereso.com"

function params(over: Record<string, string | null> = {}): URLSearchParams {
  const base: Record<string, string | null> = {
    access_token: "at_live",
    refresh_token: "rt_live",
    state: STATE,
    ...over,
  }
  const out = new URLSearchParams()
  for (const [k, v] of Object.entries(base)) if (v !== null) out.set(k, v)
  return out
}

function decide(over: Record<string, string | null> = {}) {
  return decideCallbackResponse({
    searchParams: params(over),
    expectedState: STATE,
    serverUrl: SERVER,
  })
}

describe("a successful callback returns the user to Temper", () => {
  test("accepts and redirects to the status surface", () => {
    const decision = decide()
    expect(decision.kind).toBe("accept")
    if (decision.kind !== "accept") return
    expect(decision.redirectTo).toBe(`${SERVER}/watcher`)
  })

  test("the redirect target is on the configured server, never a hardcoded host", () => {
    const decision = decideCallbackResponse({
      searchParams: params(),
      expectedState: STATE,
      serverUrl: "http://localhost:3100",
    })
    expect(decision.kind === "accept" && decision.redirectTo).toBe("http://localhost:3100/watcher")
  })

  test("captures both tokens for the caller to install", () => {
    const decision = decide()
    expect(decision.kind === "accept" && decision.session).toEqual({
      access_token: "at_live",
      refresh_token: "rt_live",
    })
  })

  test("the accept arm carries no message, because there is nothing it could truthfully claim", () => {
    const decision = decide()
    expect(decision.kind === "accept" && "body" in decision).toBe(false)
    expect(JSON.stringify(decision)).not.toContain("success")
    expect(JSON.stringify(decision)).not.toContain("linked")
    expect(JSON.stringify(decision)).not.toContain("close this tab")
  })
})

describe("a callback that cannot be trusted is refused, and says why", () => {
  test("a mismatched state is rejected as a CSRF guard", () => {
    const decision = decide({ state: "attacker-supplied" })
    expect(decision.kind).toBe("reject")
    expect(decision.kind === "reject" && decision.status).toBe(400)
    expect(decision.kind === "reject" && decision.body).toContain("State mismatch")
  })

  test("an absent state is rejected rather than treated as matching", () => {
    expect(decide({ state: null }).kind).toBe("reject")
  })

  test("an empty expected state still refuses a stateless callback", () => {
    const decision = decideCallbackResponse({
      searchParams: params({ state: null }),
      expectedState: "",
      serverUrl: SERVER,
    })
    expect(decision.kind).toBe("reject")
  })

  test.each([
    ["access_token", { access_token: null }],
    ["refresh_token", { refresh_token: null }],
  ])("a callback missing %s is rejected", (_name, over) => {
    const decision = decide(over)
    expect(decision.kind).toBe("reject")
    expect(decision.kind === "reject" && decision.body).toContain("Missing tokens")
  })

  test("no rejection carries a redirect", () => {
    const rejected: Record<string, string | null>[] = [
      { state: "wrong" },
      { access_token: null },
      { refresh_token: null },
    ]
    for (const over of rejected) {
      const decision = decide(over)
      expect("redirectTo" in decision).toBe(false)
    }
  })
})
