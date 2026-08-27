import { describe, expect, it } from "bun:test"
import { FIND_SCRY_DIFFERENT_ZONES } from "./data/find-scry-overrides"
import { FAKE_ZONE_IDS, ZONE_IDS } from "./data/zones"

type ZoneStubs = typeof globalThis & {
  ZO_CachedStrFormat: (fmt: string, ...args: string[]) => string
  GetZoneNameById: (id: number) => string
  GetAntiquityZoneId: (id: number) => number
}

let scryZoneOf: Record<number, number> = {}

Object.assign(globalThis, {
  ZO_CachedStrFormat: (fmt: string, ...args: string[]): string =>
    fmt.replace(/<<C:(\d)>>/g, (_m, n: string) => args[Number(n) - 1] ?? ""),
  GetZoneNameById: (id: number): string => `Zone${id}`,
  GetAntiquityZoneId: (id: number): number => scryZoneOf[id] ?? 0,
} satisfies Partial<ZoneStubs>)

const { zoneDisplayName } = await import("./zone-name")
const { getAntiquityDigZoneName } = await import("./active-leads")

describe("zoneDisplayName", () => {
  it("resolves a real zone id via GetZoneNameById", () => {
    expect(zoneDisplayName(381)).toBe("Zone381")
  })

  it("resolves the All Zones / Battlegrounds fake ids to their fixed names", () => {
    expect(zoneDisplayName(FAKE_ZONE_IDS.ALLZONES)).toBe("All Zones")
    expect(zoneDisplayName(FAKE_ZONE_IDS.BGS)).toBe("Battlegrounds")
  })

  it("builds a dual-zone fake id name from its two components", () => {
    expect(zoneDisplayName(FAKE_ZONE_IDS.ARTAEUM_SUMMERSET)).toBe("Zone1027, Zone1011")
  })

  it("returns empty string for the Unknown fake id (original nil quirk)", () => {
    expect(zoneDisplayName(FAKE_ZONE_IDS.UNKNOWN)).toBe("")
  })
})

describe("getAntiquityDigZoneName", () => {
  it("returns the GetAntiquityZoneId (dig) zone", () => {
    const plainId = 999999
    scryZoneOf = { [plainId]: 57 }
    expect(getAntiquityDigZoneName(plainId)).toBe("Zone57")
  })

  it("returns the dig zone and ignores the find-scry (drop) override even when one exists", () => {
    const antiquityId = 482
    const overrideZoneId = FIND_SCRY_DIFFERENT_ZONES[antiquityId]
    expect(overrideZoneId).toBe(ZONE_IDS.GLENUMBRA)
    scryZoneOf = { [antiquityId]: ZONE_IDS.HIGHISLE }
    expect(getAntiquityDigZoneName(antiquityId)).toBe(`Zone${ZONE_IDS.HIGHISLE}`)
    expect(getAntiquityDigZoneName(antiquityId)).not.toBe(`Zone${overrideZoneId}`)
  })
})
