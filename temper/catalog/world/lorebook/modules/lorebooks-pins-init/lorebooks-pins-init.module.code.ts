import { MAP_PINS_BATTLEGROUND_MAPGROUP } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-constants/map-pins-constants.module.code.ts"
import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { CUSTOM_COMPASS_LAYOUT_UPDATE } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-constants/compass-pins-constants.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import {
  ICON_LIST_ZONEID,
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
  MISSING_TEXTURE,
  PIN_ICON_REAL,
  PIN_TEXTURES,
  PINS_BOOKSHELF,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_COMPASS_BOOKSHELF,
  PINS_COMPASS_EIDETIC,
  PINS_EIDETIC,
  PINS_EIDETIC_COLLECTED,
  PINS_UNKNOWN,
  SHALIDOR_BOOKINDEX,
  SHALIDOR_COLLECTIONINDEX,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import { loreBooksGetNewLoreBookInfo } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import {
  getPinTexture,
  getPinTextureBookshelf,
  getPinTextureEidetic,
  isEideticPinGrayscale,
  isShaliPinGrayscale,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pins/lorebooks-pins.module.code.ts"
import {
  bookshelfCompassCallback,
  eideticMemoryCompassCallback,
  mapCallbackCreateBookshelfPins,
  mapCallbackCreateEideticPins,
  mapCallbackCreateShalidorPins,
  shalidorCompassCallback,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pins-callbacks/lorebooks-pins-callbacks.module.code.ts"
import { installClickHandlers } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pins-click-handlers/lorebooks-pins-click-handlers.module.code.ts"
import {
  asBookshelfCompassPinTag,
  asEideticCompassPinTag,
  asShalidorCompassPinTag,
  asTextureControl,
  type CompassPinControl,
  type LoreBooksCompassPinLayout,
  type ShalidorMapPinLayout,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pins-tags/lorebooks-pins-tags.module.code.ts"
import {
  PIN_TOOLTIP_CREATOR,
  PIN_TOOLTIP_CREATOR_BOOKSHELF,
  PIN_TOOLTIP_CREATOR_EIDETIC,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pins-tooltips/lorebooks-pins-tooltips.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-18/eso-enums-18.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function asCompassPinControl(value: unknown): CompassPinControl {
  return value as CompassPinControl
}

function compassSizeCallback(
  this: void,
  pin: Control,
  _angle: number,
  normalizedAngle: number,
  _normalizedDistance: number
): undefined {
  if (zo_abs(normalizedAngle) > 0.25) {
    pin.SetDimensions(54 - 24 * zo_abs(normalizedAngle), 54 - 24 * zo_abs(normalizedAngle))
  } else {
    pin.SetDimensions(48, 48)
  }
}

function compassSizeCallbackBookshelf(
  this: void,
  pin: Control,
  _angle: number,
  normalizedAngle: number,
  _normalizedDistance: number
): undefined {
  const size = zo_abs(normalizedAngle) > 0.25 ? 54 - 24 * zo_abs(normalizedAngle) : 48
  pin.SetDimensions(size, size)
}

function onToggleCompassPin(this: void, compassPinType: string, enabled: boolean): undefined {
  COMPASS_PINS.SetCompassPinEnabled(compassPinType, enabled)
  COMPASS_PINS.RefreshPins(compassPinType)
}

export function initializePins(this: void): undefined {
  const db = getSavedVariables()
  const pinTextures = PIN_TEXTURES
  const pinTextureLevel = db.pinTexture.level
  const pinTextureSize = db.pinTexture.size
  const invertedTextureFromTable = 1

  const mapPinLayoutEidetic: ShalidorMapPinLayout = {
    level: pinTextureLevel,
    texture: getPinTextureEidetic,
    size: pinTextureSize,
    grayscale: isEideticPinGrayscale,
  }
  const mapPinLayoutEideticCollected: ShalidorMapPinLayout = {
    level: pinTextureLevel,
    texture: getPinTextureEidetic,
    size: pinTextureSize,
  }
  const mapPinLayoutUnknown: ShalidorMapPinLayout = {
    level: pinTextureLevel,
    texture: getPinTexture,
    size: pinTextureSize,
  }
  const mapPinLayoutCollected: ShalidorMapPinLayout = {
    level: pinTextureLevel,
    texture: getPinTexture,
    size: pinTextureSize,
    grayscale: isShaliPinGrayscale,
  }
  const mapPinLayoutBookshelf: ShalidorMapPinLayout = {
    level: pinTextureLevel,
    texture: getPinTextureBookshelf,
    size: pinTextureSize,
  }

  const compassTextureType = db.pinTexture.type
  const compassEideticTextureType = db.pinTextureEidetic
  const compassMaxDistance = db.compassMaxDistance
  const compassTexturePair = pinTextures[compassTextureType]
  const compassEideticTexturePair = pinTextures[compassEideticTextureType]
  const compassLayoutTexture =
    (compassTexturePair !== undefined ? compassTexturePair[invertedTextureFromTable] : undefined) ??
    MISSING_TEXTURE
  const compassEideticLayoutTexture =
    (compassEideticTexturePair !== undefined
      ? compassEideticTexturePair[invertedTextureFromTable]
      : undefined) ?? MISSING_TEXTURE

  const compassPinLayout: LoreBooksCompassPinLayout = {
    maxDistance: compassMaxDistance,
    texture: compassLayoutTexture,
    sizeCallback: compassSizeCallback,
    additionalLayout: {
      [CUSTOM_COMPASS_LAYOUT_UPDATE]: function (this: void, pin: Control): undefined {
        if (getSavedVariables().pinTexture.type === PIN_ICON_REAL) {
          const tag = asShalidorCompassPinTag(asCompassPinControl(pin).pinTag)
          const [, texture] = loreBooksGetNewLoreBookInfo(
            LORE_LIBRARY_SHALIDOR,
            tag[SHALIDOR_COLLECTIONINDEX],
            tag[SHALIDOR_BOOKINDEX]
          )
          const icon = pin.GetNamedChild("Background")
          if (icon !== undefined) {
            asTextureControl(icon).SetTexture(texture)
          }
        }
      },
    },
    mapPinTypeString: PINS_UNKNOWN,
    onToggleCallback: onToggleCompassPin,
  }
  const compassPinLayoutEidetic: LoreBooksCompassPinLayout = {
    maxDistance: compassMaxDistance,
    texture: compassEideticLayoutTexture,
    sizeCallback: compassSizeCallback,
    additionalLayout: {
      [CUSTOM_COMPASS_LAYOUT_UPDATE]: function (this: void, pin: Control): undefined {
        if (getSavedVariables().pinTextureEidetic === PIN_ICON_REAL) {
          const tag = asEideticCompassPinTag(asCompassPinControl(pin).pinTag)
          const [, texture] = loreBooksGetNewLoreBookInfo(
            LORE_LIBRARY_EIDETIC,
            tag.c ?? 0,
            tag.b ?? 0
          )
          const icon = pin.GetNamedChild("Background")
          if (icon !== undefined) {
            asTextureControl(icon).SetTexture(texture)
          }
        }
      },
    },
    mapPinTypeString: PINS_EIDETIC,
    onToggleCallback: onToggleCompassPin,
  }
  const compassPinLayoutBookshelf: LoreBooksCompassPinLayout = {
    maxDistance: compassMaxDistance,
    texture: ICON_LIST_ZONEID[1261] ?? MISSING_TEXTURE,
    sizeCallback: compassSizeCallbackBookshelf,
    additionalLayout: {
      [CUSTOM_COMPASS_LAYOUT_UPDATE]: function (this: void, pin: Control): undefined {
        let zoneId = 1261
        const tag = asBookshelfCompassPinTag(asCompassPinControl(pin).pinTag)
        if (asCompassPinControl(pin).pinTag !== undefined && tag.z !== undefined) {
          zoneId = GetParentZoneId(tag.z)
        }
        const tex = ICON_LIST_ZONEID[zoneId] ?? ICON_LIST_ZONEID[1261] ?? MISSING_TEXTURE
        const icon = pin.GetNamedChild("Background")
        if (icon !== undefined) {
          asTextureControl(icon).SetTexture(tex)
        }
      },
    },
    mapPinTypeString: PINS_BOOKSHELF,
    onToggleCallback: onToggleCompassPin,
  }

  MAP_PINS.AddPinType(
    PINS_UNKNOWN,
    function (this: void): undefined {
      mapCallbackCreateShalidorPins(PINS_UNKNOWN)
    },
    undefined,
    mapPinLayoutUnknown,
    PIN_TOOLTIP_CREATOR
  )
  MAP_PINS.AddPinType(
    PINS_COLLECTED,
    function (this: void): undefined {
      mapCallbackCreateShalidorPins(PINS_COLLECTED)
    },
    undefined,
    mapPinLayoutCollected,
    PIN_TOOLTIP_CREATOR
  )
  MAP_PINS.AddPinType(
    PINS_EIDETIC,
    function (this: void): undefined {
      mapCallbackCreateEideticPins(PINS_EIDETIC)
    },
    undefined,
    mapPinLayoutEidetic,
    PIN_TOOLTIP_CREATOR_EIDETIC
  )
  MAP_PINS.AddPinType(
    PINS_EIDETIC_COLLECTED,
    function (this: void): undefined {
      mapCallbackCreateEideticPins(PINS_EIDETIC_COLLECTED)
    },
    undefined,
    mapPinLayoutEideticCollected,
    PIN_TOOLTIP_CREATOR_EIDETIC
  )
  MAP_PINS.AddPinType(
    PINS_BOOKSHELF,
    function (this: void): undefined {
      mapCallbackCreateBookshelfPins(PINS_BOOKSHELF)
    },
    undefined,
    mapPinLayoutBookshelf,
    PIN_TOOLTIP_CREATOR_BOOKSHELF
  )

  const [eideticCategoryName] = GetLoreCategoryInfo(LORE_LIBRARY_EIDETIC)
  const eideticPinCollected = zo_strformat(
    SI_TEMPER_LOREBOOKS_FILTER_COLLECTED_FORMATTER,
    eideticCategoryName
  )

  MAP_PINS.AddPinFilter(
    PINS_UNKNOWN,
    GetString(SI_TEMPER_LOREBOOKS_FILTER_UNKNOWN),
    true,
    db.filters,
    PINS_UNKNOWN
  )
  MAP_PINS.AddPinFilter(
    PINS_COLLECTED,
    GetString(SI_TEMPER_LOREBOOKS_FILTER_COLLECTED),
    true,
    db.filters,
    PINS_COLLECTED
  )
  MAP_PINS.AddPinFilter(PINS_EIDETIC, eideticCategoryName, true, db.filters, PINS_EIDETIC)
  MAP_PINS.AddPinFilter(
    PINS_EIDETIC_COLLECTED,
    eideticPinCollected,
    true,
    db.filters,
    PINS_EIDETIC_COLLECTED
  )
  MAP_PINS.AddPinFilter(
    PINS_BOOKSHELF,
    GetString(SI_TEMPER_LOREBOOKS_FILTER_BOOKSHELF),
    true,
    db.filters,
    PINS_BOOKSHELF
  )

  MAP_PINS.SetPinFilterHidden(PINS_UNKNOWN, MAP_PINS_BATTLEGROUND_MAPGROUP, true)
  MAP_PINS.SetPinFilterHidden(PINS_COLLECTED, MAP_PINS_BATTLEGROUND_MAPGROUP, true)
  MAP_PINS.SetPinFilterHidden(PINS_EIDETIC, MAP_PINS_BATTLEGROUND_MAPGROUP, true)
  MAP_PINS.SetPinFilterHidden(PINS_EIDETIC_COLLECTED, MAP_PINS_BATTLEGROUND_MAPGROUP, true)
  MAP_PINS.SetPinFilterHidden(PINS_BOOKSHELF, MAP_PINS_BATTLEGROUND_MAPGROUP, true)

  installClickHandlers()

  COMPASS_PINS.AddCustomPin(
    PINS_COMPASS,
    function (this: void): undefined {
      shalidorCompassCallback()
    },
    compassPinLayout,
    db.filters
  )
  COMPASS_PINS.AddCustomPin(
    PINS_COMPASS_EIDETIC,
    function (this: void): undefined {
      eideticMemoryCompassCallback()
    },
    compassPinLayoutEidetic,
    db.filters
  )
  COMPASS_PINS.AddCustomPin(
    PINS_COMPASS_BOOKSHELF,
    function (this: void): undefined {
      bookshelfCompassCallback()
    },
    compassPinLayoutBookshelf,
    db.filters
  )
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
  COMPASS_PINS.RefreshPins(PINS_COMPASS_EIDETIC)
  COMPASS_PINS.RefreshPins(PINS_COMPASS_BOOKSHELF)
}
