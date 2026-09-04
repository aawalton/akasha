import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "../destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import {
  AchIndex,
  AchStore,
  rowNumber,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import { getCharacterSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

export function addMiscCompassPins(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  const cssv = getCharacterSavedVariables()
  MAP_STATE.mapTextureName = undefined
  MAP_STATE.zoneTextureName = undefined
  MAP_STATE.mapId = undefined
  MAP_STATE.zoneId = undefined
  getMapTextureName()
  const mapData =
    MAP_STATE.mapTextureName !== undefined ? AchStore[MAP_STATE.mapTextureName] : undefined
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    const x = rowNumber(pinData, AchIndex.X)
    const y = rowNumber(pinData, AchIndex.Y)
    if (DRTV.pinType === 20) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.AYLEID) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.AYLEID, pinData, x, y)
    } else if (DRTV.pinType === 25) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.DEADLANDS) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.DEADLANDS, pinData, x, y)
    } else if (DRTV.pinType === 26) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.HIGHISLE) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.HIGHISLE, pinData, x, y)
    } else if (DRTV.pinType === 21) {
      if (!LibMapPins.IsEnabled(PIN_TYPES.WWVAMP) || cssv.filters[PIN_TYPES.VWW_COMPASS] !== true) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.WWVAMP, pinData, x, y)
    } else if (DRTV.pinType === 22) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.VAMPIRE_ALTAR) ||
        cssv.filters[PIN_TYPES.VWW_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.VAMPIRE_ALTAR, pinData, x, y)
    } else if (DRTV.pinType === 23) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.DWEMER) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.DWEMER, pinData, x, y)
    } else if (DRTV.pinType === 24) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.WEREWOLF_SHRINE) ||
        cssv.filters[PIN_TYPES.VWW_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.WEREWOLF_SHRINE, pinData, x, y)
    }
  }
}
