import { describe, expect, test } from "bun:test"
import { classifyCapacity429 } from "../lib/model-gateway/capacity-classification.ts"

const OVERAGE_BODY =
  '{"type":"error","error":{"type":"rate_limit_error","message":"Usage credits are required for fast mode."}}'
const CAP_BODY =
  '{"type":"error","error":{"type":"rate_limit_error","message":"This request would exceed your account\'s rate limit. Please try again later."}}'
const MALFORMED_BODY = '{"type":"error","error":{"type":"rate_limit_error","message":"Error"}}'

const LIVE_OVERAGE_REFUSAL = new Headers({
  "anthropic-ratelimit-unified-overage-disabled-reason": "org_level_disabled",
})

const LIVE_GENUINE_CAP = new Headers({
  "anthropic-ratelimit-unified-5h-reset": "1785519600",
  "anthropic-ratelimit-unified-5h-status": "allowed",
  "anthropic-ratelimit-unified-5h-utilization": "0.0",
  "anthropic-ratelimit-unified-7d-reset": "1785880800",
  "anthropic-ratelimit-unified-7d-status": "rejected",
  "anthropic-ratelimit-unified-7d-surpassed-threshold": "1.0",
  "anthropic-ratelimit-unified-7d-utilization": "1.0",
  "anthropic-ratelimit-unified-overage-disabled-reason": "out_of_credits",
  "anthropic-ratelimit-unified-overage-status": "rejected",
  "anthropic-ratelimit-unified-representative-claim": "seven_day",
  "anthropic-ratelimit-unified-status": "rejected",
})

const LIVE_OVERAGE_REFUSAL_ON_CAPPED_ACCOUNT = new Headers({
  "anthropic-ratelimit-unified-overage-disabled-reason": "out_of_credits",
})

const LIVE_MALFORMED_REFUSAL = new Headers({})

const BRIEF_OVERAGE_HEADERS = new Headers({
  "anthropic-ratelimit-unified-overage-status": "rejected",
  "anthropic-ratelimit-unified-overage-disabled-reason": "org_level_disabled",
  "anthropic-ratelimit-unified-5h-status": "allowed",
  "anthropic-ratelimit-unified-5h-utilization": "0.07",
  "anthropic-ratelimit-unified-7d-status": "allowed",
  "anthropic-ratelimit-unified-7d-utilization": "0.06",
})

describe("the measured live shapes, both verdicts", () => {
  test("a real overage refusal reads not-capacity via the structural signal", () => {
    const verdict = classifyCapacity429(LIVE_OVERAGE_REFUSAL, OVERAGE_BODY)
    expect(verdict.kind).toBe("not-capacity")
    if (verdict.kind !== "not-capacity") throw new Error("expected not-capacity")
    expect(verdict.signal).toBe("overage-header")
    expect(verdict.overageDisabledReason).toBe("org_level_disabled")
  })

  test("a real genuine cap still reads capacity, and still marks", () => {
    const verdict = classifyCapacity429(LIVE_GENUINE_CAP, CAP_BODY)
    expect(verdict.kind).toBe("capacity")
    expect(verdict.reason).toBe("5h=allowed 7d=rejected")
  })

  test("a real malformed-request 429 stays unclassified — no signal may fire", () => {
    const verdict = classifyCapacity429(LIVE_MALFORMED_REFUSAL, MALFORMED_BODY)
    expect(verdict.kind).toBe("unclassified")
  })
})

describe("an overage refusal masking a genuine cap", () => {
  test("reads not-capacity — the verdict is about the RESPONSE, not the account", () => {
    const verdict = classifyCapacity429(LIVE_OVERAGE_REFUSAL_ON_CAPPED_ACCOUNT, OVERAGE_BODY)
    expect(verdict.kind).toBe("not-capacity")
    if (verdict.kind !== "not-capacity") throw new Error("expected not-capacity")
    expect(verdict.signal).toBe("overage-header")
  })
})

describe("the structural signal is scoped to the gap the windows leave", () => {
  test("does not fire when only ONE window is absent", () => {
    const verdict = classifyCapacity429(
      new Headers({
        "anthropic-ratelimit-unified-5h-status": "allowed",
        "anthropic-ratelimit-unified-overage-disabled-reason": "org_level_disabled",
      }),
      OVERAGE_BODY
    )
    expect(verdict.kind).toBe("unclassified")
  })

  test("does not fire on an empty disabled-reason value", () => {
    const verdict = classifyCapacity429(
      new Headers({ "anthropic-ratelimit-unified-overage-disabled-reason": "   " }),
      MALFORMED_BODY
    )
    expect(verdict.kind).toBe("unclassified")
  })
})

describe("the body signal is the weak arm", () => {
  test("fires when the header is gone but the prose remains", () => {
    const verdict = classifyCapacity429(new Headers({}), OVERAGE_BODY)
    expect(verdict.kind).toBe("not-capacity")
    if (verdict.kind !== "not-capacity") throw new Error("expected not-capacity")
    expect(verdict.signal).toBe("overage-body")
  })

  test("matches case-insensitively", () => {
    const verdict = classifyCapacity429(
      new Headers({}),
      '{"message":"USAGE CREDITS ARE REQUIRED FOR FAST MODE."}'
    )
    expect(verdict.kind).toBe("not-capacity")
  })

  test("a reworded refusal silently stops matching — the documented failure mode", () => {
    const verdict = classifyCapacity429(
      new Headers({}),
      '{"message":"Fast mode requires usage credits."}'
    )
    expect(verdict.kind).toBe("unclassified")
  })

  test("does not fire while a window reports a cap", () => {
    const verdict = classifyCapacity429(
      new Headers({
        "anthropic-ratelimit-unified-5h-status": "rejected",
        "anthropic-ratelimit-unified-7d-status": "allowed",
      }),
      OVERAGE_BODY
    )
    expect(verdict.kind).toBe("capacity")
  })

  test("a null body cannot fire it", () => {
    expect(classifyCapacity429(new Headers({}), null).kind).toBe("unclassified")
  })
})

describe("the windows decide whenever they are readable", () => {
  test("the brief's both-allowed set reads not-capacity via the window signal", () => {
    const verdict = classifyCapacity429(BRIEF_OVERAGE_HEADERS, OVERAGE_BODY)
    expect(verdict.kind).toBe("not-capacity")
    if (verdict.kind !== "not-capacity") throw new Error("expected not-capacity")
    expect(verdict.signal).toBe("windows-allowed")
    expect(verdict.overageRejected).toBe(true)
    expect(verdict.overageDisabledReason).toBe("org_level_disabled")
  })

  test("a rejected 5h window reads as capacity", () => {
    const verdict = classifyCapacity429(
      new Headers({
        "anthropic-ratelimit-unified-5h-status": "rejected",
        "anthropic-ratelimit-unified-7d-status": "allowed",
      }),
      CAP_BODY
    )
    expect(verdict.kind).toBe("capacity")
    expect(verdict.reason).toBe("5h=rejected 7d=allowed")
  })

  test("an unrecognized window token reads as capacity, not as headroom", () => {
    const verdict = classifyCapacity429(
      new Headers({
        "anthropic-ratelimit-unified-5h-status": "allowed",
        "anthropic-ratelimit-unified-7d-status": "some_future_token",
      }),
      null
    )
    expect(verdict.kind).toBe("capacity")
  })

  test("an empty window value is absent, not allowed — and cannot reach a signal", () => {
    const verdict = classifyCapacity429(
      new Headers({
        "anthropic-ratelimit-unified-5h-status": "   ",
        "anthropic-ratelimit-unified-7d-status": "allowed",
      }),
      OVERAGE_BODY
    )
    expect(verdict.kind).toBe("unclassified")
  })

  test("both allowed with no overage header is not-capacity, overage false", () => {
    const verdict = classifyCapacity429(
      new Headers({
        "anthropic-ratelimit-unified-5h-status": "allowed",
        "anthropic-ratelimit-unified-7d-status": "allowed",
      }),
      null
    )
    if (verdict.kind !== "not-capacity") throw new Error("expected not-capacity")
    expect(verdict.signal).toBe("windows-allowed")
    expect(verdict.overageRejected).toBe(false)
    expect(verdict.overageDisabledReason).toBe(null)
  })

  test("values are compared case-insensitively and trimmed", () => {
    const verdict = classifyCapacity429(
      new Headers({
        "anthropic-ratelimit-unified-5h-status": " ALLOWED ",
        "anthropic-ratelimit-unified-7d-status": "Allowed",
        "anthropic-ratelimit-unified-overage-status": "REJECTED",
      }),
      null
    )
    if (verdict.kind !== "not-capacity") throw new Error("expected not-capacity")
    expect(verdict.overageRejected).toBe(true)
  })
})
