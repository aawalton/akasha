import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  CUSTOM_COMPASS_LAYOUT_RESET,
  CUSTOM_COMPASS_LAYOUT_UPDATE,
} from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-constants/compass-pins-constants.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import {
  newColorDef,
  setTextureColor,
} from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-colors/dungeon-champion-colors.module.code.ts"
import { getUiString } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-labels/dungeon-champion-labels.module.code.ts"
import {
  PINS_COLLECTED,
  PINS_COMPASS_KNOWN,
  PINS_COMPASS_UNKNOWN,
  PINS_UNKNOWN,
} from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-names/dungeon-champion-names.module.code.ts"
import { PIN_TEXTURES } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-pin-textures/dungeon-champion-pin-textures.module.code.ts"
import {
  compassCallbackKnown,
  compassCallbackUnknown,
  mapCallbackCollected,
  mapCallbackUnknown,
  PIN_TOOLTIP_CREATOR,
} from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-pins/dungeon-champion-pins.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-saved-vars/dungeon-champion-saved-vars.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function compassSizeCallback(
  this: void,
  pin: CompassPin,
  _angle: number,
  normalizedAngle: number,
  _normalizedDistance: number
): undefined {
  if (zo_abs(normalizedAngle) > 0.25) {
    pin.SetDimensions(54 - 24 * zo_abs(normalizedAngle), 54 - 24 * zo_abs(normalizedAngle))
  } else {
    pin.SetDimensions(48, 48)
  }
  return undefined
}

function buildCompassLayout(texture: string, completedSide: boolean): CompassPinLayout {
  return {
    maxDistance: getSavedVariables().compassMaxDistance,
    texture,
    sizeCallback: compassSizeCallback,
    additionalLayout: {
      [CUSTOM_COMPASS_LAYOUT_UPDATE]: function (this: void, pin: CompassPin): undefined {
        const sv = getSavedVariables()
        if (sv.pinTexture.type === 2) {
          setTextureColor(
            pin.GetNamedChild<TextureControl>("Background"),
            completedSide ? sv.completeColor : sv.incompleteColor
          )
        }
        return undefined
      },
      [CUSTOM_COMPASS_LAYOUT_RESET]: function (this: void, pin: CompassPin): undefined {
        const background = pin.GetNamedChild<TextureControl>("Background")
        if (background !== undefined) {
          background.SetColor(1, 1, 1, 1)
        }
        return undefined
      },
    },
  }
}

export function registerPins(this: void): undefined {
  const sv = getSavedVariables()
  const pinTextureType = sv.pinTexture.type
  const pinTextureLevel = sv.pinTexture.level
  const pinTextureSize = sv.pinTexture.size

  const pinLayoutUnknown: MapPinLayoutData = {
    level: pinTextureLevel,
    texture: PIN_TEXTURES.unknown[pinTextureType],
    size: pinTextureSize,
    tint: pinTextureType === 2 ? newColorDef(sv.incompleteColor) : undefined,
  }
  const pinLayoutCollected: MapPinLayoutData = {
    level: pinTextureLevel,
    texture: PIN_TEXTURES.collected[pinTextureType],
    size: pinTextureSize,
    tint: pinTextureType === 2 ? newColorDef(sv.completeColor) : undefined,
  }

  const compassKnownLayout = buildCompassLayout(PIN_TEXTURES.collected[pinTextureType] ?? "", true)
  const compassUnknownLayout = buildCompassLayout(PIN_TEXTURES.unknown[pinTextureType] ?? "", false)

  MAP_PINS.AddPinType(
    PINS_UNKNOWN,
    mapCallbackUnknown,
    undefined,
    pinLayoutUnknown,
    PIN_TOOLTIP_CREATOR
  )
  MAP_PINS.AddPinType(
    PINS_COLLECTED,
    mapCallbackCollected,
    undefined,
    pinLayoutCollected,
    PIN_TOOLTIP_CREATOR
  )

  MAP_PINS.AddPinFilter(PINS_UNKNOWN, getUiString("DCS_FILTER_UNKNOWN"), undefined, sv.filters)
  MAP_PINS.AddPinFilter(PINS_COLLECTED, getUiString("DCS_FILTER_COLLECTED"), undefined, sv.filters)

  COMPASS_PINS.AddCustomPin(PINS_COMPASS_KNOWN, compassCallbackKnown, compassKnownLayout)
  COMPASS_PINS.AddCustomPin(PINS_COMPASS_UNKNOWN, compassCallbackUnknown, compassUnknownLayout)
  COMPASS_PINS.RefreshPins(PINS_COMPASS_KNOWN)
  COMPASS_PINS.RefreshPins(PINS_COMPASS_UNKNOWN)

  return undefined
}
