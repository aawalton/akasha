import { DocksHighIsle, Portals, Stable } from "../data/generated/shared-data.generated"
import { PIN_TYPES } from "../pin-type-constants"
import { getMapTextureName, mapState } from "./map-context"
import { type QolPinData, QolStore } from "./stores"

function RedrawMapPinsOnly(pinType: string): undefined {
  LibMapPins.RefreshPins(pinType)
}

export function RedrawQolPins(): undefined {
  RedrawMapPinsOnly(PIN_TYPES.QOLPINS_DOCK)
  RedrawMapPinsOnly(PIN_TYPES.QOLPINS_STABLE)
  RedrawMapPinsOnly(PIN_TYPES.QOLPINS_PORTAL)
}

function qualityOfLifeMapPinData(): QolPinData[] | undefined {
  mapState.mapTextureName = undefined
  mapState.zoneTextureName = undefined
  mapState.mapId = undefined
  mapState.zoneId = undefined
  getMapTextureName()
  return mapState.mapId !== undefined ? QolStore[mapState.mapId] : undefined
}

export function MapCallbackQolPins(pinType: string): undefined {
  if (LibMapData.isWorld === true) {
    return
  }
  const mapData = qualityOfLifeMapPinData()
  if (mapData === undefined) {
    return
  }

  for (const pinData of mapData) {
    if (pinType === PIN_TYPES.QOLPINS_DOCK && pinData.pinsType === DocksHighIsle) {
      LibMapPins.CreatePin(PIN_TYPES.QOLPINS_DOCK, pinData, pinData.x, pinData.y)
    }

    if (pinType === PIN_TYPES.QOLPINS_STABLE && pinData.pinsType === Stable) {
      LibMapPins.CreatePin(PIN_TYPES.QOLPINS_STABLE, pinData, pinData.x, pinData.y)
    }

    if (pinType === PIN_TYPES.QOLPINS_PORTAL && pinData.pinsType === Portals) {
      LibMapPins.CreatePin(PIN_TYPES.QOLPINS_PORTAL, pinData, pinData.x, pinData.y)
    }
  }
}
