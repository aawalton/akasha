import { ADDON_NAME } from "./constants"
import { CustomPins } from "./custom-pins-config"
import type { SubzonePinTable } from "./data/data-types"
import { AchievementItems } from "./data/achievement-items-data"
import { Achievements } from "./data/generated/achievements-data.generated"
import { Bosses } from "./data/generated/bosses-data.generated"
import { SkyShards } from "./data/generated/sky-shards-data.generated"
import { MapPinCallback } from "./map-pin-callbacks"
import {
  asAchievementItemTable,
  asNestedPinTable,
  asNumber,
  asPinTag,
  asSubzonePinTable,
} from "./narrow"
import { getPinManager, getPinTypeId, state } from "./state"
import { getSubzone } from "./subzone"

const bosses = asSubzonePinTable(Bosses)
const skyShards = asSubzonePinTable(SkyShards)
const achievements = asNestedPinTable(Achievements)
const achievementItems = asAchievementItemTable(AchievementItems)

export function mapPinAddCallback(this: void, i: number): undefined {
  const def = CustomPins[i]
  if (def === undefined) {
    d("MapPins: " + tostring(i) + " is wrong pin type.")
    return
  }
  if (
    state.updatingMapPin[i] === true ||
    GetMapType() > MAPTYPE_ZONE ||
    !getPinManager().IsCustomPinEnabled(state.pinId[i] ?? -1)
  ) {
    return
  }
  const mapContentType = GetMapContentType()
  if (i === 5 && mapContentType === MAP_CONTENT_DUNGEON && IsUnitUsingVeteranDifficulty("player")) {
    return
  }
  if (!IsPlayerActivated()) {
    state.updatingMapPin[i] = true
    EVENT_MANAGER.RegisterForEvent(
      ADDON_NAME + "_MapPin_" + tostring(i),
      EVENT_PLAYER_ACTIVATED,
      (): undefined => {
        EVENT_MANAGER.UnregisterForEvent(ADDON_NAME + "_Pin_" + tostring(i), EVENT_PLAYER_ACTIVATED)
        state.updatingMapPin[i] = false
        mapPinAddCallback(i)
      }
    )
    return
  }
  state.updatingMapPin[i] = true

  const subzone = getSubzone()
  const callback = MapPinCallback[i]
  if (callback !== undefined) {
    callback(i, subzone)
  } else if (i <= 4) {
    let mapData: SubzonePinTable[string] | undefined
    if (i === 1 || i === 2) {
      mapData = bosses[subzone]
    } else if (i === 3 || i === 4) {
      mapData = skyShards[subzone]
    }
    if (mapData !== undefined) {
      for (const [, pinData] of ipairs(mapData)) {
        let completed: number | undefined
        let required: number | undefined
        if (i === 3 || i === 4) {
          completed = GetSkyshardDiscoveryStatus(
            GetZoneSkyshardId(
              GetSkyshardAchievementZoneId(asNumber(pinData[2])),
              asNumber(pinData[3])
            )
          )
          required = 2
        } else {
          ;[, completed, required] = GetAchievementCriterion(
            asNumber(pinData[2]),
            asNumber(pinData[3])
          )
        }
        if ((completed === required) === def.done) {
          getPinManager().CreatePin(
            getPinTypeId(i),
            asPinTag({ [1]: i, [2]: pinData[2], [3]: pinData[3], [4]: pinData[4] }),
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  } else if (i >= 30) {
    const zoneData = achievements[subzone]
    if (zoneData !== undefined) {
      const mapData = zoneData[i]
      if (mapData !== undefined) {
        for (const [, pinData] of ipairs(mapData)) {
          let completed: boolean
          const criterionIndex = pinData[3]
          if (criterionIndex !== undefined) {
            const [, c1, r1] = GetAchievementCriterion(
              asNumber(pinData[2]),
              asNumber(criterionIndex)
            )
            completed = c1 >= r1
          } else {
            completed = IsAchievementComplete(asNumber(pinData[2]))
          }
          const achItems = achievementItems[asNumber(pinData[2])]
          const haveItem =
            achItems !== undefined && achItems[asNumber(criterionIndex)] !== undefined
          if (completed === def.done && haveItem === def.done) {
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
  }
  state.updatingMapPin[i] = false
}
