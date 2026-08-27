export const summary = "Verify an owner-owned page renders on a DEPLOYED URL as Alan's read-only live identity; fails loud on an owner-owned empty / 404 / sign-in wall (the real, non-illusory prod-verify path)."

import { dataError, inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  type ExpectedAttrMode,
  harnessModule,
  openVerifyRenderSession,
  type PageResponse,
  type RenderObservation,
  type RenderSession,
  reportRenderVerdict,
} from "../../lib/verify-render-code.ts"
import { DEFAULT_TIMEOUT_MS, help } from "../../lib/verify-render-help.ts"
import {
  classifyExpectedText,
  decideDiscriminatingSignal,
  isRetryableSessionOpenTimeout,
  planRenderSettleWait,
  planTitleSettleWait,
  planVerifyRenderSession,
} from "../../lib/verify-render-plan.ts"

export { help }

export default async function verifyRender(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const base = parsed.requireString("--url").replace(/\/+$/, "")
  const path = parsed.requireString("--path")
  const pageTypeSlug = parsed.requireString("--page-type")
  const expectText = parsed.string("--expect-text")
  const expectTitle = parsed.string("--expect-title")
  const expectCountSelector = parsed.string("--expect-count-selector")
  const expectCount = parsed.nonNegativeInt("--expect-count")
  const expectAttrSelector = parsed.string("--expect-attr-selector")
  const expectAttr = parsed.string("--expect-attr")
  const expectAttrValue = parsed.string("--expect-attr-value")
  const expectAttrMode: ExpectedAttrMode =
    parsed.string("--expect-attr-mode") === "contains-token" ? "contains-token" : "equals"
  const rootSelector = parsed.string("--root-selector") ?? "main"
  const hydrationSelector = parsed.string("--hydration-selector")
  const signInPath = parsed.string("--sign-in-path") ?? "/sign-in"
  const timeout = parsed.nonNegativeInt("--timeout-ms") ?? DEFAULT_TIMEOUT_MS
  const json = parsed.boolean("--json")

  const plan = planVerifyRenderSession({
    noSignIn: parsed.boolean("--no-sign-in"),
    asThrowaway: parsed.boolean("--as-throwaway"),
  })

  const signal = decideDiscriminatingSignal({
    expectText,
    expectCountSelector,
    expectCount,
    expectAttrSelector,
    expectAttr,
    expectAttrValue,
  })
  if (signal.kind === "absent") {
    throw inputError(
      `a discriminating signal is required to verify "${pageTypeSlug}" at ${path}: ` +
        "supply --expect-text, an --expect-count-selector + --expect-count count, or " +
        "an --expect-attr-selector + --expect-attr + --expect-attr-value assertion. " +
        "Without one, an empty render cannot be distinguished from a healthy one."
    )
  }

  if (/^https?:\/\/localhost|^https?:\/\/127\.0\.0\.1/.test(base)) {
    throw inputError(
      `--url must be a deployed domain, not localhost (${base}): a localhost-issued ` +
        "session cookie is not sent to a deployed origin."
    )
  }

  const harness = await harnessModule()

  let session: RenderSession
  try {
    session = await openVerifyRenderSession({
      harness,
      plan,
      base,
      signInPath,
      signInTimeoutMs: timeout,
    })
  } catch (err) {
    if (!isRetryableSessionOpenTimeout(err)) throw err
    const reason = `sign-in / session-open timed out before the render could be observed — the sign-in page had not hydrated within the ${timeout}ms budget (a healthy-but-slow page under CI convoy load, not a broken render)`
    reportRenderVerdict(
      { verdict: "INDETERMINATE", reason },
      { json, url: `${base}${path}`, pageType: pageTypeSlug, httpStatus: 0 }
    )
    throw operationalError(`render verification INDETERMINATE: ${reason}`)
  }
  try {
    let contentSettleTimedOut = false

    let response: PageResponse | null = null
    try {
      response = await session.page.goto(`${base}${path}`, {
        waitUntil: "domcontentloaded",
        timeout,
      })
    } catch (err) {
      if (err instanceof Error && err.name === "TimeoutError") {
        contentSettleTimedOut = true
      } else {
        throw err
      }
    }
    const status = response?.status() ?? 0
    const gotoPath = new URL(session.page.url()).pathname
    const initialHtml =
      expectTitle === undefined ? "" : ((await response?.text().catch(() => "")) ?? "")

    const settle = contentSettleTimedOut
      ? ({ kind: "none" } as const)
      : planRenderSettleWait({
          expectText,
          httpStatus: status,
          finalPath: gotoPath,
          signInPath,
          rootSelector,
          hydrationSelector,
        })
    if (settle.kind === "expect-text") {
      await session.page
        .getByText(settle.text, { exact: false })
        .filter({ visible: true })
        .first()
        .waitFor({ state: "visible", timeout })
        .catch(() => {
          contentSettleTimedOut = true
        })
    } else if (settle.kind === "root-populated") {
      await session.page
        .locator(settle.rootSelector)
        .filter({ hasText: /\S/ })
        .first()
        .waitFor({ state: "visible", timeout })
        .catch(() => {
          contentSettleTimedOut = true
        })
    } else if (settle.kind === "hydration-marker") {
      await session.page
        .locator(settle.selector)
        .first()
        .waitFor({ state: "visible", timeout })
        .catch(() => {
          contentSettleTimedOut = true
        })
    }
    const titleToAwait = contentSettleTimedOut
      ? undefined
      : planTitleSettleWait({
          expectTitle,
          httpStatus: status,
          finalPath: gotoPath,
          signInPath,
        })
    if (titleToAwait !== undefined) {
      await session.page
        .waitForFunction(`document.title === ${JSON.stringify(titleToAwait)}`, undefined, {
          timeout,
        })
        .catch(() => {})
    }

    const bodyText = await session.page
      .locator("body")
      .innerText()
      .catch(() => "")
    const rootCount = await session.page
      .locator(rootSelector)
      .count()
      .catch(() => 0)
    const domTitle = await session.page.title().catch(() => "")
    const actualCount =
      expectCountSelector === undefined
        ? 0
        : await session.page
            .locator(expectCountSelector)
            .count()
            .catch(() => 0)
    const attrElementFound =
      expectAttrSelector === undefined
        ? false
        : (await session.page
            .locator(expectAttrSelector)
            .count()
            .catch(() => 0)) > 0
    const attrActualValue =
      expectAttrSelector === undefined || expectAttr === undefined || !attrElementFound
        ? null
        : await session.page
            .locator(expectAttrSelector)
            .first()
            .getAttribute(expectAttr)
            .catch(() => null)
    const finalPath = new URL(session.page.url()).pathname

    const observation: RenderObservation = {
      pageTypeSlug,
      signInRedirect: finalPath.startsWith(signInPath),
      serverError: status >= 500,
      notFound: status === 404,
      renderedNonBlank: bodyText.trim().length > 0,
      rootElementPresent: rootCount > 0,
      contentSettleTimedOut,
      expectedText: classifyExpectedText(expectText, bodyText),
      expectedCount: harness.classifyExpectedCount({
        selector: expectCountSelector,
        expected: expectCount,
        actual: actualCount,
      }),
      expectedAttr: harness.classifyExpectedAttr({
        selector: expectAttrSelector,
        attribute: expectAttr,
        expected: expectAttrValue,
        mode: expectAttrMode,
        elementFound: attrElementFound,
        actualValue: attrActualValue,
      }),
      expectedTitleDom: harness.classifyExpectedTitleDom(expectTitle, domTitle),
      expectedTitleInitialHtml: harness.classifyExpectedTitleInitialHtml(expectTitle, initialHtml),
    }

    const verdict = harness.decideDeployedRenderVerdict(observation)

    reportRenderVerdict(verdict, {
      json,
      url: `${base}${path}`,
      pageType: pageTypeSlug,
      httpStatus: status,
      observation,
    })

    if (verdict.verdict === "FAIL") {
      throw dataError(`render verification FAILED: ${verdict.reason}`)
    }
    if (verdict.verdict === "INDETERMINATE") {
      throw operationalError(`render verification INDETERMINATE: ${verdict.reason}`)
    }
  } finally {
    await session.teardown()
  }
}
