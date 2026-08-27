import { describe, expect, test } from "bun:test"
import {
  classifyPermissionDenied,
  isPermissionDenied,
} from "../lib/model-gateway/permission-denied.ts"
import { CARRIED_BODY, CARRIED_REASON } from "./model-gateway-permission-denied-vectors.ts"

describe("isPermissionDenied", () => {
  test("matches 403 + permission_error envelope", () => {
    expect(isPermissionDenied(403, CARRIED_BODY)).toBe(true)
  })

  test("does not match non-403 statuses even with permission_error body", () => {
    expect(isPermissionDenied(401, CARRIED_BODY)).toBe(false)
    expect(isPermissionDenied(429, CARRIED_BODY)).toBe(false)
    expect(isPermissionDenied(500, CARRIED_BODY)).toBe(false)
    expect(isPermissionDenied(200, CARRIED_BODY)).toBe(false)
  })

  test("does not match 403 with a different Anthropic error type", () => {
    const body = JSON.stringify({
      type: "error",
      error: { type: "authentication_error", message: "Invalid API key" },
    })
    expect(isPermissionDenied(403, body)).toBe(false)
  })

  test("does not match 403 with malformed JSON body", () => {
    expect(isPermissionDenied(403, "<html>Forbidden</html>")).toBe(false)
    expect(isPermissionDenied(403, "")).toBe(false)
    expect(isPermissionDenied(403, "not json at all")).toBe(false)
  })

  test("does not match 403 with valid JSON but no error envelope", () => {
    expect(isPermissionDenied(403, JSON.stringify({ foo: "bar" }))).toBe(false)
    expect(isPermissionDenied(403, JSON.stringify({ type: "message" }))).toBe(false)
  })
})

describe("classifyPermissionDenied", () => {
  test("returns matched=true with the parsed reason for the canonical envelope", () => {
    const result = classifyPermissionDenied(403, CARRIED_BODY)
    expect(result.matched).toBe(true)
    if (!result.matched) throw new Error("expected matched")
    expect(result.reason).toBe(CARRIED_REASON)
  })

  test("falls back to error.type when message is absent", () => {
    const body = JSON.stringify({
      type: "error",
      error: { type: "permission_error" },
    })
    const result = classifyPermissionDenied(403, body)
    expect(result.matched).toBe(true)
    if (!result.matched) throw new Error("expected matched")
    expect(result.reason).toBe("permission_error")
  })

  test("returns matched=false on non-match", () => {
    expect(classifyPermissionDenied(200, CARRIED_BODY).matched).toBe(false)
    expect(classifyPermissionDenied(403, "<not json>").matched).toBe(false)
  })
})
