import { describe, expect, test } from "bun:test"
import {
  classifyCommittedServed,
  mapStatusToSseError,
} from "../lib/model-gateway/committed-outcome.ts"

describe("classifyCommittedServed", () => {
  test("2xx statuses splice the upstream body", () => {
    expect(classifyCommittedServed(200)).toBe("splice")
    expect(classifyCommittedServed(201)).toBe("splice")
    expect(classifyCommittedServed(299)).toBe("splice")
  })

  test("non-2xx statuses become an in-stream error frame", () => {
    expect(classifyCommittedServed(300)).toBe("error-frame")
    expect(classifyCommittedServed(429)).toBe("error-frame")
    expect(classifyCommittedServed(500)).toBe("error-frame")
    expect(classifyCommittedServed(529)).toBe("error-frame")
  })

  test("sub-200 informational statuses are not spliced", () => {
    expect(classifyCommittedServed(100)).toBe("error-frame")
  })
})

describe("mapStatusToSseError", () => {
  test("529 and 503 map to overloaded_error", () => {
    expect(mapStatusToSseError(529).errorType).toBe("overloaded_error")
    expect(mapStatusToSseError(503).errorType).toBe("overloaded_error")
  })

  test("every other status maps to the generic api_error", () => {
    expect(mapStatusToSseError(500).errorType).toBe("api_error")
    expect(mapStatusToSseError(400).errorType).toBe("api_error")
    expect(mapStatusToSseError(404).errorType).toBe("api_error")
  })

  test("the message names the committed-hold context and carries the status", () => {
    const { message } = mapStatusToSseError(500)
    expect(message).toContain("500")
    expect(message.toLowerCase()).toContain("keepalive")
  })
})
