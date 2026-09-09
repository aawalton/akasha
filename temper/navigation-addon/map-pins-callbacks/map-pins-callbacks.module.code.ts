import { ACHIEVEMENTS } from "../map-pins-achievements/map-pins-achievements.module.code.ts"
import { ALLIANCE_COLORS } from "../map-pins-alliance-colors/map-pins-alliance-colors.module.code.ts"
import { LOOT_MAP_PIN_CALLBACKS } from "../map-pins-callbacks-loot/map-pins-callbacks-loot.module.code.ts"
import { CUSTOM_PINS } from "../map-pins-config/map-pins-config.module.code.ts"
import type { PinList } from "../map-pins-data-types/map-pins-data-types.module.code.ts"
import { FISH_ICON } from "../map-pins-fish-icon/map-pins-fish-icon.module.code.ts"
import { FISHING_BUG_FIX } from "../map-pins-fishing-bug-fix/map-pins-fishing-bug-fix.module.code.ts"
import { FISHING_NODES } from "../map-pins-fishing-nodes/map-pins-fishing-nodes.module.code.ts"
import { FISHING_ZONES } from "../map-pins-fishing-zones/map-pins-fishing-zones.module.code.ts"
import { IMPERIAL_CITY } from "../map-pins-imperial-city/map-pins-imperial-city.module.code.ts"
import {
  asFishingBugFixTable,
  asNestedPinTable,
  asNumber,
  asPinTag,
  asString,
  asStringList,
  asStringNumberMap,
  asSubzonePinTable,
} from "../map-pins-narrow/map-pins-narrow.module.code.ts"
import type { MapPinCallbackFn } from "../map-pins-pin-types/map-pins-pin-types.module.code.ts"
import { getSavedVars } from "../map-pins-saved-variables/map-pins-saved-variables.module.code.ts"
import { SHRINE_ICON } from "../map-pins-shrine-icon/map-pins-shrine-icon.module.code.ts"
import { SHRINES } from "../map-pins-shrines/map-pins-shrines.module.code.ts"
import { getPinManager, getPinTypeId, STATE } from "../map-pins-state/map-pins-state.module.code.ts"
import { TIME_BREACH } from "../map-pins-time-breach/map-pins-time-breach.module.code.ts"
import { loc } from "../map-pins-ui-strings/map-pins-ui-strings.module.code.ts"
import { VOLENDRUNG } from "../map-pins-volendrung/map-pins-volendrung.module.code.ts"
import { ZONE_ACHIEVEMENT } from "../map-pins-zone-achievement/map-pins-zone-achievement.module.code.ts"

const timeBreach = asSubzonePinTable(TIME_BREACH)
const shrines = asSubzonePinTable(SHRINES)
const fishingNodes = asSubzonePinTable(FISHING_NODES)
const volendrung = asSubzonePinTable(VOLENDRUNG)
const imperialCity = asNestedPinTable(IMPERIAL_CITY)
const achievements = asNestedPinTable(ACHIEVEMENTS)
const fishingZones = asStringNumberMap(FISHING_ZONES)
const fishingBugFix = asFishingBugFixTable(FISHING_BUG_FIX)
const zoneAchievement = asStringNumberMap(ZONE_ACHIEVEMENT)
const shrineIcon = asStringList(SHRINE_ICON)
const fishIcon = asStringList(FISH_ICON)

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

const FISHING_WATERS = ["Lake", "Foul", "River", "Salt", "Oily", "Mystic", "Running"] as const

function getFishingAchievement(this: void, subzone: string): Record<number, boolean> | false {
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
          const [matchCapture] = string.match(achName, "(" + loc(water) + ")")
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

export const MAP_PIN_CALLBACK: Record<number, MapPinCallbackFn | undefined> = {
  ...LOOT_MAP_PIN_CALLBACKS,
  [15]: (i: number, subzone: string): undefined => {
    const def = CUSTOM_PINS[i]
    if (def === undefined) return
    const mapData = timeBreach[subzone]
    const [level] = GetSkillLineXPInfo(5, STATE.psijicSkillLine)
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
    const def = CUSTOM_PINS[i]
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
    const def = CUSTOM_PINS[i]
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
      notDone = getFishingAchievement(sz)
      createFishingPins()
      sz = "u48_overland_base_west"
    }
    mapData = fishingNodes[sz]
    notDone = getFishingAchievement(sz)
    createFishingPins()
  },
  [21]: (i: number, subzone: string): undefined => {
    const def = CUSTOM_PINS[i]
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
    const def = CUSTOM_PINS[i]
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
    const def = CUSTOM_PINS[i]
    if (def === undefined) return
    const zoneData = imperialCity[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [i1, pinData] of ipairs(mapData)) {
          const colors = ALLIANCE_COLORS[asNumber(pinData[2])]
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
    const def = CUSTOM_PINS[i]
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
    const def = CUSTOM_PINS[i]
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
    const def = CUSTOM_PINS[i]
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
    const def = CUSTOM_PINS[i]
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
