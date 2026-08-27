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
} from "../colors"
import { PIN_TYPES } from "../pin-type-constants"
import { drtv } from "../runtime-variables"
import { getSavedVariables } from "../saved-variables"
import { achState, sharedAchievementsPinData } from "./ach-callbacks"
import { getMapTextureName, mapState } from "./map-context"
import { zoneToAchievementCriterion } from "./poi-types"
import { AchIDs, AchIndex, DBossIndex, DBossStore, rowNumber, rowString } from "./stores"

export function OtherpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.LB_GTTP_CP
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 2) {
      const comp = zoneToAchievementCriterion(767167, mapState.zoneTextureName)
      const [, completedLB, requiredLB] = GetAchievementCriterion(873, comp)
      const [, completedGTTP, requiredGTTP] = GetAchievementCriterion(871, comp)
      const [, completedCP, requiredCP] = GetAchievementCriterion(869, comp)
      const completed = completedLB + completedGTTP + completedCP
      const required = requiredLB + requiredGTTP + requiredCP
      drtv.pinTag = []
      if (completed !== required) {
        if (completedCP !== requiredCP) {
          drtv.pinTag.push(DEST_PIN_TEXT_COLOR_OTHER.Colorize(zo_strformat("<<1>>", AchIDs[869])))
        }
        if (completedGTTP !== requiredGTTP) {
          drtv.pinTag.push(DEST_PIN_TEXT_COLOR_OTHER.Colorize(zo_strformat("<<1>>", AchIDs[871])))
        }
        if (completedLB !== requiredLB) {
          drtv.pinTag.push(DEST_PIN_TEXT_COLOR_OTHER.Colorize(zo_strformat("<<1>>", AchIDs[873])))
        }
        LibMapPins.CreatePin(
          PIN_TYPES.LB_GTTP_CP,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function OtherpinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.LB_GTTP_CP_DONE
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 2) {
      const comp = zoneToAchievementCriterion(767167, mapState.zoneTextureName)
      const [, completedLB, requiredLB] = GetAchievementCriterion(873, comp)
      const [, completedGTTP, requiredGTTP] = GetAchievementCriterion(871, comp)
      const [, completedCP, requiredCP] = GetAchievementCriterion(869, comp)
      const completed = completedLB + completedGTTP + completedCP
      const required = requiredLB + requiredGTTP + requiredCP
      drtv.pinTag = []
      let pinTextLine = 0
      if (!LibMapPins.IsEnabled(PIN_TYPES.LB_GTTP_CP)) {
        LibMapPins.SetLayoutKey(
          PIN_TYPES.LB_GTTP_CP_DONE,
          "level",
          getSavedVariables().pins.pinTextureMaiq.level
        )
        if (completed === required) {
          drtv.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[869]))
          )
          drtv.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[871]))
          )
          drtv.pinTag.push(
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
          drtv.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[869]))
          )
        }
        if (completedGTTP === requiredGTTP) {
          pinTextLine = pinTextLine + 1
          drtv.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[871]))
          )
        }
        if (completedLB === requiredLB) {
          pinTextLine = pinTextLine + 1
          drtv.pinTag.push(
            DEST_PIN_TEXT_COLOR_OTHER_DONE.Colorize(zo_strformat("<<1>>", AchIDs[873]))
          )
        }
      }
      if (pinTextLine >= 1) {
        LibMapPins.CreatePin(
          PIN_TYPES.LB_GTTP_CP_DONE,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function RelicHunterpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.RELIC_HUNTER
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 14) {
      const criterionNumber = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [desc, completed, required] = GetAchievementCriterion(1250, criterionNumber)
      drtv.pinTag = []
      if (completed !== required) {
        drtv.pinTag.push(DEST_PIN_TEXT_COLOR_RELICHUNTER.Colorize(zo_strformat("<<1>>", desc)))
        LibMapPins.CreatePin(
          PIN_TYPES.RELIC_HUNTER,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function RelicHunterpinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.RELIC_HUNTER_DONE
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 14) {
      const criterionNumber = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [desc, completed, required] = GetAchievementCriterion(1250, criterionNumber)
      drtv.pinTag = []
      if (completed === required) {
        drtv.pinTag.push(DEST_PIN_TEXT_COLOR_RELICHUNTER_DONE.Colorize(zo_strformat("<<1>>", desc)))
        LibMapPins.CreatePin(
          PIN_TYPES.RELIC_HUNTER_DONE,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function BreakingpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.BREAKING
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 15) {
      const achNum = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [subName, completed, required] = GetAchievementCriterion(1349, achNum)
      drtv.pinTag = []
      if (completed !== required) {
        drtv.pinTag.push(DEST_PIN_TEXT_COLOR_BREAKING.Colorize(zo_strformat("<<1>>", AchIDs[1349])))
        drtv.pinTag.push(
          DEST_PIN_TEXT_COLOR_BREAKING.Colorize(zo_strformat("<<1>>", "[" + subName + "]"))
        )
        LibMapPins.CreatePin(
          PIN_TYPES.BREAKING,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function BreakingpinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.BREAKING_DONE
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 15) {
      const achNum = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [subName, completed, required] = GetAchievementCriterion(1349, achNum)
      drtv.pinTag = []
      if (completed === required) {
        drtv.pinTag.push(
          DEST_PIN_TEXT_COLOR_BREAKING_DONE.Colorize(zo_strformat("<<1>>", AchIDs[1349]))
        )
        drtv.pinTag.push(
          DEST_PIN_TEXT_COLOR_BREAKING_DONE.Colorize(zo_strformat("<<1>>", "[" + subName + "]"))
        )
        LibMapPins.CreatePin(
          PIN_TYPES.BREAKING_DONE,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function CutpursepinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.CUTPURSE
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 16) {
      const achNum = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [_vestigial] = GetAchievementCriterion(1383)
      const [subName, completed, required] = GetAchievementCriterion(
        rowNumber(pinData, AchIndex.ID),
        achNum
      )
      drtv.pinTag = []
      if (completed !== required) {
        drtv.pinTag.push(DEST_PIN_TEXT_COLOR_CUTPURSE.Colorize(zo_strformat("<<1>>", AchIDs[1383])))
        drtv.pinTag.push(
          DEST_PIN_TEXT_COLOR_CUTPURSE.Colorize(zo_strformat("<<1>>", "[" + subName + "]"))
        )
        LibMapPins.CreatePin(
          PIN_TYPES.CUTPURSE,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function CutpursepinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  drtv.pinName = PIN_TYPES.CUTPURSE_DONE
  sharedAchievementsPinData()
  const mapData = achState.mapData
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (drtv.pinType === 16) {
      const achNum = tonumber(rowString(pinData, AchIndex.KEYCODE))
      const [_vestigial] = GetAchievementCriterion(1383)
      const [subName, completed, required] = GetAchievementCriterion(
        rowNumber(pinData, AchIndex.ID),
        achNum
      )
      drtv.pinTag = []
      if (completed === required) {
        drtv.pinTag.push(
          DEST_PIN_TEXT_COLOR_CUTPURSE_DONE.Colorize(zo_strformat("<<1>>", AchIDs[1383]))
        )
        drtv.pinTag.push(
          DEST_PIN_TEXT_COLOR_CUTPURSE_DONE.Colorize(zo_strformat("<<1>>", "[" + subName + "]"))
        )
        LibMapPins.CreatePin(
          PIN_TYPES.CUTPURSE_DONE,
          drtv.pinTag,
          rowNumber(pinData, AchIndex.X),
          rowNumber(pinData, AchIndex.Y)
        )
      }
    }
  }
}

export function ChampionpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  if (LibMapData.IsOverlandMap() && !getSavedVariables().settings.ShowDungeonBossesInZones) return
  drtv.pinName = PIN_TYPES.CHAMPION
  if (LibMapPins.IsEnabled(PIN_TYPES.CHAMPION)) {
    getMapTextureName()
    achState.mapData =
      mapState.mapTextureName !== undefined ? DBossStore[mapState.mapTextureName] : undefined
    const mapData = achState.mapData
    if (mapData !== undefined) {
      for (const pinData of mapData) {
        const champAch = rowNumber(pinData, DBossIndex.ACH)
        const champIdx = rowNumber(pinData, DBossIndex.IDX)
        const [champName, completed, required] = GetAchievementCriterion(champAch, champIdx)
        drtv.pinTag = []
        if (completed !== required) {
          drtv.pinTag = [DEST_PIN_TINT_CHAMPION.Colorize(zo_strformat("<<1>>", champName))]
          LibMapPins.CreatePin(
            PIN_TYPES.CHAMPION,
            drtv.pinTag,
            rowNumber(pinData, DBossIndex.X),
            rowNumber(pinData, DBossIndex.Y)
          )
        }
      }
    }
  }
}

export function ChampionpinTypeCallbackDone(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  if (LibMapData.IsOverlandMap() && !getSavedVariables().settings.ShowDungeonBossesInZones) return
  drtv.pinName = PIN_TYPES.CHAMPION_DONE
  if (LibMapPins.IsEnabled(PIN_TYPES.CHAMPION_DONE)) {
    getMapTextureName()
    achState.mapData =
      mapState.mapTextureName !== undefined ? DBossStore[mapState.mapTextureName] : undefined
    const mapData = achState.mapData
    if (mapData !== undefined) {
      for (const pinData of mapData) {
        const champAch = rowNumber(pinData, DBossIndex.ACH)
        const champIdx = rowNumber(pinData, DBossIndex.IDX)
        const [champName, completed, required] = GetAchievementCriterion(champAch, champIdx)
        drtv.pinTag = []
        if (completed === required) {
          drtv.pinTag = [DEST_PIN_TINT_CHAMPION_DONE.Colorize(zo_strformat("<<1>>", champName))]
          LibMapPins.CreatePin(
            PIN_TYPES.CHAMPION_DONE,
            drtv.pinTag,
            rowNumber(pinData, DBossIndex.X),
            rowNumber(pinData, DBossIndex.Y)
          )
        }
      }
    }
  }
}
