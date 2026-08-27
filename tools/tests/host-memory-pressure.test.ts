
import { describe, expect, test } from "bun:test"
import { parseMemPressureStats } from "../lib/host-memory-pressure.ts"

describe("parseMemPressureStats", () => {
  const sample =
    "some avg10=0.01 avg60=0.03 avg300=0.00 total=52141837\nfull avg10=0.02 avg60=0.04 avg300=0.00 total=50219378\n"

  test("parses all four some/full avg10/avg60 fields from a real PSI body", () => {
    expect(parseMemPressureStats(sample)).toEqual({
      someAvg10: 0.01,
      someAvg60: 0.03,
      fullAvg10: 0.02,
      fullAvg60: 0.04,
    })
  })

  test("parses integer windows (no decimal point)", () => {
    expect(
      parseMemPressureStats("some avg10=0 avg60=0 avg300=0 total=0\nfull avg10=0 avg60=0 total=0\n")
    ).toEqual({ someAvg10: 0, someAvg60: 0, fullAvg10: 0, fullAvg60: 0 })
  })

  test("throws when the full line is absent (strict — kernel/format violation)", () => {
    expect(() => parseMemPressureStats("some avg10=0.01 avg60=0.03 avg300=0.00 total=1\n")).toThrow()
  })

  test("throws when the some line is absent (strict — kernel/format violation)", () => {
    expect(() => parseMemPressureStats("full avg10=0.01 avg60=0.03 avg300=0.00 total=1\n")).toThrow()
  })
})
