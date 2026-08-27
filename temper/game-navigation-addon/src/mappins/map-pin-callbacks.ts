import { AllianceColors } from "./alliance-colors"
import { CustomPins } from "./custom-pins-config"
import type { PinList } from "./data/data-types"
import { Achievements } from "./data/generated/achievements-data.generated"
import { FishIcon } from "./data/generated/fish-icon-data.generated"
import { FishingBugFix } from "./data/generated/fishing-bug-fix-data.generated"
import { FishingNodes } from "./data/generated/fishing-nodes-data.generated"
import { FishingZones } from "./data/generated/fishing-zones-data.generated"
import { ImperialCity } from "./data/generated/imperial-city-data.generated"
import { ShrineIcon } from "./data/generated/shrine-icon-data.generated"
import { Shrines } from "./data/generated/shrines-data.generated"
import { TimeBreach } from "./data/generated/time-breach-data.generated"
import { Volendrung } from "./data/generated/volendrung-data.generated"
import { ZoneAchievement } from "./data/generated/zone-achievement-data.generated"
import { lootMapPinCallbacks } from "./map-pin-callbacks-loot"
import {
  asFishingBugFixTable,
  asNestedPinTable,
  asNumber,
  asPinTag,
  asString,
  asStringList,
  asStringNumberMap,
  asSubzonePinTable,
} from "./narrow"
import type { MapPinCallbackFn } from "./pin-types"
import { getSavedVars } from "./saved-variables"
import { getPinManager, getPinTypeId, state } from "./state"
import { Loc } from "./ui-strings"

const timeBreach = asSubzonePinTable(TimeBreach)
const shrines = asSubzonePinTable(Shrines)
const fishingNodes = asSubzonePinTable(FishingNodes)
const volendrung = asSubzonePinTable(Volendrung)
const imperialCity = asNestedPinTable(ImperialCity)
const achievements = asNestedPinTable(Achievements)
const fishingZones = asStringNumberMap(FishingZones)
const fishingBugFix = asFishingBugFixTable(FishingBugFix)
const zoneAchievement = asStringNumberMap(ZoneAchievement)
const shrineIcon = asStringList(ShrineIcon)
const fishIcon = asStringList(FishIcon)

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

const FISHING_WATERS = ["Lake", "Foul", "River", "Salt", "Oily", "Mystic", "Running"] as const

function GetFishingAchievement(this: void, subzone: string): Record<number, boolean> | false {
  const id = fishingZones[subzone] ?? fishingZones[GetCurrentMapZoneIndex()]
  if (id !== undefined) {
    const total: Record<string, number> = {
      Lake: 0,
      Foul: 0,
      River: 0,
      Salt: 0,
      Oily: 0,
      Mystic: 0,
      Running: 0,
    }
    for (let i = 1; i <= GetAchievementNumCriteria(id); i++) {
      const [achName, a, b] = GetAchievementCriterion(id, i)
      const bugFixZone = fishingBugFix[id]
      const bugFixWater = bugFixZone === undefined ? undefined : bugFixZone[i]
      if (bugFixWater !== undefined) {
        total[bugFixWater] = (total[bugFixWater] ?? 0) + b - a
      } else {
        for (const water of FISHING_WATERS) {
          const [matchCapture] = string.match(achName, "(" + Loc(water) + ")")
          const match = parseLuaCapture(matchCapture)
          if (match !== undefined) {
            total[water] = (total[water] ?? 0) + b - a
          }
        }
      }
    }
    total.Salt = (total.Salt ?? 0) + (total.Mystic ?? 0)
    total.Foul = (total.Foul ?? 0) + (total.Oily ?? 0)
    total.River = (total.River ?? 0) + (total.Running ?? 0)
    return {
      [1]: (total.Foul ?? 0) > 0,
      [2]: (total.River ?? 0) > 0,
      [3]: (total.Salt ?? 0) > 0,
      [4]: (total.Lake ?? 0) > 0,
    }
  }
  return false
}

export const MapPinCallback: Record<number, MapPinCallbackFn | undefined> = {
  ...lootMapPinCallbacks,
  [15]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const mapData = timeBreach[subzone]
    const [level] = GetSkillLineXPInfo(5, state.psijicSkillLine)
    if (mapData !== undefined) {
      for (const [i1, pinData] of ipairs(mapData)) {
        const closedZone = getSavedVars().TimeBreachClosed[subzone]
        if (
          pinData[2] === level / 10 + 2 &&
          !(closedZone !== undefined && closedZone[i1] === true)
        ) {
          getPinManager().CreatePin(
            getPinTypeId(i),
            asPinTag({ [1]: i, [2]: pinData[2], [3]: pinData[3] }),
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  },
  [16]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const mapData = shrines[subzone]
    if (mapData !== undefined) {
      for (const [, pinData] of ipairs(mapData)) {
        const shrineIdx = asNumber(pinData[2]) - 1
        def.texture = shrineIcon[shrineIdx]
        getPinManager().CreatePin(
          getPinTypeId(i),
          asPinTag({ [1]: i, texture: shrineIcon[shrineIdx] }),
          asNumber(pinData[0]),
          asNumber(pinData[1])
        )
      }
    }
  },
  [17]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    let mapData: PinList | undefined
    let notDone: Record<number, boolean> | false = false
    const createFishingPins = (): undefined => {
      if (mapData !== undefined && notDone !== false) {
        for (const [, pinData] of ipairs(mapData)) {
          if (notDone[asNumber(pinData[2])] === true) {
            const fishIdx = asNumber(pinData[2]) - 1
            def.texture = fishIcon[fishIdx]
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, texture: fishIcon[fishIdx] }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          }
        }
      }
    }
    let sz = subzone
    if (sz === "u48_overland_base") {
      sz = "u48_overland_base_east"
      mapData = fishingNodes[sz]
      notDone = GetFishingAchievement(sz)
      createFishingPins()
      sz = "u48_overland_base_west"
    }
    mapData = fishingNodes[sz]
    notDone = GetFishingAchievement(sz)
    createFishingPins()
  },
  [21]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const mapData = volendrung[subzone]
    if (mapData !== undefined) {
      for (const [i1, pinData] of ipairs(mapData)) {
        getPinManager().CreatePin(
          getPinTypeId(i),
          asPinTag({ [1]: i, name: "Volendrung" + tostring(i1) }),
          asNumber(pinData[0]),
          asNumber(pinData[1])
        )
      }
    }
  },
  [76]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const zoneData = imperialCity[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [, pinData] of ipairs(mapData)) {
          getPinManager().CreatePin(
            getPinTypeId(i),
            asPinTag({ [1]: i, name: asString(pinData[2]) }),
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  },
  [77]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const zoneData = imperialCity[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [i1, pinData] of ipairs(mapData)) {
          const colors = AllianceColors[asNumber(pinData[2])]
          if (colors !== undefined) {
            def.tint = ZO_ColorDef.New(colors[0], colors[1], colors[2], colors[3])
          }
          getPinManager().CreatePin(
            getPinTypeId(i),
            asPinTag({ [1]: i, name: "ImperialCityRespawn" + tostring(i1) }),
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  },
  [43]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const zoneData = achievements[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [, pinData] of ipairs(mapData)) {
          let completed: boolean | undefined
          const zone = zoneAchievement[subzone]
          if (zone !== undefined) {
            const [, c1, r1] = GetAchievementCriterion(873, zone)
            const [, c2, r2] = GetAchievementCriterion(871, zone)
            const [, c3, r3] = GetAchievementCriterion(869, zone)
            completed = c1 + c2 + c3 >= r1 + r2 + r3
          }
          if (completed !== true) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, [2]: pinData[2], [3]: pinData[3] }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          }
        }
      }
    }
  },
  [70]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const zoneData = achievements[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [, pinData] of ipairs(mapData)) {
          if (GetNumAntiquitiesRecovered(asNumber(pinData[2])) < 1) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({
                [1]: i,
                name: ZO_CachedStrFormat("<<C:1>>", GetAntiquityName(asNumber(pinData[2]))),
              }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          }
        }
      }
    }
  },
  [74]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const zoneData = achievements[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [, pinData] of ipairs(mapData)) {
          getPinManager().CreatePin(
            getPinTypeId(i),
            asPinTag({ [1]: i, name: "Random encounter" }),
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  },
  [26]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const zoneData = achievements[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [, pinData] of ipairs(mapData)) {
          const kind = pinData[2]
          if (kind === 1) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, name: "Oblivion portal" }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          } else if (kind === 2) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, name: "Dark Fissures" }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          } else if (kind === 3) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, name: "Celestial Rift" }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          } else if (kind === 4) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, name: "Shadow Fissures" }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          } else if (kind === 5) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, name: "Lava Lasher" }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          } else if (kind === 6) {
            getPinManager().CreatePin(
              getPinTypeId(i),
              asPinTag({ [1]: i, name: "Soul Reaper" }),
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          }
        }
      }
    }
  },
}
