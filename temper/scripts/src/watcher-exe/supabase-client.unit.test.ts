import { describe, expect, test } from "bun:test"
import { isValidSessionBlob } from "./supabase-client"

describe("isValidSessionBlob", () => {
  test("accepts the full supabase-js session shape", () => {
    const raw = JSON.stringify({
      access_token: "a",
      refresh_token: "r",
      expires_at: 1234567890,
      expires_in: 3600,
      token_type: "bearer",
      user: { id: "u" },
    })
    expect(isValidSessionBlob(raw)).toBe(true)
  })

  test("accepts the minimal valid shape with the three required keys only", () => {
    const raw = JSON.stringify({
      access_token: "a",
      refresh_token: "r",
      expires_at: 1234567890,
    })
    expect(isValidSessionBlob(raw)).toBe(true)
  })

  test("rejects the legacy minimal shape missing expires_at", () => {
    const raw = JSON.stringify({
      access_token: "a",
      refresh_token: "r",
    })
    expect(isValidSessionBlob(raw)).toBe(false)
  })

  test("rejects shapes missing access_token", () => {
    const raw = JSON.stringify({ refresh_token: "r", expires_at: 1 })
    expect(isValidSessionBlob(raw)).toBe(false)
  })

  test("rejects shapes missing refresh_token", () => {
    const raw = JSON.stringify({ access_token: "a", expires_at: 1 })
    expect(isValidSessionBlob(raw)).toBe(false)
  })

  test("rejects null", () => {
    expect(isValidSessionBlob(null)).toBe(false)
  })

  test("rejects undefined", () => {
    expect(isValidSessionBlob(undefined)).toBe(false)
  })

  test("rejects empty string", () => {
    expect(isValidSessionBlob("")).toBe(false)
  })

  test("rejects malformed JSON", () => {
    expect(isValidSessionBlob("{not json")).toBe(false)
  })

  test("rejects non-object JSON values", () => {
    expect(isValidSessionBlob("null")).toBe(false)
    expect(isValidSessionBlob("42")).toBe(false)
    expect(isValidSessionBlob('"a string"')).toBe(false)
    expect(isValidSessionBlob("[1,2,3]")).toBe(false)
  })
})
