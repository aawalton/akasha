import { abilityDescription } from "../destinations-data-runtime/destinations-data-runtime.module.code.ts"
import { PIN_TEXTURES } from "../destinations-pin-textures/destinations-pin-textures.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "../destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import {
  getDestinationKnownPoiTexture,
  getDestinationUnknownPoiTexture,
} from "../destinations-pins-poi-textures/destinations-pins-poi-textures.module.code.ts"
import {
  DESTINATIONS_PIN_TYPE_CRAFTING,
  DESTINATIONS_PIN_TYPE_MUNDUS,
  DESTINATIONS_PIN_TYPE_UNKNOWN,
  getImperialCityPoiTypeName,
  getPoiTypeName,
} from "../destinations-pins-poi-types/destinations-pins-poi-types.module.code.ts"
import {
  getSetDescription,
  type SetDescription,
} from "../destinations-pins-sets/destinations-pins-sets.module.code.ts"
import {
  MundusStore,
  PoiStore,
  type PoiZoneTable,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

export type UnknownPinTagKeyboardLine = [
  font: string,
  r: number,
  g: number,
  b: number,
  lineAnchor: number,
  modifyTextType: number,
  textAlignment: number,
  setToFullSize: boolean,
]

export interface UnknownPinTagGamepadLine {
  fontSize: number
  fontColorField: number
}

export interface UnknownPinTag {
  newFormat: true
  objectiveName: string
  englishName: string
  poiTypeName?: string
  destinationsPinType?: number
  special?: string | SetDescription | undefined
  multipleFormat?: {
    k: UnknownPinTagKeyboardLine[]
    g: UnknownPinTagGamepadLine[]
  }
  texture?: string
}

function buildCraftingMultipleFormat(): {
  k: UnknownPinTagKeyboardLine[]
  g: UnknownPinTagGamepadLine[]
} {
  const [r1, g1, b1] = ZO_SELECTED_TEXT.UnpackRGB()
  const [r2, g2, b2] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
  return {
    k: [
      ["ZoFontWinT2", r1, g1, b1, TOPLEFT, MODIFY_TEXT_TYPE_UPPERCASE, TEXT_ALIGN_CENTER, true],
      ["", r2, g2, b2, TOPLEFT, MODIFY_TEXT_TYPE_NONE, TEXT_ALIGN_CENTER, true],
      ["", r2, g2, b2, TOPLEFT, MODIFY_TEXT_TYPE_NONE, TEXT_ALIGN_CENTER, true],
    ],
    g: [
      { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_1 },
      { fontSize: 24, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 },
      { fontSize: 24, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 },
    ],
  }
}

function loadPoiZoneData(zoneIndex: number): PoiZoneTable {
  let mapData = PoiStore[GetZoneId(zoneIndex)]
  if (mapData === undefined) {
    mapData = { zoneName: "unknown zone" }
  }
  const numPois = GetNumPOIs(zoneIndex)
  for (let poiIndex = 1; poiIndex <= numPois; poiIndex++) {
    if (mapData[poiIndex] === undefined) {
      mapData[poiIndex] = { n: "unknown " + poiIndex, t: DESTINATIONS_PIN_TYPE_UNKNOWN }
    }
  }
  return mapData
}

export function mapCallbackFakeKnown(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return

  MAP_STATE.mapTextureName = undefined
  MAP_STATE.zoneTextureName = undefined
  MAP_STATE.mapId = undefined
  MAP_STATE.zoneId = undefined
  getMapTextureName()

  const zoneIndex = GetCurrentMapZoneIndex()
  const mapData = loadPoiZoneData(zoneIndex)
  const sv = getSavedVariables()

  const numPois = GetNumPOIs(zoneIndex)
  for (let poiIndex = 1; poiIndex <= numPois; poiIndex++) {
    const [normalizedX, normalizedY, , , , , isDiscovered, isNearby] = GetPOIMapInfo(
      zoneIndex,
      poiIndex
    )
    const unknown = !(isDiscovered || isNearby)
    const seen = isDiscovered
    const poiEntry = mapData[poiIndex]

    if (!unknown && poiEntry !== undefined) {
      const destinationsPinType = poiEntry.t

      if (
        destinationsPinType === DESTINATIONS_PIN_TYPE_MUNDUS ||
        destinationsPinType === DESTINATIONS_PIN_TYPE_CRAFTING
      ) {
        const englishName = poiEntry.n
        const [poiName] = GetPOIInfo(zoneIndex, poiIndex)
        const objectiveName = zo_strformat(SI_WORLD_MAP_LOCATION_NAME, poiName)

        const pinTag: UnknownPinTag = {
          newFormat: true,
          objectiveName: objectiveName,
          englishName: englishName,
        }

        if (MAP_STATE.mapTextureName === "imperialcity_base_0") {
          pinTag.poiTypeName = getImperialCityPoiTypeName(destinationsPinType)
        } else {
          pinTag.poiTypeName = getPoiTypeName(destinationsPinType)
        }

        pinTag.destinationsPinType = destinationsPinType

        let createPin = false
        if (
          pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_MUNDUS &&
          sv.settings.ImproveMundus
        ) {
          createPin = true
          pinTag.special = poiEntry.s !== undefined ? MundusStore[poiEntry.s] : undefined
        } else if (
          pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_CRAFTING &&
          sv.settings.ImproveCrafting
        ) {
          createPin = true
          pinTag.special = poiEntry.s !== undefined ? getSetDescription(poiEntry.s) : undefined
          pinTag.multipleFormat = buildCraftingMultipleFormat()
        }

        if (createPin) {
          if (seen) {
            pinTag.texture = getDestinationUnknownPoiTexture(destinationsPinType)
          } else {
            pinTag.texture = getDestinationKnownPoiTexture(destinationsPinType)
          }

          LibMapPins.CreatePin(PIN_TYPES.FAKEKNOWN, pinTag, normalizedX, normalizedY)
        }
      }
    }
  }
}

export function mapCallbackUnknown(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return

  DRTV.pinName = PIN_TYPES.UNKNOWN

  MAP_STATE.mapTextureName = undefined
  MAP_STATE.zoneTextureName = undefined
  MAP_STATE.mapId = undefined
  MAP_STATE.zoneId = undefined
  const cssv = getCharacterSavedVariables()
  const sv = getSavedVariables()
  let storeData: PoiZoneTable | undefined
  if (LibMapPins.IsEnabled(PIN_TYPES.UNKNOWN) && cssv.filters[PIN_TYPES.UNKNOWN] === true) {
    getMapTextureName()
    storeData = PoiStore[GetZoneId(GetCurrentMapZoneIndex())]
  }

  const zoneIndex = GetCurrentMapZoneIndex()

  let mapData = storeData
  if (mapData === undefined) {
    mapData = { zoneName: "unknown zone" }
  }
  const numPois = GetNumPOIs(zoneIndex)
  for (let poiIndex = 1; poiIndex <= numPois; poiIndex++) {
    if (mapData[poiIndex] === undefined) {
      mapData[poiIndex] = { n: "unknown " + poiIndex, t: DESTINATIONS_PIN_TYPE_UNKNOWN }
    }
  }

  for (let poiIndex = 1; poiIndex <= numPois; poiIndex++) {
    const [normalizedX, normalizedY, , , , , isDiscovered, isNearby] = GetPOIMapInfo(
      zoneIndex,
      poiIndex
    )
    const unknown = !(isDiscovered || isNearby)
    const poiEntry = mapData[poiIndex]

    if (unknown && poiEntry !== undefined) {
      const englishName = poiEntry.n
      const destinationsPinType = poiEntry.t
      const [poiName] = GetPOIInfo(zoneIndex, poiIndex)
      const objectiveName = zo_strformat(SI_WORLD_MAP_LOCATION_NAME, poiName)

      const pinTag: UnknownPinTag = {
        newFormat: true,
        objectiveName: objectiveName,
        englishName: englishName,
      }

      if (MAP_STATE.mapTextureName === "imperialcity_base_0") {
        pinTag.poiTypeName = getImperialCityPoiTypeName(destinationsPinType)
      } else {
        pinTag.poiTypeName = getPoiTypeName(destinationsPinType)
      }

      pinTag.destinationsPinType = destinationsPinType

      if (pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_MUNDUS) {
        pinTag.special = poiEntry.s !== undefined ? abilityDescription(poiEntry.s) : undefined
      } else if (pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_CRAFTING) {
        pinTag.special = poiEntry.s !== undefined ? getSetDescription(poiEntry.s) : undefined
        pinTag.multipleFormat = buildCraftingMultipleFormat()
      }

      if (sv.pins.pinTextureUnknown.type === 7) {
        pinTag.texture = getDestinationUnknownPoiTexture(destinationsPinType)
      } else {
        pinTag.texture = PIN_TEXTURES.paths.Unknown[sv.pins.pinTextureUnknown.type - 1]
      }

      LibMapPins.CreatePin(PIN_TYPES.UNKNOWN, pinTag, normalizedX, normalizedY)
    }
  }
}
