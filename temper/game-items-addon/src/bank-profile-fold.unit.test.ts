import { describe, expect, it } from "bun:test"
import {
  accumulateFrame,
  bucketBySource,
  emptyAccumulator,
  nsToMs,
  selectTop,
  sourceBucket,
} from "./bank-profile-fold"
import type { ProfilerRecord, ResolvedEntry } from "./bank-profile-types"

function closure(
  dataIndex: number,
  startNs: number,
  endNs: number,
  callerIndex: number | undefined
): ProfilerRecord {
  return { kind: "closure", dataIndex, startNs, endNs, callerIndex }
}

describe("accumulateFrame", () => {
  it("attributes self time as inclusive minus direct-callee inclusive at each depth", () => {
    const records: ProfilerRecord[] = [
      closure(10, 0, 1000, undefined),
      closure(20, 100, 600, 1),
      closure(30, 200, 400, 2),
    ]
    const acc = emptyAccumulator()
    accumulateFrame(acc, records)

    expect(acc.closures.get(10)).toEqual({ callCount: 1, inclusiveNs: 1000, selfNs: 500 })
    expect(acc.closures.get(20)).toEqual({ callCount: 1, inclusiveNs: 500, selfNs: 300 })
    expect(acc.closures.get(30)).toEqual({ callCount: 1, inclusiveNs: 200, selfNs: 200 })
    expect(acc.rootInclusiveNs).toBe(1000)
    expect(acc.recordCount).toBe(3)
  })

  it("sums two direct children when subtracting self time", () => {
    const records: ProfilerRecord[] = [
      closure(1, 0, 1000, undefined),
      closure(2, 0, 300, 1),
      closure(3, 300, 700, 1),
    ]
    const acc = emptyAccumulator()
    accumulateFrame(acc, records)
    expect(acc.closures.get(1)?.selfNs).toBe(300)
  })

  it("accumulates the same closure across repeated records (callCount + sums)", () => {
    const acc = emptyAccumulator()
    accumulateFrame(acc, [closure(7, 0, 200, undefined)])
    accumulateFrame(acc, [closure(7, 0, 300, undefined)])
    expect(acc.closures.get(7)).toEqual({ callCount: 2, inclusiveNs: 500, selfNs: 500 })
  })

  it("floors a negative/zero span at 0 self and 0 inclusive", () => {
    const acc = emptyAccumulator()
    accumulateFrame(acc, [closure(1, 500, 500, undefined)])
    expect(acc.closures.get(1)).toEqual({ callCount: 1, inclusiveNs: 0, selfNs: 0 })
  })

  it("routes cfunction and gc records to their own tallies", () => {
    const acc = emptyAccumulator()
    accumulateFrame(acc, [
      { kind: "cfunction", dataIndex: 5, startNs: 0, endNs: 400, callerIndex: undefined },
      { kind: "gc", dataIndex: 0, startNs: 0, endNs: 150, callerIndex: undefined },
    ])
    expect(acc.cfunctions.get(5)).toEqual({ callCount: 1, inclusiveNs: 400, selfNs: 400 })
    expect(acc.gcInclusiveNs).toBe(150)
    expect(acc.rootInclusiveNs).toBe(550)
  })
})

describe("nsToMs", () => {
  it("rounds nanoseconds to 0.1ms", () => {
    expect(nsToMs(1_000_000)).toBe(1)
    expect(nsToMs(1_250_000)).toBe(1.3)
    expect(nsToMs(400_000)).toBe(0.4)
    expect(nsToMs(40_000)).toBe(0)
    expect(nsToMs(0)).toBe(0)
  })
})

describe("sourceBucket", () => {
  it("classifies the C marker", () => {
    expect(sourceBucket("[C]")).toBe("[C]")
  })

  it("extracts the addon name from an AddOns path", () => {
    expect(sourceBucket("user:/AddOns/TemperInventory/src/main.lua")).toBe("AddOns/TemperInventory")
    expect(sourceBucket("AddOns/LibAddonMenu-2.0/LibAddonMenu-2.0.lua")).toBe(
      "AddOns/LibAddonMenu-2.0"
    )
  })

  it("classifies base-game EsoUI paths", () => {
    expect(sourceBucket("EsoUI/Ingame/Inventory/Inventory.lua")).toBe("EsoUI/")
  })

  it("falls back to other for an unrecognized source", () => {
    expect(sourceBucket("some/unknown/path.lua")).toBe("other")
  })
})

describe("bucketBySource", () => {
  it("sums self/inclusive/count per bucket and sorts by self ms desc", () => {
    const entries: ResolvedEntry[] = [
      {
        kind: "closure",
        name: "a",
        source: "EsoUI/x.lua",
        line: 1,
        callCount: 2,
        inclusiveNs: 3_000_000,
        selfNs: 2_000_000,
      },
      {
        kind: "closure",
        name: "b",
        source: "EsoUI/y.lua",
        line: 1,
        callCount: 1,
        inclusiveNs: 1_000_000,
        selfNs: 1_000_000,
      },
      {
        kind: "closure",
        name: "c",
        source: "user:/AddOns/Temper/z.lua",
        line: 1,
        callCount: 5,
        inclusiveNs: 500_000,
        selfNs: 500_000,
      },
    ]
    const buckets = bucketBySource(entries)
    expect(buckets).toEqual([
      { source: "EsoUI/", selfMs: 3, inclusiveMs: 4, callCount: 3 },
      { source: "AddOns/Temper", selfMs: 0.5, inclusiveMs: 0.5, callCount: 5 },
    ])
  })
})

describe("selectTop", () => {
  const entries: ResolvedEntry[] = [
    {
      kind: "closure",
      name: "low",
      source: "s",
      line: 1,
      callCount: 1,
      inclusiveNs: 100_000,
      selfNs: 100_000,
    },
    {
      kind: "closure",
      name: "high",
      source: "s",
      line: 2,
      callCount: 1,
      inclusiveNs: 900_000,
      selfNs: 50_000,
    },
    {
      kind: "closure",
      name: "mid",
      source: "s",
      line: 3,
      callCount: 1,
      inclusiveNs: 400_000,
      selfNs: 400_000,
    },
  ]

  it("orders by inclusive ns desc and caps at n", () => {
    const top = selectTop(entries, "inclusive", 2)
    expect(top.map((e) => e.name)).toEqual(["high", "mid"])
    expect(top[0]).toEqual({
      kind: "closure",
      name: "high",
      source: "s",
      line: 2,
      callCount: 1,
      inclusiveMs: 0.9,
      selfMs: 0.1,
    })
  })

  it("orders by self ns desc — a different ranking than inclusive", () => {
    const top = selectTop(entries, "self", 3)
    expect(top.map((e) => e.name)).toEqual(["mid", "low", "high"])
  })

  it("returns all entries when n exceeds the count", () => {
    expect(selectTop(entries, "self", 99)).toHaveLength(3)
  })
})
