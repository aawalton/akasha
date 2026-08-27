import { PIN_TYPES } from "../../pin-type-constants"
import { drtv } from "../../runtime-variables"
import { getCharacterSavedVariables } from "../../saved-variables"
import { getMapTextureName, mapState } from "../map-context"
import { AchIndex, AchStore, rowNumber } from "../stores"

export function AddMiscCompassPins(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  const cssv = getCharacterSavedVariables()
  mapState.mapTextureName = undefined
  mapState.zoneTextureName = undefined
  mapState.mapId = undefined
  mapState.zoneId = undefined
  getMapTextureName()
  const mapData =
    mapState.mapTextureName !== undefined ? AchStore[mapState.mapTextureName] : undefined
  if (mapData === undefined) return
  for (const pinData of mapData) {
    drtv.pinType = rowNumber(pinData, AchIndex.TYPE)
    const x = rowNumber(pinData, AchIndex.X)
    const y = rowNumber(pinData, AchIndex.Y)
    if (drtv.pinType === 20) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.AYLEID) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.AYLEID, pinData, x, y)
    } else if (drtv.pinType === 25) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.DEADLANDS) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.DEADLANDS, pinData, x, y)
    } else if (drtv.pinType === 26) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.HIGHISLE) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.HIGHISLE, pinData, x, y)
    } else if (drtv.pinType === 21) {
      if (!LibMapPins.IsEnabled(PIN_TYPES.WWVAMP) || cssv.filters[PIN_TYPES.VWW_COMPASS] !== true) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.WWVAMP, pinData, x, y)
    } else if (drtv.pinType === 22) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.VAMPIRE_ALTAR) ||
        cssv.filters[PIN_TYPES.VWW_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.VAMPIRE_ALTAR, pinData, x, y)
    } else if (drtv.pinType === 23) {
      if (
        !LibMapPins.IsEnabled(PIN_TYPES.DWEMER) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.DWEMER, pinData, x, y)
    } else if (drtv.pinType === 24) {
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
