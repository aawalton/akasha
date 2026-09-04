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
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import { loreBooksGetNewLoreBookInfo } from "../lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import {
  getPinTexture,
  getPinTextureBookshelf,
  getPinTextureEidetic,
  isEideticPinGrayscale,
  isShaliPinGrayscale,
} from "../lorebooks-pins/lorebooks-pins.module.code.ts"
import {
  bookshelfCompassCallback,
  eideticMemoryCompassCallback,
  mapCallbackCreateBookshelfPins,
  mapCallbackCreateEideticPins,
  mapCallbackCreateShalidorPins,
  shalidorCompassCallback,
} from "../lorebooks-pins-callbacks/lorebooks-pins-callbacks.module.code.ts"
import {
  asBookshelfCompassPinTag,
  asEideticCompassPinTag,
  asShalidorCompassPinTag,
  asTextureControl,
  type CompassPinControl,
  type EideticClickPin,
  type LoreBooksCompassPinLayout,
  type ShalidorClickPin,
  type ShalidorMapPinLayout,
} from "../lorebooks-pins-tags/lorebooks-pins-tags.module.code.ts"
import {
  PIN_TOOLTIP_CREATOR,
  PIN_TOOLTIP_CREATOR_BOOKSHELF,
  PIN_TOOLTIP_CREATOR_EIDETIC,
} from "../lorebooks-pins-tooltips/lorebooks-pins-tooltips.module.code.ts"
import { getSavedVariables } from "../lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"

function asCompassPinControl(value: unknown): CompassPinControl {
  return value as CompassPinControl
}

function asShalidorClickPin(value: unknown): ShalidorClickPin {
  return value as ShalidorClickPin
}

function asEideticClickPin(value: unknown): EideticClickPin {
  return value as EideticClickPin
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

function pingMapWaypoint(this: void, pin: MapPin): undefined {
  PingMap(
    MAP_PIN_TYPE_PLAYER_WAYPOINT,
    MAP_TYPE_LOCATION_CENTERED,
    pin.normalizedX,
    pin.normalizedY,
    undefined
  )
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

  LibMapPins.AddPinType(
    PINS_UNKNOWN,
    function (this: void): undefined {
      mapCallbackCreateShalidorPins(PINS_UNKNOWN)
    },
    undefined,
    mapPinLayoutUnknown,
    PIN_TOOLTIP_CREATOR
  )
  LibMapPins.AddPinType(
    PINS_COLLECTED,
    function (this: void): undefined {
      mapCallbackCreateShalidorPins(PINS_COLLECTED)
    },
    undefined,
    mapPinLayoutCollected,
    PIN_TOOLTIP_CREATOR
  )
  LibMapPins.AddPinType(
    PINS_EIDETIC,
    function (this: void): undefined {
      mapCallbackCreateEideticPins(PINS_EIDETIC)
    },
    undefined,
    mapPinLayoutEidetic,
    PIN_TOOLTIP_CREATOR_EIDETIC
  )
  LibMapPins.AddPinType(
    PINS_EIDETIC_COLLECTED,
    function (this: void): undefined {
      mapCallbackCreateEideticPins(PINS_EIDETIC_COLLECTED)
    },
    undefined,
    mapPinLayoutEideticCollected,
    PIN_TOOLTIP_CREATOR_EIDETIC
  )
  LibMapPins.AddPinType(
    PINS_BOOKSHELF,
    function (this: void): undefined {
      mapCallbackCreateBookshelfPins(PINS_BOOKSHELF)
    },
    undefined,
    mapPinLayoutBookshelf,
    PIN_TOOLTIP_CREATOR_BOOKSHELF
  )

  const [eideticCategoryName] = GetLoreCategoryInfo(LORE_LIBRARY_EIDETIC)
  const eideticPinCollected = zo_strformat(LBOOKS_FILTER_COLLECTED_FORMATTER, eideticCategoryName)

  LibMapPins.AddPinFilter(
    PINS_UNKNOWN,
    GetString(LBOOKS_FILTER_UNKNOWN),
    true,
    db.filters,
    PINS_UNKNOWN
  )
  LibMapPins.AddPinFilter(
    PINS_COLLECTED,
    GetString(LBOOKS_FILTER_COLLECTED),
    true,
    db.filters,
    PINS_COLLECTED
  )
  LibMapPins.AddPinFilter(PINS_EIDETIC, eideticCategoryName, true, db.filters, PINS_EIDETIC)
  LibMapPins.AddPinFilter(
    PINS_EIDETIC_COLLECTED,
    eideticPinCollected,
    true,
    db.filters,
    PINS_EIDETIC_COLLECTED
  )
  LibMapPins.AddPinFilter(
    PINS_BOOKSHELF,
    GetString(LBOOKS_FILTER_BOOKSHELF),
    true,
    db.filters,
    PINS_BOOKSHELF
  )

  LibMapPins.SetPinFilterHidden(PINS_UNKNOWN, LIBMAPPINS_BATTLEGROUND_MAPGROUP, true)
  LibMapPins.SetPinFilterHidden(PINS_COLLECTED, LIBMAPPINS_BATTLEGROUND_MAPGROUP, true)
  LibMapPins.SetPinFilterHidden(PINS_EIDETIC, LIBMAPPINS_BATTLEGROUND_MAPGROUP, true)
  LibMapPins.SetPinFilterHidden(PINS_EIDETIC_COLLECTED, LIBMAPPINS_BATTLEGROUND_MAPGROUP, true)
  LibMapPins.SetPinFilterHidden(PINS_BOOKSHELF, LIBMAPPINS_BATTLEGROUND_MAPGROUP, true)

  LibMapPins.SetClickHandlers(PINS_UNKNOWN, {
    [1]: {
      name: function (this: void, pin: MapPin): string {
        const p = asShalidorClickPin(pin)
        const [title] = loreBooksGetNewLoreBookInfo(
          LORE_LIBRARY_SHALIDOR,
          p.m_PinTag[SHALIDOR_COLLECTIONINDEX],
          p.m_PinTag[SHALIDOR_BOOKINDEX]
        )
        return zo_strformat(LBOOKS_SET_WAYPOINT, title)
      },
      show: function (this: void, pin: MapPin): boolean {
        const p = asShalidorClickPin(pin)
        const [, , known] = loreBooksGetNewLoreBookInfo(
          LORE_LIBRARY_SHALIDOR,
          p.m_PinTag[SHALIDOR_COLLECTIONINDEX],
          p.m_PinTag[SHALIDOR_BOOKINDEX]
        )
        return getSavedVariables().showClickMenu && !known
      },
      duplicates: function (this: void, pin1: MapPin, pin2: MapPin): boolean {
        const p1 = asShalidorClickPin(pin1)
        const p2 = asShalidorClickPin(pin2)
        return (
          p1.m_PinTag[SHALIDOR_COLLECTIONINDEX] === p2.m_PinTag[SHALIDOR_COLLECTIONINDEX] &&
          p1.m_PinTag[SHALIDOR_BOOKINDEX] === p2.m_PinTag[SHALIDOR_BOOKINDEX]
        )
      },
      callback: pingMapWaypoint,
    },
  })

  LibMapPins.SetClickHandlers(PINS_EIDETIC, {
    [1]: {
      name: function (this: void, pin: MapPin): string {
        const p = asEideticClickPin(pin)
        const [title] = loreBooksGetNewLoreBookInfo(
          LORE_LIBRARY_EIDETIC,
          p.m_PinTag.c ?? 0,
          p.m_PinTag.b ?? 0
        )
        return zo_strformat(LBOOKS_SET_WAYPOINT, title)
      },
      show: function (this: void, pin: MapPin): boolean {
        const p = asEideticClickPin(pin)
        const [, , known] = loreBooksGetNewLoreBookInfo(
          LORE_LIBRARY_EIDETIC,
          p.m_PinTag.c ?? 0,
          p.m_PinTag.b ?? 0
        )
        return getSavedVariables().showClickMenu && !known
      },
      duplicates: function (this: void, pin1: MapPin, pin2: MapPin): boolean {
        const p1 = asEideticClickPin(pin1)
        const p2 = asEideticClickPin(pin2)
        return p1.m_PinTag.b === p2.m_PinTag.c && p1.m_PinTag.b === p2.m_PinTag.b
      },
      callback: pingMapWaypoint,
    },
  })

  LibMapPins.SetClickHandlers(PINS_EIDETIC_COLLECTED, {
    [1]: {
      name: function (this: void, pin: MapPin): string {
        const p = asEideticClickPin(pin)
        const [title] = loreBooksGetNewLoreBookInfo(
          LORE_LIBRARY_EIDETIC,
          p.m_PinTag.c ?? 0,
          p.m_PinTag.b ?? 0
        )
        return zo_strformat(LBOOKS_SET_WAYPOINT, title)
      },
      show: function (this: void, pin: MapPin): boolean {
        const p = asEideticClickPin(pin)
        const [, , known] = loreBooksGetNewLoreBookInfo(
          LORE_LIBRARY_EIDETIC,
          p.m_PinTag.c ?? 0,
          p.m_PinTag.b ?? 0
        )
        return getSavedVariables().showClickMenu && known === true
      },
      duplicates: function (this: void, pin1: MapPin, pin2: MapPin): boolean {
        const p1 = asEideticClickPin(pin1)
        const p2 = asEideticClickPin(pin2)
        return p1.m_PinTag.b === p2.m_PinTag.c && p1.m_PinTag.b === p2.m_PinTag.b
      },
      callback: pingMapWaypoint,
    },
  })

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
