import {
  DEST_PIN_TEXT_COLOR_BREAKING,
  DEST_PIN_TEXT_COLOR_BREAKING_DONE,
  DEST_PIN_TEXT_COLOR_CUTPURSE,
  DEST_PIN_TEXT_COLOR_CUTPURSE_DONE,
  DEST_PIN_TEXT_COLOR_OTHER,
  DEST_PIN_TEXT_COLOR_OTHER_DONE,
  DEST_PIN_TEXT_COLOR_RELICHUNTER,
  DEST_PIN_TEXT_COLOR_RELICHUNTER_DONE,
  DEST_PIN_TINT_CHAMPION,
  DEST_PIN_TINT_CHAMPION_DONE,
} from "../destinations-colors/destinations-colors.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  ACH_STATE,
  sharedAchievementsPinData,
} from "../destinations-pins-ach-callbacks/destinations-pins-ach-callbacks.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "../destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import { zoneToAchievementCriterion } from "../destinations-pins-poi-types/destinations-pins-poi-types.module.code.ts"
import {
  AchIDs,
  AchIndex,
  DBossIndex,
  DBossStore,
  rowNumber,
  rowString,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import { getSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

export function otherpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.LB_GTTP_CP
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 2) {
      const comp = zoneToAchievementCriterion(767167, MAP_STATE.zoneTextureName)
      const [, completedLB, requiredLB] = GetAchievementCriterion(873, comp)
      const [, completedGTTP, requiredGTTP] = GetAchievementCriterion(871, comp)
      const [, completedCP, requiredCP] = GetAchievementCriterion(869, comp)
      const completed = completedLB + completedGTTP + completedCP
      const required = requiredLB + requiredGTTP + requiredCP
      DRTV.pinTag = []
      if (completed !== required) {
        if (completedCP !== requiredCP) {
          DRTV.pinTag.push(DEST_PIN_TEXT_COLOR_OTHER.Colorize(zo_strformat("<<1>>", AchIDs[869])))
        }
        if (completedGTTP !== requiredGTTP) {
          DRTV.pinTag.push(DEST_PIN_TEXT_COLOR_OTHER.Colorize(zo_strformat("<<1>>", AchIDs[871])))
        }
        if (completedLB !== requiredLB) {
          DRTV.pinTag.push(DEST_PIN_TEXT_COLOR_OTHER.Colorize(zo_strformat("<<1>>", AchIDs[873])))
        }
        LibMapPins.CreatePin(
          PIN_TYPES.LB_GTTP_CP,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function otherpinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.LB_GTTP_CP_DONE
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 2) {
      const comp = zoneToAchievementCriterion(767167, MAP_STATE.zoneTextureName)
      const [, completedLB, requiredLB] = GetAchievementCriterion(873, comp)
      const [, completedGTTP, requiredGTTP] = GetAchievementCriterion(871, comp)
      const [, completedCP, requiredCP] = GetAchievementCriterion(869, comp)
      const completed = completedLB + completedGTTP + completedCP
      const required = requiredLB + requiredGTTP + requiredCP
      DRTV.pinTag = []
      let pinTextLine = 0
      if (!LibMapPins.IsEnabled(PIN_TYPES.LB_GTTP_CP)) {
        LibMapPins.SetLayoutKey(
          PIN_TYPES.LB_GTTP_CP_DONE,
          "level",
          getSavedVariables().pins.pinTextureMaiq.level
        )
        if (completed === required) {
          DRTV.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[869]))
          )
          DRTV.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[871]))
          )
          DRTV.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[873]))
          )
        }
      }
      if (LibMapPins.IsEnabled(PIN_TYPES.LB_GTTP_CP)) {
        LibMapPins.SetLayoutKey(
          PIN_TYPES.LB_GTTP_CP_DONE,
          "level",
          getSavedVariables().pins.pinTextureMaiq.level - 1
        )
        if (completedCP === requiredCP) {
          pinTextLine = pinTextLine + 1
          DRTV.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[869]))
          )
        }
        if (completedGTTP === requiredGTTP) {
          pinTextLine = pinTextLine + 1
          DRTV.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[871]))
          )
        }
        if (completedLB === requiredLB) {
          pinTextLine = pinTextLine + 1
          DRTV.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[873]))
          )
        }
      }
      if (pinTextLine >= 1) {
        LibMapPins.CreatePin(
          PIN_TYPES.LB_GTTP_CP_DONE,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function relicHunterpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.RELIC_HUNTER
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 14) {
      const criterionNumber = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [desc, completed, required] = GetAchievementCriterion(1250, criterionNumber)
      DRTV.pinTag = []
      if (completed !== required) {
        DRTV.pinTag.push(DEST_PIN_TEXT_COLOR_RELICHUNTER.Colorize(zo_strformat("<<1>>", desc)))
        LibMapPins.CreatePin(
          PIN_TYPES.RELIC_HUNTER,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function relicHunterpinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.RELIC_HUNTER_DONE
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 14) {
      const criterionNumber = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [desc, completed, required] = GetAchievementCriterion(1250, criterionNumber)
      DRTV.pinTag = []
      if (completed === required) {
        DRTV.pinTag.push(DEST_PIN_TEXT_COLOR_RELICHUNTER_DONE.Colorize(zo_strformat("<<1>>", desc)))
        LibMapPins.CreatePin(
          PIN_TYPES.RELIC_HUNTER_DONE,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function breakingpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.BREAKING
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 15) {
      const achNum = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [subName, completed, required] = GetAchievementCriterion(1349, achNum)
      DRTV.pinTag = []
      if (completed !== required) {
        DRTV.pinTag.push(DEST_PIN_TEXT_COLOR_BREAKING.Colorize(zo_strformat("<<1>>", AchIDs[1349])))
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLOR_BREAKING.Colorize(zo_strformat("<<1>>", "[" + subName + "]"))
        )
        LibMapPins.CreatePin(
          PIN_TYPES.BREAKING,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function breakingpinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.BREAKING_DONE
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 15) {
      const achNum = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [subName, completed, required] = GetAchievementCriterion(1349, achNum)
      DRTV.pinTag = []
      if (completed === required) {
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLOR_BREAKING_DONE.Colorize(zo_strformat("<<1>>", AchIDs[1349]))
        )
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLOR_BREAKING_DONE.Colorize(zo_strformat("<<1>>", "[" + subName + "]"))
        )
        LibMapPins.CreatePin(
          PIN_TYPES.BREAKING_DONE,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function cutpursepinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.CUTPURSE
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 16) {
      const achNum = tonumber(rowString(pinData, AchIndex.KEYCODE))
      GetAchievementCriterion(1383)
      const [subName, completed, required] = GetAchievementCriterion(
        rowNumber(pinData, AchIndex.ID),
        achNum
      )
      DRTV.pinTag = []
      if (completed !== required) {
        DRTV.pinTag.push(DEST_PIN_TEXT_COLOR_CUTPURSE.Colorize(zo_strformat("<<1>>", AchIDs[1383])))
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLOR_CUTPURSE.Colorize(zo_strformat("<<1>>", "[" + subName + "]"))
        )
        LibMapPins.CreatePin(
          PIN_TYPES.CUTPURSE,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function cutpursepinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.CUTPURSE_DONE
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType === 16) {
      const achNum = tonumber(rowString(pinData, AchIndex.KEYCODE))
      GetAchievementCriterion(1383)
      const [subName, completed, required] = GetAchievementCriterion(
        rowNumber(pinData, AchIndex.ID),
        achNum
      )
      DRTV.pinTag = []
      if (completed === required) {
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLOR_CUTPURSE_DONE.Colorize(zo_strformat("<<1>>", AchIDs[1383]))
        )
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLOR_CUTPURSE_DONE.Colorize(zo_strformat("<<1>>", "[" + subName + "]"))
        )
        LibMapPins.CreatePin(
          PIN_TYPES.CUTPURSE_DONE,
          DRTV.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function championpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  if (LibMapData.IsOverlandMap() && !getSavedVariables().settings.ShowDungeonBossesInZones) return
  DRTV.pinName = PIN_TYPES.CHAMPION
  if (LibMapPins.IsEnabled(PIN_TYPES.CHAMPION)) {
    getMapTextureName()
    ACH_STATE.mapData =
      MAP_STATE.mapTextureName !== undefined ? DBossStore[MAP_STATE.mapTextureName] : undefined
    const mapData = ACH_STATE.mapData
    if (mapData !== undefined) {
      for (const pinData of mapData) {
        const champAch = rowNumber(pinData, DBossIndex.ACH)
        const champIdx = rowNumber(pinData, DBossIndex.IDX)
        const [champName, completed, required] = GetAchievementCriterion(champAch, champIdx)
        DRTV.pinTag = []
        if (completed !== required) {
          DRTV.pinTag = [DEST_PIN_TINT_CHAMPION.Colorize(zo_strformat("<<1>>", champName))]
          LibMapPins.CreatePin(
            PIN_TYPES.CHAMPION,
            DRTV.pinTag,
            rowNumber(pinData, DBossIndex.X),
            rowNumber(pinData, DBossIndex.Y)
          )
        }
      }
    }
  }
}

export function championpinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  if (LibMapData.IsOverlandMap() && !getSavedVariables().settings.ShowDungeonBossesInZones) return
  DRTV.pinName = PIN_TYPES.CHAMPION_DONE
  if (LibMapPins.IsEnabled(PIN_TYPES.CHAMPION_DONE)) {
    getMapTextureName()
    ACH_STATE.mapData =
      MAP_STATE.mapTextureName !== undefined ? DBossStore[MAP_STATE.mapTextureName] : undefined
    const mapData = ACH_STATE.mapData
    if (mapData !== undefined) {
      for (const pinData of mapData) {
        const champAch = rowNumber(pinData, DBossIndex.ACH)
        const champIdx = rowNumber(pinData, DBossIndex.IDX)
        const [champName, completed, required] = GetAchievementCriterion(champAch, champIdx)
        DRTV.pinTag = []
        if (completed === required) {
          DRTV.pinTag = [DEST_PIN_TINT_CHAMPION_DONE.Colorize(zo_strformat("<<1>>", champName))]
          LibMapPins.CreatePin(
            PIN_TYPES.CHAMPION_DONE,
            DRTV.pinTag,
            rowNumber(pinData, DBossIndex.X),
            rowNumber(pinData, DBossIndex.Y)
          )
        }
      }
    }
  }
}
