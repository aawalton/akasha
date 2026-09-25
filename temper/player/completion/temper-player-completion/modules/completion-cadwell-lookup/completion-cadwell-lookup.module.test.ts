import { describe, expect, test } from "bun:test"
import type {
  CadwellProgress,
  CadwellZone,
  CharacterCompletion,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import {
  type CadwellLevelCatalogEntry,
  cadwellCoordinates,
  cadwellTotalCount,
  isCadwellCoordinateComplete,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-cadwell-lookup/completion-cadwell-lookup.module.code.ts"

const LEVEL_CATALOG: readonly CadwellLevelCatalogEntry[] = [
  {
    title: "Level 0",
    displayOrder: 0,
    cadwellStops: [
      { zoneIndex: 1, zoneName: "Auridon", stopIndex: 4, poiName: "Vulkhel Guard" },
      { zoneIndex: 1, zoneName: "Auridon", stopIndex: 1, poiName: "Tanzelwil" },
      { zoneIndex: 1, zoneName: "Auridon", stopIndex: 5, poiName: "Mathiisen" },
      { zoneIndex: 1, zoneName: "Auridon", stopIndex: 3, poiName: "Skywatch" },
      { zoneIndex: 1, zoneName: "Auridon", stopIndex: 2, poiName: "Firsthold" },
      { zoneIndex: 2, zoneName: "Grahtwood", stopIndex: 2, poiName: "Southpoint" },
      { zoneIndex: 2, zoneName: "Grahtwood", stopIndex: 1, poiName: "Reliquary of Stars" },
      { zoneIndex: 2, zoneName: "Grahtwood", stopIndex: 3, poiName: "Falinesti Winter Site" },
      { zoneIndex: 2, zoneName: "Grahtwood", stopIndex: 4, poiName: "Elden Root" },
    ],
  },
  {
    title: "Silver",
    displayOrder: 1,
    cadwellStops: [
      { zoneIndex: 4, zoneName: "Stonefalls", stopIndex: 4, poiName: "Davon's Watch" },
      { zoneIndex: 4, zoneName: "Stonefalls", stopIndex: 5, poiName: "Othrenis" },
      { zoneIndex: 4, zoneName: "Stonefalls", stopIndex: 2, poiName: "Ash Mountain" },
      { zoneIndex: 4, zoneName: "Stonefalls", stopIndex: 6, poiName: "Vivec's Antlers" },
      { zoneIndex: 4, zoneName: "Stonefalls", stopIndex: 1, poiName: "Fort Virak" },
      { zoneIndex: 4, zoneName: "Stonefalls", stopIndex: 7, poiName: "Kragenmoor" },
      { zoneIndex: 4, zoneName: "Stonefalls", stopIndex: 3, poiName: "Tormented Spire" },
      { zoneIndex: 1, zoneName: "Deshaan", stopIndex: 1, poiName: "Obsidian Gorge" },
      { zoneIndex: 1, zoneName: "Deshaan", stopIndex: 4, poiName: "Mournhold" },
      { zoneIndex: 1, zoneName: "Deshaan", stopIndex: 3, poiName: "Tribunal Temple" },
      { zoneIndex: 1, zoneName: "Deshaan", stopIndex: 5, poiName: "Shrine of Saint Veloth" },
      { zoneIndex: 1, zoneName: "Deshaan", stopIndex: 2, poiName: "Eidolon's Hollow" },
    ],
  },
  {
    title: "Gold",
    displayOrder: 2,
    cadwellStops: [
      { zoneIndex: 3, zoneName: "Glenumbra", stopIndex: 2, poiName: "Beldama Wyrd Tree" },
      { zoneIndex: 3, zoneName: "Glenumbra", stopIndex: 1, poiName: "Camlorn" },
      { zoneIndex: 3, zoneName: "Glenumbra", stopIndex: 4, poiName: "Lion Guard Redoubt" },
      { zoneIndex: 3, zoneName: "Glenumbra", stopIndex: 3, poiName: "Cath Bedraud" },
      { zoneIndex: 5, zoneName: "Stormhaven", stopIndex: 4, poiName: "Alcaire Keep" },
      { zoneIndex: 5, zoneName: "Stormhaven", stopIndex: 3, poiName: "Firebrand Keep" },
      { zoneIndex: 5, zoneName: "Stormhaven", stopIndex: 5, poiName: "Pariah Abbey" },
      { zoneIndex: 5, zoneName: "Stormhaven", stopIndex: 1, poiName: "Shinji's Scarp" },
    ],
  },
]

const TOTAL_COUNT = cadwellTotalCount(LEVEL_CATALOG)

function buildCadwell(
  levelRotation: number,
  undone: ReadonlySet<string> = new Set()
): CadwellProgress {
  const levels: CadwellProgress["levels"] = {}

  for (let slot = 0; slot < LEVEL_CATALOG.length; slot++) {
    const source = LEVEL_CATALOG[(slot + levelRotation) % LEVEL_CATALOG.length]
    if (source === undefined) throw new Error("fixture: catalog slot missing")

    const zones: Record<number, CadwellZone> = {}
    let zoneSlot = 0
    for (const stop of source.cadwellStops) {
      let zone = zones[stop.zoneIndex]
      if (zone === undefined) {
        zone = { name: stop.zoneName, description: "", order: zoneSlot, pois: {} }
        zones[stop.zoneIndex] = zone
        zoneSlot += 1
      }
      zone.pois[stop.stopIndex] = {
        name: stop.poiName,
        openingText: "",
        closingText: "",
        order: Object.keys(zone.pois).length,
        discovered: true,
        completed: !undone.has(`${stop.zoneName} ${stop.poiName}`),
      }
    }

    levels[slot] = { zones }
  }

  return { progressionLevel: 2, levels }
}

function completionOf(cadwell: CadwellProgress | undefined): CharacterCompletion {
  return { cadwell } satisfies CharacterCompletion
}

const FIRST_LEVEL = LEVEL_CATALOG[0]
if (FIRST_LEVEL === undefined) throw new Error("fixture: catalog level missing")
const FIRST_STOP = FIRST_LEVEL.cadwellStops[0]
if (FIRST_STOP === undefined) throw new Error("fixture: catalog stop missing")
const SECOND_ZONE_STOP = FIRST_LEVEL.cadwellStops.find((s) => s.zoneIndex !== FIRST_STOP.zoneIndex)
if (SECOND_ZONE_STOP === undefined) throw new Error("fixture: second zone missing")

describe("cadwell coordinates", () => {
  test("covers every stop the catalog holds", () => {
    expect(cadwellCoordinates(LEVEL_CATALOG).length).toBe(TOTAL_COUNT)
  })

  test("takes a tier from the level's display order and an index from the stop", () => {
    const [first] = cadwellCoordinates([FIRST_LEVEL])
    if (first === undefined) throw new Error("fixture: coordinate missing")

    expect(first.level).toBe(FIRST_LEVEL.displayOrder)
    expect(first.zoneIndex).toBe(FIRST_STOP.zoneIndex)
    expect(first.zoneName).toBe(FIRST_STOP.zoneName)
    expect(first.poiIndex).toBe(FIRST_STOP.stopIndex)
    expect(first.poiName).toBe(FIRST_STOP.poiName)
  })
})

describe("isCadwellCoordinateComplete", () => {
  test("resolves a catalog coordinate against a rotated almanac by name", () => {
    const coordinate = cadwellCoordinates([FIRST_LEVEL]).find(
      (c) => c.zoneIndex === FIRST_STOP.zoneIndex && c.poiIndex === FIRST_STOP.stopIndex
    )
    if (coordinate === undefined) throw new Error("fixture: coordinate missing")

    for (let rotation = 0; rotation < LEVEL_CATALOG.length; rotation++) {
      expect(isCadwellCoordinateComplete(completionOf(buildCadwell(rotation)), coordinate)).toBe(
        true
      )
    }
  })

  test("reports the undone POI incomplete and leaves its neighbours alone", () => {
    const undone = new Set([`${FIRST_STOP.zoneName} ${FIRST_STOP.poiName}`])
    const completion = completionOf(buildCadwell(1, undone))
    const inFirstLevel = cadwellCoordinates([FIRST_LEVEL])

    for (const coordinate of inFirstLevel.filter((c) => c.zoneIndex === FIRST_STOP.zoneIndex)) {
      expect(isCadwellCoordinateComplete(completion, coordinate)).toBe(
        coordinate.poiName !== FIRST_STOP.poiName
      )
    }
    for (const coordinate of inFirstLevel.filter(
      (c) => c.zoneIndex === SECOND_ZONE_STOP.zoneIndex
    )) {
      expect(isCadwellCoordinateComplete(completion, coordinate)).toBe(true)
    }
  })

  test("keeps two stops sharing a name apart by the zone each sits in", () => {
    const catalog: readonly CadwellLevelCatalogEntry[] = [
      {
        title: "Shared",
        displayOrder: 0,
        cadwellStops: [
          { zoneIndex: 1, zoneName: "Auridon", stopIndex: 1, poiName: "Wayrest" },
          { zoneIndex: 2, zoneName: "Grahtwood", stopIndex: 1, poiName: "Wayrest" },
        ],
      },
    ]
    const stop = (completed: boolean) => ({
      name: "Wayrest",
      openingText: "",
      closingText: "",
      order: 0,
      discovered: true,
      completed,
    })
    const cadwell: CadwellProgress = {
      progressionLevel: 0,
      levels: {
        0: {
          zones: {
            1: { name: "Auridon", description: "", order: 0, pois: { 1: stop(true) } },
            2: { name: "Grahtwood", description: "", order: 1, pois: { 1: stop(false) } },
          },
        },
      },
    }
    const completion = completionOf(cadwell)
    const [inAuridon, inGrahtwood] = cadwellCoordinates(catalog)
    if (inAuridon === undefined || inGrahtwood === undefined) {
      throw new Error("fixture: coordinate missing")
    }

    expect(isCadwellCoordinateComplete(completion, inAuridon)).toBe(true)
    expect(isCadwellCoordinateComplete(completion, inGrahtwood)).toBe(false)
  })
})
