import type { BrowserTestEnv, RealUserOptInEnv } from "@shared/browser-test-harness/env"
import { dataError } from "./exit.ts"
import { emitVerdict } from "./verdict-channel.ts"
import type { VerifyRenderSessionPlan } from "./verify-render-plan.ts"
import { renderChannelVerdict } from "./verify-render-verdict.ts"

export type ExpectedTextStatus = "present" | "absent" | "not-checked"

export type ExpectedTitleDomStatus = "match" | "mismatch" | "not-checked"

export type ExpectedTitleInitialHtmlStatus = "present" | "absent" | "not-checked"

export type ExpectedAttrMode = "equals" | "contains-token"

export type ExpectedCountStatus =
  | { readonly kind: "not-checked" }
  | { readonly kind: "match" }
  | {
      readonly kind: "mismatch"
      readonly selector: string
      readonly expected: number
      readonly actual: number
    }

export type ExpectedAttrStatus =
  | { readonly kind: "not-checked" }
  | { readonly kind: "match" }
  | { readonly kind: "element-absent"; readonly selector: string }
  | {
      readonly kind: "mismatch"
      readonly selector: string
      readonly attribute: string
      readonly expected: string
      readonly actual: string | null
    }

export interface RenderObservation {
  readonly pageTypeSlug: string
  readonly signInRedirect: boolean
  readonly serverError: boolean
  readonly notFound: boolean
  readonly renderedNonBlank: boolean
  readonly rootElementPresent: boolean
  readonly contentSettleTimedOut: boolean
  readonly expectedText: ExpectedTextStatus
  readonly expectedCount: ExpectedCountStatus
  readonly expectedAttr: ExpectedAttrStatus
  readonly expectedTitleDom: ExpectedTitleDomStatus
  readonly expectedTitleInitialHtml: ExpectedTitleInitialHtmlStatus
}

export interface RenderVerdict {
  readonly verdict: "PASS" | "FAIL" | "INDETERMINATE"
  readonly reason: string
}

export interface Locator {
  readonly filter: (options: {
    readonly visible?: boolean
    readonly hasText?: RegExp
  }) => Locator
  readonly first: () => Locator
  readonly waitFor: (options: {
    readonly state: "visible"
    readonly timeout: number
  }) => Promise<void>
  readonly count: () => Promise<number>
  readonly innerText: () => Promise<string>
  readonly getAttribute: (name: string) => Promise<string | null>
}

export interface PageResponse {
  readonly status: () => number
  readonly text: () => Promise<string>
}

export interface Page {
  readonly goto: (
    url: string,
    options: { readonly waitUntil: "domcontentloaded"; readonly timeout: number }
  ) => Promise<PageResponse | null>
  readonly url: () => string
  readonly title: () => Promise<string>
  readonly locator: (selector: string) => Locator
  readonly getByText: (text: string, options: { readonly exact: boolean }) => Locator
  readonly waitForFunction: (
    expression: string,
    arg: undefined,
    options: { readonly timeout: number }
  ) => Promise<unknown>
}

export interface RenderSession {
  readonly page: Page
  readonly teardown: () => Promise<void>
}

interface Harness {
  readonly classifyExpectedAttr: (input: {
    readonly selector: string | undefined
    readonly attribute: string | undefined
    readonly expected: string | undefined
    readonly mode: ExpectedAttrMode
    readonly elementFound: boolean
    readonly actualValue: string | null
  }) => ExpectedAttrStatus
  readonly classifyExpectedCount: (input: {
    readonly selector: string | undefined
    readonly expected: number | undefined
    readonly actual: number
  }) => ExpectedCountStatus
  readonly classifyExpectedTitleDom: (
    expectTitle: string | undefined,
    domTitle: string
  ) => ExpectedTitleDomStatus
  readonly classifyExpectedTitleInitialHtml: (
    expectTitle: string | undefined,
    initialHtml: string
  ) => ExpectedTitleInitialHtmlStatus
  readonly createReadOnlyAnonSession: () => Promise<RenderSession>
  readonly createReadOnlyRealUserHarness: (options: {
    readonly env: RealUserOptInEnv
    readonly signInPath: string
    readonly signInTimeoutMs: number
  }) => Promise<RenderSession>
  readonly createReadOnlyThrowawayHarness: (options: {
    readonly env: BrowserTestEnv
    readonly signInPath: string
    readonly signInTimeoutMs: number
  }) => Promise<RenderSession>
  readonly decideDeployedRenderVerdict: (observation: RenderObservation) => RenderVerdict
  readonly readBrowserTestEnv: () => {
    readonly env: BrowserTestEnv | null
    readonly missing: boolean
  }
  readonly readRealUserOptInEnv: () => {
    readonly env: RealUserOptInEnv | null
    readonly missing: boolean
  }
}

export async function harnessModule(): Promise<Harness> {
  return await import("@shared/browser-test-harness")
}

export async function openVerifyRenderSession(options: {
  readonly harness: Harness
  readonly plan: VerifyRenderSessionPlan
  readonly base: string
  readonly signInPath: string
  readonly signInTimeoutMs: number
}): Promise<RenderSession> {
  const { harness, plan, base, signInPath, signInTimeoutMs } = options

  if (plan.kind === "anon") {
    return await harness.createReadOnlyAnonSession()
  }

  if (plan.kind === "throwaway") {
    const result = harness.readBrowserTestEnv()
    if (result.missing || result.env === null) {
      throw dataError(
        "BROWSER_TEST_EMAIL / BROWSER_TEST_PASSWORD (and SUPABASE_URL / " +
          "SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY / BROWSER_TEST_URL) must be " +
          "set in ~/.secrets.env for --as-throwaway. The fail-closed guard still " +
          "refuses the protected real user."
      )
    }
    return await harness.createReadOnlyThrowawayHarness({
      env: { ...result.env, url: base },
      signInPath,
      signInTimeoutMs,
    })
  }

  const optEnv = harness.readRealUserOptInEnv()
  if (optEnv.missing || optEnv.env === null) {
    throw dataError(
      "BROWSER_TEST_REAL_USER_EMAIL / BROWSER_TEST_REAL_USER_PASSWORD (and " +
        "SUPABASE_URL / SUPABASE_ANON_KEY / BROWSER_TEST_URL) must be set in " +
        "~/.secrets.env for the read-only live-identity path (or pass --no-sign-in)."
    )
  }

  return await harness.createReadOnlyRealUserHarness({
    env: { ...optEnv.env, url: base },
    signInPath,
    signInTimeoutMs,
  })
}

export function reportRenderVerdict(
  verdict: RenderVerdict,
  ctx: {
    readonly json: boolean
    readonly url: string
    readonly pageType: string
    readonly httpStatus: number
    readonly observation?: RenderObservation
  }
): undefined {
  if (ctx.json) {
    process.stdout.write(
      `${JSON.stringify({
        verdict: verdict.verdict,
        reason: verdict.reason,
        url: ctx.url,
        pageType: ctx.pageType,
        httpStatus: ctx.httpStatus,
        ...(ctx.observation === undefined ? {} : { observation: ctx.observation }),
      })}\n`
    )
    return undefined
  }
  emitVerdict(
    renderChannelVerdict({
      verdict,
      url: ctx.url,
      pageType: ctx.pageType,
      httpStatus: ctx.httpStatus,
      observedAtMs: Date.now(),
      observed: ctx.observation !== undefined,
    })
  )
  return undefined
}
