import { describe, expect, test } from "bun:test"
import { parseErrorType } from "../lib/model-gateway/parse-error-type.ts"

describe("parseErrorType", () => {
  test("extracts error.type from a well-formed Anthropic error envelope", () => {
    expect(parseErrorType('{"type":"error","error":{"type":"rate_limit_error","message":"x"}}')).toBe(
      "rate_limit_error"
    )
    expect(parseErrorType('{"error":{"type":"overloaded_error"}}')).toBe("overloaded_error")
  })

  test("tolerates extra keys around the error.type it needs (looseObject)", () => {
    expect(parseErrorType('{"request_id":"req_1","error":{"type":"api_error","detail":{"k":1}}}')).toBe(
      "api_error"
    )
  })

  test("returns null for an empty body", () => {
    expect(parseErrorType("")).toBeNull()
  })

  test("returns null for non-JSON text", () => {
    expect(parseErrorType("Bad Gateway")).toBeNull()
    expect(parseErrorType("{not json")).toBeNull()
  })

  test("returns null when the shape lacks a string error.type", () => {
    expect(parseErrorType('{"error":{}}')).toBeNull()
    expect(parseErrorType('{"error":{"type":429}}')).toBeNull()
    expect(parseErrorType('{"message":"no error key"}')).toBeNull()
    expect(parseErrorType("null")).toBeNull()
    expect(parseErrorType("[1,2,3]")).toBeNull()
  })
})
