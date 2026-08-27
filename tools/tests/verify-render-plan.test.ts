import { describe, expect, it } from "bun:test"
import {
  decideDiscriminatingSignal,
  isRetryableSessionOpenTimeout,
  planRenderSettleWait,
  planTitleSettleWait,
  planVerifyRenderSession,
} from "../lib/verify-render-plan.ts"

const NO_FLAGS = {
  expectText: undefined,
  expectCountSelector: undefined,
  expectCount: undefined,
  expectAttrSelector: undefined,
  expectAttr: undefined,
  expectAttrValue: undefined,
} as const

describe("decideDiscriminatingSignal — known-bad input it must REFUSE", () => {
  it("refuses no assertions at all", () => {
    expect(decideDiscriminatingSignal(NO_FLAGS).kind).toBe("absent")
  })

  it("refuses a count selector with no expected count", () => {
    expect(
      decideDiscriminatingSignal({ ...NO_FLAGS, expectCountSelector: "[data-card]" }).kind
    ).toBe("absent")
  })

  it("refuses an attr selector missing its expected value", () => {
    expect(
      decideDiscriminatingSignal({
        ...NO_FLAGS,
        expectAttrSelector: "button",
        expectAttr: "class",
      }).kind
    ).toBe("absent")
  })
})

describe("decideDiscriminatingSignal — known-good input it must ACCEPT", () => {
  it("accepts --expect-text and names it", () => {
    const d = decideDiscriminatingSignal({ ...NO_FLAGS, expectText: "The Factory Floor" })
    expect(d).toEqual({ kind: "present", checks: ["--expect-text"] })
  })

  it("accepts a complete count triple", () => {
    const d = decideDiscriminatingSignal({
      ...NO_FLAGS,
      expectCountSelector: "[data-card]",
      expectCount: 1,
    })
    expect(d).toEqual({ kind: "present", checks: ["--expect-count"] })
  })

  it("accepts a complete attr triple", () => {
    const d = decideDiscriminatingSignal({
      ...NO_FLAGS,
      expectAttrSelector: "button",
      expectAttr: "class",
      expectAttrValue: "muted",
    })
    expect(d).toEqual({ kind: "present", checks: ["--expect-attr"] })
  })

  it("names every assertion supplied, not just the first", () => {
    const d = decideDiscriminatingSignal({
      ...NO_FLAGS,
      expectText: "The Factory Floor",
      expectCountSelector: "[data-card]",
      expectCount: 1,
    })
    expect(d).toEqual({ kind: "present", checks: ["--expect-text", "--expect-count"] })
  })
})

describe("isRetryableSessionOpenTimeout", () => {
  it("Playwright TimeoutError → true (the retryable session-open indeterminacy)", () => {
    const err = new Error("page.goto: Timeout 60000ms exceeded")
    err.name = "TimeoutError"
    expect(isRetryableSessionOpenTimeout(err)).toBe(true)
  })

  it("a waitForFunction hydration-gate timeout → true (the exact #15716 evidence)", () => {
    const err = new Error("page.waitForFunction: Timeout 60000ms exceeded")
    err.name = "TimeoutError"
    expect(isRetryableSessionOpenTimeout(err)).toBe(true)
  })

  it("a generic Error (bad credentials / sign-in bounce) → false (stays loud)", () => {
    expect(
      isRetryableSessionOpenTimeout(new Error("harness sign-in (browser): still on /sign-in"))
    ).toBe(false)
  })

  it("a supabase-js credential error → false (genuine failure, never retried)", () => {
    expect(
      isRetryableSessionOpenTimeout(
        new Error("harness sign-in (supabase-js): invalid login credentials")
      )
    ).toBe(false)
  })

  it("a non-Error value → false", () => {
    expect(isRetryableSessionOpenTimeout("TimeoutError")).toBe(false)
    expect(isRetryableSessionOpenTimeout(undefined)).toBe(false)
    expect(isRetryableSessionOpenTimeout({ name: "TimeoutError" })).toBe(false)
  })
})

describe("planVerifyRenderSession", () => {
  it("default: real-user live-identity session, real-user env required only", () => {
    expect(planVerifyRenderSession({ noSignIn: false, asThrowaway: false })).toEqual({
      kind: "real-user",
      signIn: true,
      requiresRealUserEnv: true,
      requiresThrowawayEnv: false,
    })
  })

  it("--as-throwaway: throwaway session, throwaway env required, NOT real-user env", () => {
    expect(planVerifyRenderSession({ noSignIn: false, asThrowaway: true })).toEqual({
      kind: "throwaway",
      signIn: true,
      requiresRealUserEnv: false,
      requiresThrowawayEnv: true,
    })
  })

  it("--no-sign-in: anonymous session, NO credential env required (no-auth apps)", () => {
    expect(planVerifyRenderSession({ noSignIn: true, asThrowaway: false })).toEqual({
      kind: "anon",
      signIn: false,
      requiresRealUserEnv: false,
      requiresThrowawayEnv: false,
    })
  })

  it("--no-sign-in outranks --as-throwaway (precedence: anon > throwaway > real-user)", () => {
    expect(planVerifyRenderSession({ noSignIn: true, asThrowaway: true })).toEqual({
      kind: "anon",
      signIn: false,
      requiresRealUserEnv: false,
      requiresThrowawayEnv: false,
    })
  })

  it("never requires creds without signing in (the load-bearing no-auth invariant)", () => {
    const plan = planVerifyRenderSession({ noSignIn: true, asThrowaway: false })
    expect(plan.signIn).toBe(false)
    expect(plan.requiresRealUserEnv).toBe(false)
    expect(plan.requiresThrowawayEnv).toBe(false)
  })
})

describe("planRenderSettleWait", () => {
  const base = {
    signInPath: "/sign-in",
    rootSelector: "main",
    hydrationSelector: undefined,
  } as const

  it("no --expect-text + healthy (200): waits for the root element to populate (THE FIX)", () => {
    expect(
      planRenderSettleWait({
        ...base,
        expectText: undefined,
        httpStatus: 200,
        finalPath: "/game/the-tower-1a2b3c4d",
      })
    ).toEqual({ kind: "root-populated", rootSelector: "main" })
  })

  it("honors a custom --root-selector on the content-agnostic path", () => {
    expect(
      planRenderSettleWait({
        ...base,
        rootSelector: "#app",
        expectText: undefined,
        httpStatus: 200,
        finalPath: "/game/the-tower-1a2b3c4d",
      })
    ).toEqual({ kind: "root-populated", rootSelector: "#app" })
  })

  it("--expect-text supplied + healthy: keeps the content-specific text wait (no regression)", () => {
    expect(
      planRenderSettleWait({
        ...base,
        expectText: "The Tower",
        httpStatus: 200,
        finalPath: "/game/the-tower-1a2b3c4d",
      })
    ).toEqual({ kind: "expect-text", text: "The Tower" })
  })

  it("server error (5xx): no wait → fast fail-loud (truly-broken direction)", () => {
    expect(
      planRenderSettleWait({
        ...base,
        expectText: undefined,
        httpStatus: 503,
        finalPath: "/game/the-tower-1a2b3c4d",
      })
    ).toEqual({ kind: "none" })
  })

  it("404: no wait → fast fail-loud", () => {
    expect(
      planRenderSettleWait({
        ...base,
        expectText: undefined,
        httpStatus: 404,
        finalPath: "/game/missing-00000000",
      })
    ).toEqual({ kind: "none" })
  })

  it("bounced to /sign-in: no wait even on a 200 (genuine-failure path stays fast)", () => {
    expect(
      planRenderSettleWait({
        ...base,
        expectText: undefined,
        httpStatus: 200,
        finalPath: "/sign-in",
      })
    ).toEqual({ kind: "none" })
  })

  it("genuine-failure status takes precedence over a supplied --expect-text", () => {
    expect(
      planRenderSettleWait({
        ...base,
        expectText: "The Tower",
        httpStatus: 500,
        finalPath: "/game/the-tower-1a2b3c4d",
      })
    ).toEqual({ kind: "none" })
  })

  it("--hydration-selector + healthy: waits for the hydration marker (THE GATE)", () => {
    expect(
      planRenderSettleWait({
        ...base,
        hydrationSelector: '[role="tab"]',
        expectText: undefined,
        httpStatus: 200,
        finalPath: "/game/the-tower-1a2b3c4d",
      })
    ).toEqual({ kind: "hydration-marker", selector: '[role="tab"]' })
  })

  it("--hydration-selector takes precedence over --expect-text (the gate wins the wait)", () => {
    expect(
      planRenderSettleWait({
        ...base,
        hydrationSelector: '[role="tab"]',
        expectText: "Lineup",
        httpStatus: 200,
        finalPath: "/game/the-tower-1a2b3c4d",
      })
    ).toEqual({ kind: "hydration-marker", selector: '[role="tab"]' })
  })

  it("genuine-failure status takes precedence over --hydration-selector (still fast-fails)", () => {
    expect(
      planRenderSettleWait({
        ...base,
        hydrationSelector: '[role="tab"]',
        expectText: undefined,
        httpStatus: 500,
        finalPath: "/game/the-tower-1a2b3c4d",
      })
    ).toEqual({ kind: "none" })
  })

  it("sign-in bounce takes precedence over --hydration-selector", () => {
    expect(
      planRenderSettleWait({
        ...base,
        hydrationSelector: '[role="tab"]',
        expectText: undefined,
        httpStatus: 200,
        finalPath: "/sign-in",
      })
    ).toEqual({ kind: "none" })
  })
})

describe("planTitleSettleWait", () => {
  const base = { signInPath: "/sign-in" } as const

  it("--expect-title + healthy (200): waits for document.title to match (THE FIX)", () => {
    expect(
      planTitleSettleWait({
        ...base,
        expectTitle: "The Tower",
        httpStatus: 200,
        finalPath: "/story/the-tower",
      })
    ).toBe("The Tower")
  })

  it("no --expect-title: no wait", () => {
    expect(
      planTitleSettleWait({
        ...base,
        expectTitle: undefined,
        httpStatus: 200,
        finalPath: "/story/the-tower",
      })
    ).toBeUndefined()
  })

  it("404: no wait → fast fail-loud", () => {
    expect(
      planTitleSettleWait({
        ...base,
        expectTitle: "The Tower",
        httpStatus: 404,
        finalPath: "/story/missing",
      })
    ).toBeUndefined()
  })

  it("server error (5xx): no wait → fast fail-loud", () => {
    expect(
      planTitleSettleWait({
        ...base,
        expectTitle: "The Tower",
        httpStatus: 503,
        finalPath: "/story/the-tower",
      })
    ).toBeUndefined()
  })

  it("bounced to /sign-in: no wait even on a 200", () => {
    expect(
      planTitleSettleWait({
        ...base,
        expectTitle: "The Tower",
        httpStatus: 200,
        finalPath: "/sign-in",
      })
    ).toBeUndefined()
  })
})
