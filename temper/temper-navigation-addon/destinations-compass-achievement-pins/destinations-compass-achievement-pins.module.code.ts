import {
  createCompassPairPin,
  pairEnabled,
} from "../destinations-compass-pair-pin/destinations-compass-pair-pin.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "../destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import { zoneToAchievementCriterion } from "../destinations-pins-poi-types/destinations-pins-poi-types.module.code.ts"
import {
  AchIndex,
  type AchRow,
  AchStore,
  DBossIndex,
  DBossStore,
  rowNumber,
  rowString,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

export function addAchievementCompassPins(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  const cssv = getCharacterSavedVariables()
  MAP_STATE.mapTextureName = undefined
  MAP_STATE.zoneTextureName = undefined
  MAP_STATE.mapId = undefined
  MAP_STATE.zoneId = undefined
  let mapData: AchRow[] | undefined
  if (cssv.filters[PIN_TYPES.ACHIEVEMENTS_COMPASS] === true) {
    getMapTextureName()
    mapData =
      MAP_STATE.mapTextureName !== undefined ? AchStore[MAP_STATE.mapTextureName] : undefined
  }

  if (mapData !== undefined && MAP_STATE.mapTextureName !== "ava_whole_0") {
    for (const pinData of mapData) {
      DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
      if (DRTV.pinType === 15 && pairEnabled(PIN_TYPES.BREAKING, PIN_TYPES.BREAKING_DONE)) {
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
        DRTV.pinType === 14 &&
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
        DRTV.pinType === 12 &&
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
      } else if (DRTV.pinType === 11 && pairEnabled(PIN_TYPES.PATRON, PIN_TYPES.PATRON_DONE)) {
        const [, completed, required] = GetAchievementCriterion(1316, 1)
        createCompassPairPin(PIN_TYPES.PATRON, PIN_TYPES.PATRON_DONE, completed, required, pinData)
      } else if (DRTV.pinType === 10 && pairEnabled(PIN_TYPES.BRAWL, PIN_TYPES.BRAWL_DONE)) {
        const [, completed, required] = GetAchievementCriterion(1247, 1)
        createCompassPairPin(PIN_TYPES.BRAWL, PIN_TYPES.BRAWL_DONE, completed, required, pinData)
      } else if (DRTV.pinType === 9 && pairEnabled(PIN_TYPES.ON_ME, PIN_TYPES.ON_ME_DONE)) {
        const comp = zoneToAchievementCriterion(704, MAP_STATE.zoneTextureName)
        const [, completed, required] = GetAchievementCriterion(704, comp)
        createCompassPairPin(PIN_TYPES.ON_ME, PIN_TYPES.ON_ME_DONE, completed, required, pinData)
      } else if (
        DRTV.pinType === 8 &&
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
      } else if (DRTV.pinType === 7 && pairEnabled(PIN_TYPES.NOSEDIVER, PIN_TYPES.NOSEDIVER_DONE)) {
        const [, completed, required] = GetAchievementCriterion(406, 1)
        createCompassPairPin(
          PIN_TYPES.NOSEDIVER,
          PIN_TYPES.NOSEDIVER_DONE,
          completed,
          required,
          pinData
        )
      } else if (
        DRTV.pinType === 3 &&
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
        DRTV.pinType === 2 &&
        pairEnabled(PIN_TYPES.LB_GTTP_CP, PIN_TYPES.LB_GTTP_CP_DONE)
      ) {
        const comp = zoneToAchievementCriterion(767167, MAP_STATE.zoneTextureName)
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
      } else if (DRTV.pinType === 1 && pairEnabled(PIN_TYPES.MAIQ, PIN_TYPES.MAIQ_DONE)) {
        const comp = zoneToAchievementCriterion(872, MAP_STATE.zoneTextureName)
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
      MAP_STATE.mapTextureName !== undefined ? DBossStore[MAP_STATE.mapTextureName] : undefined
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
