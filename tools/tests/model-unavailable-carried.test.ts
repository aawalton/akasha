
import { describe, expect, test } from "bun:test"
import {
  classifyModelUnavailable,
  decideModelUnavailableAction,
  isModelUnavailable,
} from "../lib/model-gateway/model-unavailable.ts"

const NOT_FOUND_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "not_found_error",
    message: "model: claude-opus-4-6-20260501",
  },
  request_id: "req_abc123",
})

describe("isModelUnavailable", () => {
  test("matches 404 + not_found_error envelope", () => {
    expect(isModelUnavailable(404, NOT_FOUND_BODY)).toBe(true)
  })

  test("does not match non-404 statuses even with not_found_error body", () => {
    expect(isModelUnavailable(400, NOT_FOUND_BODY)).toBe(false)
    expect(isModelUnavailable(403, NOT_FOUND_BODY)).toBe(false)
    expect(isModelUnavailable(429, NOT_FOUND_BODY)).toBe(false)
    expect(isModelUnavailable(500, NOT_FOUND_BODY)).toBe(false)
    expect(isModelUnavailable(200, NOT_FOUND_BODY)).toBe(false)
  })

  test("does not match 404 with a different Anthropic error type", () => {
    const body = JSON.stringify({
      type: "error",
      error: { type: "invalid_request_error", message: "bad request" },
    })
    expect(isModelUnavailable(404, body)).toBe(false)
  })

  test("does not match a 404 with a non-JSON body", () => {
    expect(isModelUnavailable(404, "<html>404 Not Found</html>")).toBe(false)
    expect(isModelUnavailable(404, "")).toBe(false)
  })

  test("does not match a 404 whose JSON is not the Anthropic error envelope", () => {
    expect(isModelUnavailable(404, JSON.stringify({ ok: false }))).toBe(false)
    expect(isModelUnavailable(404, JSON.stringify({ type: "error" }))).toBe(false)
  })
})

describe("classifyModelUnavailable", () => {
  test("returns matched with the inner error.message as reason", () => {
    const result = classifyModelUnavailable(404, NOT_FOUND_BODY)
    expect(result.matched).toBe(true)
    if (result.matched) {
      expect(result.reason).toBe("model: claude-opus-4-6-20260501")
    }
  })

  test("falls back to the bare error.type when message is absent", () => {
    const body = JSON.stringify({ type: "error", error: { type: "not_found_error" } })
    const result = classifyModelUnavailable(404, body)
    expect(result.matched).toBe(true)
    if (result.matched) {
      expect(result.reason).toBe("not_found_error")
    }
  })

  test("returns not-matched for a non-404 status", () => {
    expect(classifyModelUnavailable(500, NOT_FOUND_BODY)).toEqual({ matched: false })
  })

  test("returns not-matched for a 404 with a different error type", () => {
    const body = JSON.stringify({
      type: "error",
      error: { type: "authentication_error", message: "Invalid API key" },
    })
    expect(classifyModelUnavailable(404, body)).toEqual({ matched: false })
  })

  test("returns not-matched for an unparseable body", () => {
    expect(classifyModelUnavailable(404, "not json at all")).toEqual({ matched: false })
  })
})

describe("decideModelUnavailableAction — global-vs-account-specific 404", () => {
  const REASON = "model: claude-opus-4-6-20260501[1m]"

  test("first 404 for a reason → mark-rebind (account-specific reading)", () => {
    const marked = new Map<string, string>()
    expect(decideModelUnavailableAction(marked, REASON, "acctA")).toEqual({ action: "mark-rebind" })
  })

  test("second 404, same reason, different account → global-unmark of the first", () => {
    const marked = new Map<string, string>([[REASON, "acctA"]])
    expect(decideModelUnavailableAction(marked, REASON, "acctB")).toEqual({
      action: "global-unmark",
      firstAccount: "acctA",
    })
  })

  test("second 404 with a DIFFERENT reason → mark-rebind (distinct model, still account-specific)", () => {
    const marked = new Map<string, string>([[REASON, "acctA"]])
    expect(decideModelUnavailableAction(marked, "model: some-other-model", "acctB")).toEqual({
      action: "mark-rebind",
    })
  })

  test("same account re-seen for the same reason → mark-rebind (never self-unmark)", () => {
    const marked = new Map<string, string>([[REASON, "acctA"]])
    expect(decideModelUnavailableAction(marked, REASON, "acctA")).toEqual({ action: "mark-rebind" })
  })
})
