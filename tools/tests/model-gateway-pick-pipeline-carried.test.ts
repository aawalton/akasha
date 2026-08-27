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

describe("an overage-rejected 429", () => {
  test("writes NO account-wide mark and fires no usage re-poll", async () => {
    const calls: ForwardCall[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      responses: [
        new Response(RATE_LIMIT_BODY, { status: 429, headers: OVERAGE_REJECTED_HEADERS }),
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      ],
    })
    const outcome = await run(deps)
    expect(outcome.kind).toBe("served")
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(outcome.response.status).toBe(200)
  })

  test("strips both halves of fast mode and replays on the SAME account", async () => {
    const calls: ForwardCall[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      responses: [
        new Response(RATE_LIMIT_BODY, { status: 429, headers: OVERAGE_REJECTED_HEADERS }),
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      ],
    })
    await run(deps)

    expect(calls).toHaveLength(2)
    expect(calls[0]?.beta).toBe("oauth-2025-04-20,fast-mode-2026-02-01")
    expect(calls[0]?.body?.speed).toBe("fast")
    expect(calls[1]?.beta).toBe("oauth-2025-04-20")
    expect(calls[1]?.body?.speed).toBeUndefined()
    expect(calls[1]?.body?.model).toBe("claude-opus-5")
  })

  test("returns the refusal with its body intact when there is nothing to strip", async () => {
    const calls: ForwardCall[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      responses: [
        new Response(RATE_LIMIT_BODY, { status: 429, headers: OVERAGE_REJECTED_HEADERS }),
      ],
    })
    const plainReq = new Request("http://localhost/v1/messages", { method: "POST" })
    const outcome = await runPickPipeline({
      req: plainReq,
      observerSlot: emptySlot(),
      originalBody: toBuffer({ model: "claude-opus-5", messages: [] }),
      method: "POST",
      pathname: "/v1/messages",
      deps,
    })
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(outcome.response.status).toBe(429)
    expect(await outcome.response.text()).toBe(RATE_LIMIT_BODY)
    expect(calls).toHaveLength(1)
  })

  test("does not walk the pool marking peer accounts", async () => {
    const calls: ForwardCall[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      accounts: ["acct-a", "acct-b", "acct-c"],
      responses: [
        new Response(RATE_LIMIT_BODY, { status: 429, headers: OVERAGE_REJECTED_HEADERS }),
        new Response(RATE_LIMIT_BODY, { status: 429, headers: OVERAGE_REJECTED_HEADERS }),
      ],
    })
    const outcome = await run(deps)
    if (outcome.kind !== "served") throw new Error("expected served")
    expect(outcome.response.status).toBe(429)
    expect(calls).toHaveLength(2)
  })
})

describe("a genuine capacity 429", () => {
  test("still marks the account and still drives util", async () => {
    const calls: ForwardCall[] = []
    const marked: string[] = []
    const repolled: string[] = []
    const deps = buildDeps({
      record: (c) => calls.push(c),
      accounts: ["acct-a", "acct-b"],
      effects: {
        markAccountAtLimit: async ({ account, retryAfterHeader }) => {
          marked.push(`${account}:${retryAfterHeader ?? "-"}`)
        },
        repollUsageAfter429: async (account) => {
          repolled.push(account)
        },
      },
      responses: [
        new Response(RATE_LIMIT_BODY, { status: 429, headers: CAPACITY_HEADERS }),
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
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
    expect(outcome.response.status).toBe(200)
    expect(marked).toEqual(["acct-a:120"])
    expect(repolled).toEqual(["acct-a"])
    expect(calls).toHaveLength(2)
  })
})

describe("a 429 with no unified headers", () => {
  test("on a plain request, is unclassified and still takes the mark path", async () => {
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
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
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
    expect(marked).toEqual(["acct-a"])
  })
})

