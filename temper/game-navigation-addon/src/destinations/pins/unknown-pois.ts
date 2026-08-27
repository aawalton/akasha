import { abilityDescription } from "../data/runtime"
import { pinTextures } from "../pin-textures"
import { PIN_TYPES } from "../pin-type-constants"
import { drtv } from "../runtime-variables"
import { getCharacterSavedVariables, getSavedVariables } from "../saved-variables"
import { getMapTextureName, mapState } from "./map-context"
import { GetDestinationKnownPOITexture, GetDestinationUnknownPOITexture } from "./poi-textures"
import {
  DESTINATIONS_PIN_TYPE_CRAFTING,
  DESTINATIONS_PIN_TYPE_MUNDUS,
  DESTINATIONS_PIN_TYPE_UNKNOWN,
  GetICPoiTypeName,
  GetPoiTypeName,
} from "./poi-types"
import { GetSetDescription, type SetDescription } from "./sets"
import { MundusStore, PoiStore, type PoiZoneTable } from "./stores"

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

export function MapCallback_fakeKnown(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return

  mapState.mapTextureName = undefined
  mapState.zoneTextureName = undefined
  mapState.mapId = undefined
  mapState.zoneId = undefined
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

        if (mapState.mapTextureName === "imperialcity_base_0") {
          pinTag.poiTypeName = GetICPoiTypeName(destinationsPinType)
        } else {
          pinTag.poiTypeName = GetPoiTypeName(destinationsPinType)
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
          pinTag.special = poiEntry.s !== undefined ? GetSetDescription(poiEntry.s) : undefined
          pinTag.multipleFormat = buildCraftingMultipleFormat()
        }

        if (createPin) {
          if (seen) {
            pinTag.texture = GetDestinationUnknownPOITexture(destinationsPinType)
          } else {
            pinTag.texture = GetDestinationKnownPOITexture(destinationsPinType)
          }

          LibMapPins.CreatePin(PIN_TYPES.FAKEKNOWN, pinTag, normalizedX, normalizedY)
        }
      }
    }
  }
}

export function MapCallback_unknown(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return

  drtv.pinName = PIN_TYPES.UNKNOWN

  mapState.mapTextureName = undefined
  mapState.zoneTextureName = undefined
  mapState.mapId = undefined
  mapState.zoneId = undefined
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

      if (mapState.mapTextureName === "imperialcity_base_0") {
        pinTag.poiTypeName = GetICPoiTypeName(destinationsPinType)
      } else {
        pinTag.poiTypeName = GetPoiTypeName(destinationsPinType)
      }

      pinTag.destinationsPinType = destinationsPinType

      if (pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_MUNDUS) {
        pinTag.special = poiEntry.s !== undefined ? abilityDescription(poiEntry.s) : undefined
      } else if (pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_CRAFTING) {
        pinTag.special = poiEntry.s !== undefined ? GetSetDescription(poiEntry.s) : undefined
        pinTag.multipleFormat = buildCraftingMultipleFormat()
      }

      if (sv.pins.pinTextureUnknown.type === 7) {
        pinTag.texture = GetDestinationUnknownPOITexture(destinationsPinType)
      } else {
        pinTag.texture = pinTextures.paths.Unknown[sv.pins.pinTextureUnknown.type - 1]
      }

      LibMapPins.CreatePin(PIN_TYPES.UNKNOWN, pinTag, normalizedX, normalizedY)
    }
  }
}
