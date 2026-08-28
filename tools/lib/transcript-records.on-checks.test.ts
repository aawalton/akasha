import { describe, expect, it } from "bun:test"

import { normalizeRecord } from "./transcript-records.ts"

function userRecordWithToolResult(result: Record<string, unknown>): Record<string, unknown> {
  return {
    type: "user",
    timestamp: "2026-08-27T10:00:00.000Z",
    message: { content: [{ type: "tool_result", tool_use_id: "toolu_01", ...result }] },
  }
}

describe("normalizeRecord tool results", () => {
  it("carries a failed tool result through as an error", () => {
    const record = normalizeRecord(
      userRecordWithToolResult({ content: [{ type: "text", text: "boom" }], is_error: true })
    )
    expect(record.toolResults).toEqual([{ id: "toolu_01", text: "boom", isError: true }])
  })

  it("reads a successful tool result as no error", () => {
    const record = normalizeRecord(
      userRecordWithToolResult({ content: [{ type: "text", text: "fine" }], is_error: false })
    )
    expect(record.toolResults).toEqual([{ id: "toolu_01", text: "fine", isError: false }])
  })

  it("reads an absent is_error as no error", () => {
    const record = normalizeRecord(
      userRecordWithToolResult({ content: [{ type: "text", text: "fine" }] })
    )
    expect(record.toolResults).toEqual([{ id: "toolu_01", text: "fine", isError: false }])
  })

  it("reads a non-boolean is_error as no error", () => {
    const record = normalizeRecord(
      userRecordWithToolResult({ content: [{ type: "text", text: "fine" }], is_error: "true" })
    )
    expect(record.toolResults).toEqual([{ id: "toolu_01", text: "fine", isError: false }])
  })

  it("keeps a failed tool result out of the prompt reading", () => {
    const record = normalizeRecord(
      userRecordWithToolResult({ content: [{ type: "text", text: "boom" }], is_error: true })
    )
    expect(record.kind).toBe("other")
  })
})
