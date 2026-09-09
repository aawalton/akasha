import { ACHIEVEMENT_ITEMS } from "../map-pins-achievement-items/map-pins-achievement-items.module.code.ts"
import { ACHIEVEMENTS } from "../map-pins-achievements/map-pins-achievements.module.code.ts"
import { BOSSES } from "../map-pins-bosses/map-pins-bosses.module.code.ts"
import { CHEST_DATA } from "../map-pins-chests/map-pins-chests.module.code.ts"
import { CUSTOM_PINS } from "../map-pins-config/map-pins-config.module.code.ts"
import { LOREBOOKS } from "../map-pins-lorebooks/map-pins-lorebooks.module.code.ts"
import { ADDON_NAME, TEXTURE_ROOT } from "../map-pins-names/map-pins-names.module.code.ts"
import {
  asNestedPinTable,
  asNumber,
  asOptNumber,
  asOptString,
  asStringNumberMap,
  asSubzonePinTable,
} from "../map-pins-narrow/map-pins-narrow.module.code.ts"
import {
  getChestData,
  getSavedVars,
} from "../map-pins-saved-variables/map-pins-saved-variables.module.code.ts"
import { SKY_SHARDS } from "../map-pins-sky-shards/map-pins-sky-shards.module.code.ts"
import { getPinManager, getPinTypeId, STATE } from "../map-pins-state/map-pins-state.module.code.ts"
import { getSubzone } from "../map-pins-subzone/map-pins-subzone.module.code.ts"
import { TIME_BREACH } from "../map-pins-time-breach/map-pins-time-breach.module.code.ts"
import { ZONE_ACHIEVEMENT } from "../map-pins-zone-achievement/map-pins-zone-achievement.module.code.ts"

const bossesTable = asSubzonePinTable(BOSSES)
const skyShardsTable = asSubzonePinTable(SKY_SHARDS)
const timeBreachTable = asSubzonePinTable(TIME_BREACH)
const achievementsTable = asNestedPinTable(ACHIEVEMENTS)
const lorebooksTable = asSubzonePinTable(LOREBOOKS)
const chestTable = asNestedPinTable(CHEST_DATA)
const zoneAchievementTable = asStringNumberMap(ZONE_ACHIEVEMENT)

export function compassPinAddCallback(this: void, i: number): undefined {
  if (
    STATE.updatingCompassPin[i] === true ||
    GetMapType() > MAPTYPE_ZONE ||
    !getPinManager().IsCustomPinEnabled(getPinTypeId(i))
  ) {
    return
  }
  const mapContentType = GetMapContentType()
  if ((i === 1 || i === 2) && mapContentType !== MAP_CONTENT_DUNGEON) return
  if (i === 5 && mapContentType === MAP_CONTENT_DUNGEON && IsUnitUsingVeteranDifficulty("player")) {
    return
  }
  STATE.updatingCompassPin[i] = true
  if (!IsPlayerActivated()) {
    EVENT_MANAGER.RegisterForEvent(`${ADDON_NAME}_CompassPin_${i}`, EVENT_PLAYER_ACTIVATED, () => {
      EVENT_MANAGER.UnregisterForEvent(`${ADDON_NAME}_CompassPin_${i}`, EVENT_PLAYER_ACTIVATED)
      STATE.updatingCompassPin[i] = false
      compassPinAddCallback(i)
    })
    return
  }
  const subzone = getSubzone()
  const pin = CUSTOM_PINS[i]
  if (pin === undefined) {
    STATE.updatingCompassPin[i] = false
    return
  }
  if (i <= 4) {
    const mapData = i === 3 || i === 4 ? skyShardsTable[subzone] : bossesTable[subzone]
    if (mapData !== undefined) {
      for (const pinData of mapData) {
        const [achName, completed, required] = GetAchievementCriterion(
          asNumber(pinData[2]),
          asNumber(pinData[3])
        )
        if ((completed === required) === pin.done && achName !== "") {
          COMPASS_PINS.pinManager.CreatePin(
            pin.name,
            achName,
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  } else if (i === 15) {
    const mapData = timeBreachTable[subzone]
    const [level] = GetSkillLineXPInfo(5, STATE.psijicSkillLine)
    let num = 1
    if (mapData !== undefined) {
      let i1 = 1
      for (const pinData of mapData) {
        const closedZone = getSavedVars().TimeBreachClosed[subzone]
        const closed = closedZone !== undefined && closedZone[i1] === true
        if (pinData[2] === level / 10 + 2 && !closed) {
          COMPASS_PINS.pinManager.CreatePin(
            pin.name,
            `TimeRift${num}`,
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
          num = num + 1
        }
        i1 = i1 + 1
      }
    }
  } else if (i >= 50) {
    const zoneData = achievementsTable[subzone]
    let num = 1
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const pinData of mapData) {
          let achName = asOptString(pinData[2]) ?? ""
          let completed: boolean | undefined
          if (i === 43) {
            const zone = zoneAchievementTable[subzone]
            if (zone !== undefined) {
              achName = "Lightbringer"
              const [, c1, r1] = GetAchievementCriterion(873, zone)
              const [, c2, r2] = GetAchievementCriterion(871, zone)
              const [, c3, r3] = GetAchievementCriterion(869, zone)
              completed = c1 + c2 + c3 >= r1 + r2 + r3
            }
          } else if (pinData[3] !== undefined) {
            const [name, c1, r1] = GetAchievementCriterion(
              asNumber(pinData[2]),
              asNumber(pinData[3])
            )
            achName = name
            completed = c1 >= r1
          } else {
            completed = IsAchievementComplete(asNumber(pinData[2]))
          }
          const achId = asNumber(pinData[2])
          const critId = asOptNumber(pinData[3])
          const itemRow = ACHIEVEMENT_ITEMS[achId]
          const haveItem = itemRow !== undefined && critId !== undefined && itemRow[critId] === true
          if (completed === pin.done && haveItem === pin.done) {
            COMPASS_PINS.pinManager.CreatePin(
              pin.name,
              `${achName}${num}`,
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
            num = num + 1
          }
        }
      }
    }
  } else if (i === 5) {
    const mapData = lorebooksTable[subzone]
    if (mapData !== undefined) {
      for (const pinData of mapData) {
        const [achName, , done] = GetLoreBookInfo(1, asNumber(pinData[2]), asNumber(pinData[3]))
        if (done === pin.done && achName !== "") {
          COMPASS_PINS.pinManager.CreatePin(
            pin.name,
            `${achName}${tostring(pinData[0])}`,
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  } else if (i === 7) {
    const mapData = chestTable[subzone]
    if (mapData !== undefined) {
      const [, , , , , findersKeepers] = GetSkillAbilityInfo(5, 4, 1)
      for (const [chType, chData] of pairs(mapData)) {
        let chest = 1
        for (const pinData of chData) {
          if (chType === 1 || findersKeepers === true) {
            COMPASS_PINS.pinManager.CreatePin(
              pin.name,
              `Chest_${subzone}_${chType}_${chest}`,
              asNumber(pinData[0]),
              asNumber(pinData[1])
            )
          }
          chest = chest + 1
        }
      }
    }
    const customData = getChestData()[subzone]
    if (customData !== undefined) {
      let chest = 1
      for (const pinData of customData) {
        COMPASS_PINS.pinManager.CreatePin(
          pin.name,
          `Chest_${subzone}_3_${chest}`,
          asNumber(pinData[0]),
          asNumber(pinData[1])
        )
        chest = chest + 1
      }
    }
  }
  STATE.updatingCompassPin[i] = false
}

export function addCompassCustomPin(this: void, _id: number, i: number): undefined {
  if (
    COMPASS_PINS !== undefined &&
    (i === 3 || i === 5 || i === 7 || i === 15 || i === 16 || i >= 50)
  ) {
    const pin = CUSTOM_PINS[i]
    if (pin === undefined) return
    const pinFilter = pin.filter ?? i
    if (getSavedVars()[pinFilter] === true) {
      const compassPinLayout: CompassPinLayout = {
        maxDistance: 0.05,
        level: 30,
        size: 40,
        texture: typeof pin.texture === "string" ? pin.texture : `/${TEXTURE_ROOT}/Treasure_1.dds`,
      }
      COMPASS_PINS.AddCustomPin(pin.name, () => compassPinAddCallback(i), compassPinLayout)
      COMPASS_PINS.RefreshPins(pin.name)
    } else {
      COMPASS_PINS.pinManager.RemovePins(pin.name)
    }
  }
}
