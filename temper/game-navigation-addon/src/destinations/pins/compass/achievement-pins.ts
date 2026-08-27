import { PIN_TYPES } from "../../pin-type-constants"
import { drtv } from "../../runtime-variables"
import { getCharacterSavedVariables, getSavedVariables } from "../../saved-variables"
import { getMapTextureName, mapState } from "../map-context"
import { zoneToAchievementCriterion } from "../poi-types"
import {
  AchIndex,
  type AchRow,
  AchStore,
  DBossIndex,
  DBossStore,
  rowNumber,
  rowString,
} from "../stores"
import { createCompassPairPin, pairEnabled } from "./pair-pin"

export function AddAchievementCompassPins(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  const cssv = getCharacterSavedVariables()
  mapState.mapTextureName = undefined
  mapState.zoneTextureName = undefined
  mapState.mapId = undefined
  mapState.zoneId = undefined
  let mapData: AchRow[] | undefined
  if (cssv.filters[PIN_TYPES.ACHIEVEMENTS_COMPASS] === true) {
    getMapTextureName()
    mapData = mapState.mapTextureName !== undefined ? AchStore[mapState.mapTextureName] : undefined
  }

  if (mapData !== undefined && mapState.mapTextureName !== "ava_whole_0") {
    for (const pinData of mapData) {
      drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
      if (drtv.pinType === 15 && pairEnabled(PIN_TYPES.BREAKING, PIN_TYPES.BREAKING_DONE)) {
        const criterionNumber = tonumber(rowString(pinData, AchIndex.KEYCODE))
        const [, completed, required] = GetAchievementCriterion(1250, criterionNumber)
        createCompassPairPin(
          PIN_TYPES.BREAKING,
          PIN_TYPES.BREAKING_DONE,
          completed,
          required,
          pinData
        )
      } else if (
        drtv.pinType === 14 &&
        pairEnabled(PIN_TYPES.RELIC_HUNTER, PIN_TYPES.RELIC_HUNTER_DONE)
      ) {
        const criterionNumber = tonumber(rowString(pinData, AchIndex.KEYCODE))
        const [, completed, required] = GetAchievementCriterion(1250, criterionNumber)
        createCompassPairPin(
          PIN_TYPES.RELIC_HUNTER,
          PIN_TYPES.RELIC_HUNTER_DONE,
          completed,
          required,
          pinData
        )
      } else if (
        drtv.pinType === 12 &&
        pairEnabled(PIN_TYPES.WROTHGAR_JUMPER, PIN_TYPES.WROTHGAR_JUMPER_DONE)
      ) {
        const [, completed, required] = GetAchievementCriterion(1331, 1)
        createCompassPairPin(
          PIN_TYPES.WROTHGAR_JUMPER,
          PIN_TYPES.WROTHGAR_JUMPER_DONE,
          completed,
          required,
          pinData
        )
      } else if (drtv.pinType === 11 && pairEnabled(PIN_TYPES.PATRON, PIN_TYPES.PATRON_DONE)) {
        const [, completed, required] = GetAchievementCriterion(1316, 1)
        createCompassPairPin(PIN_TYPES.PATRON, PIN_TYPES.PATRON_DONE, completed, required, pinData)
      } else if (drtv.pinType === 10 && pairEnabled(PIN_TYPES.BRAWL, PIN_TYPES.BRAWL_DONE)) {
        const [, completed, required] = GetAchievementCriterion(1247, 1)
        createCompassPairPin(PIN_TYPES.BRAWL, PIN_TYPES.BRAWL_DONE, completed, required, pinData)
      } else if (drtv.pinType === 9 && pairEnabled(PIN_TYPES.ON_ME, PIN_TYPES.ON_ME_DONE)) {
        const comp = zoneToAchievementCriterion(704, mapState.zoneTextureName)
        const [, completed, required] = GetAchievementCriterion(704, comp)
        createCompassPairPin(PIN_TYPES.ON_ME, PIN_TYPES.ON_ME_DONE, completed, required, pinData)
      } else if (
        drtv.pinType === 8 &&
        pairEnabled(PIN_TYPES.EARTHLYPOS, PIN_TYPES.EARTHLYPOS_DONE)
      ) {
        const [, completed, required] = GetAchievementCriterion(1121, 1)
        createCompassPairPin(
          PIN_TYPES.EARTHLYPOS,
          PIN_TYPES.EARTHLYPOS_DONE,
          completed,
          required,
          pinData
        )
      } else if (drtv.pinType === 7 && pairEnabled(PIN_TYPES.NOSEDIVER, PIN_TYPES.NOSEDIVER_DONE)) {
        const [, completed, required] = GetAchievementCriterion(406, 1)
        createCompassPairPin(
          PIN_TYPES.NOSEDIVER,
          PIN_TYPES.NOSEDIVER_DONE,
          completed,
          required,
          pinData
        )
      } else if (
        drtv.pinType === 3 &&
        pairEnabled(PIN_TYPES.PEACEMAKER, PIN_TYPES.PEACEMAKER_DONE)
      ) {
        const [, completed, required] = GetAchievementCriterion(716, 1)
        createCompassPairPin(
          PIN_TYPES.PEACEMAKER,
          PIN_TYPES.PEACEMAKER_DONE,
          completed,
          required,
          pinData
        )
      } else if (
        drtv.pinType === 2 &&
        pairEnabled(PIN_TYPES.LB_GTTP_CP, PIN_TYPES.LB_GTTP_CP_DONE)
      ) {
        const comp = zoneToAchievementCriterion(767167, mapState.zoneTextureName)
        const [, completedLB, requiredLB] = GetAchievementCriterion(873, comp)
        const [, completedGTTP, requiredGTTP] = GetAchievementCriterion(871, comp)
        const [, completedCP, requiredCP] = GetAchievementCriterion(869, comp)
        const completed = completedLB + completedGTTP + completedCP
        const required = requiredLB + requiredGTTP + requiredCP
        createCompassPairPin(
          PIN_TYPES.LB_GTTP_CP,
          PIN_TYPES.LB_GTTP_CP_DONE,
          completed,
          required,
          pinData
        )
      } else if (drtv.pinType === 1 && pairEnabled(PIN_TYPES.MAIQ, PIN_TYPES.MAIQ_DONE)) {
        const comp = zoneToAchievementCriterion(872, mapState.zoneTextureName)
        const [, completed, required] = GetAchievementCriterion(872, comp)
        createCompassPairPin(PIN_TYPES.MAIQ, PIN_TYPES.MAIQ_DONE, completed, required, pinData)
      }
    }
  }
  if (cssv.filters[PIN_TYPES.CHAMPION] === true || cssv.filters[PIN_TYPES.CHAMPION_DONE] === true) {
    if (LibMapData.IsOverlandMap() && !getSavedVariables().settings.ShowDungeonBossesInZones) {
      return
    }
    const championData =
      mapState.mapTextureName !== undefined ? DBossStore[mapState.mapTextureName] : undefined
    if (championData === undefined) return
    for (const pinData of championData) {
      const champAch = rowNumber(pinData, DBossIndex.ACH)
      const champIdx = rowNumber(pinData, DBossIndex.IDX)
      const [, completed, required] = GetAchievementCriterion(champAch, champIdx)
      const x = rowNumber(pinData, DBossIndex.X)
      const y = rowNumber(pinData, DBossIndex.Y)
      if (completed !== required) {
        COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.CHAMPION, pinData, x, y)
      } else if (cssv.filters[PIN_TYPES.CHAMPION_DONE] === true) {
        COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.CHAMPION_DONE, pinData, x, y)
      }
    }
  }
}
