import { describe, expect, it } from "bun:test"
import type {
  CadwellProgress,
  CadwellZone,
  CharacterCompletion,
} from "@temper/game-completion/completion-types"
import {
  CADWELL_TOTAL_COUNT,
  cadwellCompletedCount,
  cadwellCoordinatesUnder,
  isCadwellCoordinateComplete,
} from "./completion-cadwell-lookup"
import { cadwellData } from "./generated/cadwell-data.generated"

function buildCadwell(
  levelRotation: number,
  undone: ReadonlySet<string> = new Set()
): CadwellProgress {
  const levels: CadwellProgress["levels"] = {}

  for (let slot = 0; slot < cadwellData.length; slot++) {
    const source = cadwellData[(slot + levelRotation) % cadwellData.length]
    if (source === undefined) throw new Error("fixture: cadwellData slot missing")

    const zones: Record<number, CadwellZone> = {}
    source.zones.forEach((zone, zoneSlot) => {
      const pois: CadwellZone["pois"] = {}
      zone.pois.forEach((poi, poiSlot) => {
        pois[poi.poiIndex] = {
          name: poi.name,
          openingText: "",
          closingText: "",
          order: poiSlot,
          discovered: true,
          completed: !undone.has(`${zone.name} ${poi.name}`),
        }
      })
      zones[zone.zoneIndex] = { name: zone.name, description: "", order: zoneSlot, pois }
    })

    levels[slot] = { zones }
  }

  return { progressionLevel: 2, levels }
}

function completionOf(cadwell: CadwellProgress | undefined): CharacterCompletion {
  return { cadwell } satisfies CharacterCompletion
}

const firstLevel = cadwellData[0]
const firstZone = firstLevel?.zones[0]
const firstPoi = firstZone?.pois[0]
if (firstLevel === undefined || firstZone === undefined || firstPoi === undefined) {
  throw new Error("fixture: cadwellData[0].zones[0].pois[0] missing")
}
const secondZone = firstLevel.zones[1]
if (secondZone === undefined) throw new Error("fixture: cadwellData[0].zones[1] missing")

describe("cadwell coordinates", () => {
  it("covers every static POI", () => {
    expect(cadwellCoordinatesUnder([]).length).toBe(CADWELL_TOTAL_COUNT)
  })

  it("narrows to a level, a zone and a single POI", () => {
    const levelCount = firstLevel.zones.reduce((sum, z) => sum + z.pois.length, 0)
    expect(cadwellCoordinatesUnder([firstLevel.level]).length).toBe(levelCount)
    expect(cadwellCoordinatesUnder([firstLevel.level, firstZone.zoneIndex]).length).toBe(
      firstZone.pois.length
    )
    expect(
      cadwellCoordinatesUnder([firstLevel.level, firstZone.zoneIndex, firstPoi.poiIndex]).length
    ).toBe(1)
  })

  it("yields nothing for a coordinate outside the static data", () => {
    expect(cadwellCoordinatesUnder([999]).length).toBe(0)
    expect(cadwellCoordinatesUnder([firstLevel.level, 999]).length).toBe(0)
  })
})

describe("cadwellCompletedCount", () => {
  it("counts a full almanac laid out exactly like the static data", () => {
    expect(cadwellCompletedCount(completionOf(buildCadwell(0)))).toBe(CADWELL_TOTAL_COUNT)
  })

  it("counts a full almanac whose levels are rotated, as another alliance reports them", () => {
    for (let rotation = 1; rotation < cadwellData.length; rotation++) {
      expect(cadwellCompletedCount(completionOf(buildCadwell(rotation)))).toBe(CADWELL_TOTAL_COUNT)
    }
  })

  it("counts nothing when the character carries no almanac at all", () => {
    expect(cadwellCompletedCount(completionOf(undefined))).toBe(0)
    expect(cadwellCompletedCount(null)).toBe(0)
  })

  it("misses exactly the POI left undone, wherever the level sits", () => {
    const undone = new Set([`${firstZone.name} ${firstPoi.name}`])
    for (let rotation = 0; rotation < cadwellData.length; rotation++) {
      expect(cadwellCompletedCount(completionOf(buildCadwell(rotation, undone)))).toBe(
        CADWELL_TOTAL_COUNT - 1
      )
    }
  })
})

describe("isCadwellCoordinateComplete", () => {
  it("resolves a static coordinate against a rotated almanac by name", () => {
    const coordinate = cadwellCoordinatesUnder([
      firstLevel.level,
      firstZone.zoneIndex,
      firstPoi.poiIndex,
    ])[0]
    if (coordinate === undefined) throw new Error("fixture: coordinate missing")

    for (let rotation = 0; rotation < cadwellData.length; rotation++) {
      expect(isCadwellCoordinateComplete(completionOf(buildCadwell(rotation)), coordinate)).toBe(
        true
      )
    }
  })

  it("reports the undone POI incomplete and leaves its neighbours alone", () => {
    const undone = new Set([`${firstZone.name} ${firstPoi.name}`])
    const completion = completionOf(buildCadwell(1, undone))

    for (const coordinate of cadwellCoordinatesUnder([firstLevel.level, firstZone.zoneIndex])) {
      expect(isCadwellCoordinateComplete(completion, coordinate)).toBe(
        coordinate.poiName !== firstPoi.name
      )
    }
    for (const coordinate of cadwellCoordinatesUnder([firstLevel.level, secondZone.zoneIndex])) {
      expect(isCadwellCoordinateComplete(completion, coordinate)).toBe(true)
    }
  })
})
