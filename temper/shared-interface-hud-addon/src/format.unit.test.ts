import { describe, expect, test } from "bun:test"
import { formatDuration, formatFramerate, formatLatency } from "./format"

describe("formatDuration", () => {
  test("under a minute", () => {
    expect(formatDuration(5)).toBe("00:05")
  })
  test("minutes and seconds", () => {
    expect(formatDuration(125)).toBe("02:05")
  })
  test("hours roll over to H:MM:SS", () => {
    expect(formatDuration(3661)).toBe("1:01:01")
  })
  test("negative clamps to zero", () => {
    expect(formatDuration(-10)).toBe("00:00")
  })
  test("truncates fractional seconds", () => {
    expect(formatDuration(59.9)).toBe("00:59")
  })
})

describe("formatFramerate", () => {
  test("rounds to a whole frame", () => {
    expect(formatFramerate(59.7)).toBe("60 fps")
  })
  test("integer passes through", () => {
    expect(formatFramerate(30)).toBe("30 fps")
  })
  test("negative clamps to zero", () => {
    expect(formatFramerate(-5)).toBe("0 fps")
  })
})

describe("formatLatency", () => {
  test("rounds to a whole millisecond", () => {
    expect(formatLatency(42.4)).toBe("42 ms")
  })
  test("integer passes through", () => {
    expect(formatLatency(150)).toBe("150 ms")
  })
  test("negative clamps to zero", () => {
    expect(formatLatency(-1)).toBe("0 ms")
  })
})
