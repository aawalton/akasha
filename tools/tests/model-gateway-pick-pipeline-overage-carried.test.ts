import { describe, expect, test } from "bun:test"
import {
  buildDeps,
  CAPACITY_HEADERS,
  emptySlot,
  FAST_BODY,
  fastModeRequest,
  type ForwardCall,
  LIVE_GENUINE_CAP_HEADERS,
  LIVE_OVERAGE_REFUSAL_BODY,
  LIVE_OVERAGE_REFUSAL_HEADERS,
  OVERAGE_REJECTED_HEADERS,
  PLAIN_BODY,
  plainRequest,
  RATE_LIMIT_BODY,
  run,
  runPickPipeline,
} from "./model-gateway-pick-pipeline-fixture.ts"
import { toBuffer } from "./model-gateway-pick-pipeline-fixture.ts"

describe("a 429 on a fast-mode request, with no headers to classify by", () => {
  test("strips and replays BEFORE any mark, and marks nothing when the replay is served", async () => {
    const calls: ForwardCall[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      accounts: ["acct-a", "acct-b"],
      responses: [
        new Response(RATE_LIMIT_BODY, { status: 429 }),
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      ],
    })
    const outcome = await run(deps)
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(outcome.response.status).toBe(200)
    expect(calls).toHaveLength(2)
    expect(calls[1]?.beta).toBe("oauth-2025-04-20")
    expect(calls[1]?.body?.speed).toBeUndefined()
  })

  test("a genuinely capped account still marks once the strip is spent", async () => {
    const calls: ForwardCall[] = []
    const marked: string[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      accounts: ["acct-a", "acct-b"],
      effects: {
        markAccountAtLimit: async ({ account }) => {
          marked.push(account)
        },
        repollUsageAfter429: async () => {},
      },
      responses: [
        new Response(RATE_LIMIT_BODY, { status: 429 }),
        new Response(RATE_LIMIT_BODY, { status: 429 }),
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      ],
    })
    const outcome = await run(deps)
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(marked).toEqual(["acct-a"])
    expect(calls).toHaveLength(3)
  })
})

describe("an overage refusal masking a genuine cap", () => {
  test("still replays, discovers the cap, and marks the account", async () => {
    const calls: ForwardCall[] = []
    const marked: string[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      accounts: ["acct-a", "acct-b"],
      effects: {
        markAccountAtLimit: async ({ account, retryAfterHeader }) => {
          marked.push(`${account}:${retryAfterHeader ?? "-"}`)
        },
        repollUsageAfter429: async () => {},
      },
      responses: [
        new Response(LIVE_OVERAGE_REFUSAL_BODY, {
          status: 429,
          headers: LIVE_OVERAGE_REFUSAL_HEADERS,
        }),
        new Response(RATE_LIMIT_BODY, { status: 429, headers: LIVE_GENUINE_CAP_HEADERS }),
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      ],
    })
    const outcome = await run(deps)
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(marked).toEqual(["acct-a:361112"])
    expect(calls).toHaveLength(3)
    expect(calls[0]?.body?.speed).toBe("fast")
    expect(calls[1]?.body?.speed).toBeUndefined()
  })

  test("on a healthy account the identical refusal marks nothing", async () => {
    const calls: ForwardCall[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      accounts: ["acct-a", "acct-b"],
      responses: [
        new Response(LIVE_OVERAGE_REFUSAL_BODY, {
          status: 429,
          headers: LIVE_OVERAGE_REFUSAL_HEADERS,
        }),
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      ],
    })
    const outcome = await run(deps)
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(outcome.response.status).toBe(200)
    expect(calls).toHaveLength(2)
  })

  test("with nothing to strip, it returns the refusal and marks nothing", async () => {
    const calls: ForwardCall[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      accounts: ["acct-a", "acct-b", "acct-c"],
      responses: [
        new Response(LIVE_OVERAGE_REFUSAL_BODY, {
          status: 429,
          headers: LIVE_OVERAGE_REFUSAL_HEADERS,
        }),
      ],
    })
    const outcome = await runPickPipeline({
      req: plainRequest(),
      observerSlot: emptySlot(),
      originalBody: toBuffer(PLAIN_BODY),
      method: "POST",
      pathname: "/v1/messages",
      deps,
    })
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(outcome.response.status).toBe(429)
    expect(await outcome.response.text()).toBe(LIVE_OVERAGE_REFUSAL_BODY)
    expect(calls).toHaveLength(1)
  })

  test("the body signal alone carries it when the header is gone", async () => {
    const calls: ForwardCall[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      accounts: ["acct-a", "acct-b", "acct-c"],
      responses: [new Response(LIVE_OVERAGE_REFUSAL_BODY, { status: 429 })],
    })
    const outcome = await runPickPipeline({
      req: plainRequest(),
      observerSlot: emptySlot(),
      originalBody: toBuffer(PLAIN_BODY),
      method: "POST",
      pathname: "/v1/messages",
      deps,
    })
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(outcome.response.status).toBe(429)
    expect(calls).toHaveLength(1)
  })
})
