import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
  PINS_EIDETIC,
  PINS_EIDETIC_COLLECTED,
  PINS_UNKNOWN,
  SHALIDOR_BOOKINDEX,
  SHALIDOR_COLLECTIONINDEX,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import { loreBooksGetNewLoreBookInfo } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import type {
  EideticClickPin,
  ShalidorClickPin,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pins-tags/lorebooks-pins-tags.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-18/eso-enums-18.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function asShalidorClickPin(value: unknown): ShalidorClickPin {
  return value as ShalidorClickPin
}

function asEideticClickPin(value: unknown): EideticClickPin {
  return value as EideticClickPin
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

function eideticWaypointName(this: void, pin: MapPin): string {
  const p = asEideticClickPin(pin)
  const [title] = loreBooksGetNewLoreBookInfo(
    LORE_LIBRARY_EIDETIC,
    p.m_PinTag.c ?? 0,
    p.m_PinTag.b ?? 0
  )
  return zo_strformat(SI_TEMPER_LOREBOOKS_SET_WAYPOINT, title)
}

function eideticKnown(this: void, pin: MapPin): boolean {
  const p = asEideticClickPin(pin)
  const [, , known] = loreBooksGetNewLoreBookInfo(
    LORE_LIBRARY_EIDETIC,
    p.m_PinTag.c ?? 0,
    p.m_PinTag.b ?? 0
  )
  return known === true
}

function eideticDuplicates(this: void, pin1: MapPin, pin2: MapPin): boolean {
  const p1 = asEideticClickPin(pin1)
  const p2 = asEideticClickPin(pin2)
  return p1.m_PinTag.b === p2.m_PinTag.c && p1.m_PinTag.b === p2.m_PinTag.b
}

export function installClickHandlers(this: void): undefined {
  MAP_PINS.SetClickHandlers(PINS_UNKNOWN, {
    [1]: {
      name: function (this: void, pin: MapPin): string {
        const p = asShalidorClickPin(pin)
        const [title] = loreBooksGetNewLoreBookInfo(
          LORE_LIBRARY_SHALIDOR,
          p.m_PinTag[SHALIDOR_COLLECTIONINDEX],
          p.m_PinTag[SHALIDOR_BOOKINDEX]
        )
        return zo_strformat(SI_TEMPER_LOREBOOKS_SET_WAYPOINT, title)
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

  MAP_PINS.SetClickHandlers(PINS_EIDETIC, {
    [1]: {
      name: eideticWaypointName,
      show: function (this: void, pin: MapPin): boolean {
        return getSavedVariables().showClickMenu && !eideticKnown(pin)
      },
      duplicates: eideticDuplicates,
      callback: pingMapWaypoint,
    },
  })

  MAP_PINS.SetClickHandlers(PINS_EIDETIC_COLLECTED, {
    [1]: {
      name: eideticWaypointName,
      show: function (this: void, pin: MapPin): boolean {
        return getSavedVariables().showClickMenu && eideticKnown(pin)
      },
      duplicates: eideticDuplicates,
      callback: pingMapWaypoint,
    },
  })
}
