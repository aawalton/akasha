import { describe, expect, test } from "bun:test"
import {
  buildTransportEvent,
  extractLastSseEventType,
  type ObservedStreamState,
  type TransportEvent,
  TransportEventSchema,
} from "../lib/model-gateway/transport-log.ts"

function baseObservation(over: Partial<ObservedStreamState> = {}): ObservedStreamState {
  const startMs = 1_700_000_000_000
  const endMs = startMs + 1500
  return {
    termination: "complete",
    account: "alice",
    path: "/v1/messages",
    startMs,
    endMs,
    framesUpstream: 12,
    bytesUpstream: 4096,
    lastFrameMs: endMs - 50,
    lastEventType: "message_stop",
    sawMessageStop: true,
    httpStatus: 200,
    ...over,
  }
}

describe("buildTransportEvent", () => {
  test("builds a complete record from a typical happy-path observation", () => {
    const obs = baseObservation()
    const event = buildTransportEvent(obs)
    expect(event.termination).toBe("complete")
    expect(event.account).toBe("alice")
    expect(event.path).toBe("/v1/messages")
    expect(event.framesUpstream).toBe(12)
    expect(event.bytesUpstream).toBe(4096)
    expect(event.lastEventType).toBe("message_stop")
    expect(event.sawMessageStop).toBe(true)
    expect(event.errorClass).toBeNull()
    expect(event.errorMessage).toBeNull()
    expect(event.httpStatus).toBe(200)
  })

  test("propagates httpStatus = null when fetch threw before producing a response", () => {
    const event = buildTransportEvent(
      baseObservation({
        termination: "upstream_error",
        sawMessageStop: false,
        httpStatus: null,
        error: new TypeError("connection reset"),
      })
    )
    expect(event.httpStatus).toBeNull()
  })

  test("propagates a non-2xx httpStatus on a complete-but-failed response", () => {
    const event = buildTransportEvent(baseObservation({ sawMessageStop: false, httpStatus: 529 }))
    expect(event.httpStatus).toBe(529)
    expect(event.sawMessageStop).toBe(false)
  })

  test("builds an upstream_error record from a TypeError", () => {
    const event = buildTransportEvent(
      baseObservation({
        termination: "upstream_error",
        sawMessageStop: false,
        lastEventType: "content_block_delta",
        error: new TypeError("socket connection was closed unexpectedly"),
      })
    )
    expect(event.termination).toBe("upstream_error")
    expect(event.errorClass).toBe("TypeError")
    expect(event.errorMessage).toBe("socket connection was closed unexpectedly")
    expect(event.sawMessageStop).toBe(false)
    expect(event.lastEventType).toBe("content_block_delta")
  })

  test("builds a downstream_cancel record where the error field is undefined", () => {
    const event = buildTransportEvent(
      baseObservation({ termination: "downstream_cancel", sawMessageStop: false, error: undefined })
    )
    expect(event.termination).toBe("downstream_cancel")
    expect(event.errorClass).toBeNull()
    expect(event.errorMessage).toBeNull()
  })

  test("handles non-Error error values via typeof + String(err)", () => {
    const event = buildTransportEvent(
      baseObservation({ termination: "upstream_error", sawMessageStop: false, error: "raw string" })
    )
    expect(event.errorClass).toBe("string")
    expect(event.errorMessage).toBe("raw string")
  })

  test("uses error.constructor.name and error.message when error is Error-shaped", () => {
    class CustomError extends Error {}
    const event = buildTransportEvent(
      baseObservation({
        termination: "upstream_error",
        sawMessageStop: false,
        error: new CustomError("boom"),
      })
    )
    expect(event.errorClass).toBe("CustomError")
    expect(event.errorMessage).toBe("boom")
  })
})

describe("TransportEventSchema", () => {
  function makeEvent(over: Partial<TransportEvent> = {}): TransportEvent {
    return {
      ts: "2026-05-03T12:00:00.000Z",
      termination: "complete",
      account: "alice",
      path: "/v1/messages",
      elapsedMs: 1500,
      framesUpstream: 12,
      bytesUpstream: 4096,
      lastFrameAgoMs: 50,
      lastEventType: "message_stop",
      sawMessageStop: true,
      httpStatus: 200,
      errorClass: null,
      errorMessage: null,
      ...over,
    }
  }

  test("rejects an invalid termination literal", () => {
    expect(() => TransportEventSchema.parse({ ...makeEvent(), termination: "weird" })).toThrow()
  })

  test("rejects when framesUpstream is negative", () => {
    expect(() => TransportEventSchema.parse(makeEvent({ framesUpstream: -1 }))).toThrow()
  })

  test("rejects when framesUpstream is non-integer", () => {
    expect(() => TransportEventSchema.parse(makeEvent({ framesUpstream: 1.5 }))).toThrow()
  })

  test("rejects when httpStatus is non-integer", () => {
    expect(() => TransportEventSchema.parse(makeEvent({ httpStatus: 200.5 }))).toThrow()
  })
})

describe("extractLastSseEventType", () => {
  const enc = new TextEncoder()

  test("returns null for an empty chunk", () => {
    expect(extractLastSseEventType(new Uint8Array())).toBeNull()
  })

  test("returns null for a chunk with no event: line", () => {
    expect(extractLastSseEventType(enc.encode('data: {"foo":1}\n\n'))).toBeNull()
  })

  test("returns the event type for a single-event chunk", () => {
    expect(extractLastSseEventType(enc.encode("event: content_block_delta\ndata: {}\n\n"))).toBe(
      "content_block_delta"
    )
  })

  test("returns the LAST event type when a chunk contains multiple events", () => {
    const chunk = enc.encode(
      "event: message_start\ndata: {}\n\nevent: content_block_start\ndata: {}\n\n"
    )
    expect(extractLastSseEventType(chunk)).toBe("content_block_start")
  })

  test("trims surrounding whitespace from the event type value", () => {
    expect(extractLastSseEventType(enc.encode("event:   message_stop  \ndata: {}\n\n"))).toBe(
      "message_stop"
    )
  })

  test("recognizes CRLF line endings", () => {
    expect(extractLastSseEventType(enc.encode("event: ping\r\ndata: {}\r\n\r\n"))).toBe("ping")
  })

  test("does not match data: or id: lines", () => {
    expect(extractLastSseEventType(enc.encode("data: event: not_a_real_event\nid: 1\n\n"))).toBeNull()
  })

  test("does not match event: substrings that aren't at line start", () => {
    expect(extractLastSseEventType(enc.encode("data: prefix event: tricky\n\n"))).toBeNull()
  })

  test("matches event: at start of buffer (no leading newline)", () => {
    expect(extractLastSseEventType(enc.encode("event: message_start\ndata: {}\n\n"))).toBe(
      "message_start"
    )
  })
})

