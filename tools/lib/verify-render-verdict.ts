import type { RenderVerdict } from "./verify-render-code.ts"
import type { AnyVerdict } from "./verdict-channel.ts"

const SUBJECT = "the-deployed-render"

const UNIT = "renders"

const KIND: Record<RenderVerdict["verdict"], AnyVerdict["kind"]> = {
  PASS: "pass",
  FAIL: "fail",
  INDETERMINATE: "fail",
}

export function renderChannelVerdict(args: {
  readonly verdict: RenderVerdict
  readonly url: string
  readonly pageType: string
  readonly httpStatus: number
  readonly observedAtMs: number
  readonly observed: boolean
}): AnyVerdict {
  const { verdict, url, pageType, httpStatus, observedAtMs, observed } = args
  const claim = {
    subject: SUBJECT,
    reason: `${verdict.reason} — ${url} (http ${httpStatus}, page-type ${pageType})`,
    observedAtMs,
    coverage: { observed: observed ? 1 : 0, declared: 1, unit: UNIT },
    evidence: { url, pageType, httpStatus },
  }
  if (KIND[verdict.verdict] === "fail") {
    return { ...claim, kind: "fail", findings: [{ detail: verdict.reason, at: url }] }
  }
  return { ...claim, kind: "pass" }
}
